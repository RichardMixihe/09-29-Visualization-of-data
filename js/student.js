// --------------------- 1. 获取数据，展示到表格 ---------------------
const renderStudent = () => {
    axios.get('/students').then(({ data: res }) => {
      // console.log(res)
      let arr = res.data.map(item => {
        return `
        <tr>
          <td>${item.name}</td>
          <td>${item.age}</td>
          <td>${item.gender === 0 ? '男' : '女'}</td>
          <td>第${item.group}组</td>
          <td>${item.hope_salary}</td>
          <td>${item.salary}</td>
          <td>${item.province} ${item.city} ${item.area}</td>
          <td>
            <a href="javascript:;" class="text-success mr-3"><i data-id="${item.id}" class="bi bi-pen"></i></a>
            <a href="javascript:;" class="text-danger"><i data-id="${item.id}" class="bi bi-trash"></i></a>
          </td>
        </tr>
        `
      })
      // console.log(arr.join(''))
      document.querySelector('tbody').innerHTML = arr.join('')
      document.querySelector('.total').innerHTML = arr.length
    })
  }
  
  renderStudent()
  
  // --------------------- 2. 初始化模态框 ----------------------------
  // 找到页面中的模态框盒子
  const modalBox = document.querySelector('#modal')
  
  // 实例化模态框对象
  const modal = new bootstrap.Modal(modalBox)
  
  // --------------------- 3. 点击添加 + ,显示模态框 ------------------
  document.querySelector('#openModal').addEventListener('click', function () {
    document.querySelector('.modal-title').innerHTML = '添加学员' // 修改标题：添加学员
    document.querySelector('#form').reset() // 表单.reset() // 重置表单
    modal.show() // 让模态框显示
  })
  
  // --------------------- 4. 初始化省市县 -------------------------
  const initCity = async () => {
    const province = document.querySelector('[name=province]')
    const city = document.querySelector('[name=city]')
    const area = document.querySelector('[name=area]')
    // 4.1 -------- 先获取所有的省 -------------
    const { data: res1 } = await axios.get('/api/province')
    // console.log(res1) // { message: '获取成功', data: ['北京', '天津', '河北省', .....] }
    let arr1 = res1.data.map(item => `<option value="${item}">${item}</option>`)
    province.innerHTML = '<option value="">--省份--</option>' + arr1.join('')
  
    // 4.2 -------- 切换省的时候，获取市 -------------
    province.addEventListener('change', async function () {
      let pname = province.value // 获取当前选择的省的名字
      // 省切换后，无论如何，都要重置县
      area.innerHTML = '<option value="">--地区--</option>'
      // 如果没有选择省，则需要重置市
      if (pname === '') return (city.innerHTML = '<option value="">--城市--</option>')
      // 下面，正常获取对应的市，并渲染到第2个下拉框的位置
      // console.log(pname)
      const { data: res2 } = await axios.get('/api/city', { params: { pname } })
      // console.log(res2) // { message: '获取成功', data: ['xx市', 'xx市', 'xx市', .....] }
      let arr2 = res2.data.map(item => `<option value="${item}">${item}</option>`)
      city.innerHTML = '<option value="">--城市--</option>' + arr2.join('')
    })
    // 4.3 -------- 切换市的时候，获取县 -------------
    city.addEventListener('change', async function () {
      let pname = province.value // 获取当前选择的省的名字
      let cname = city.value // 获取市的名字
      // 没有选择市，要重置县
      if (cname === '') return (area.innerHTML = '<option value="">--地区--</option>')
      // 下面，正常获取对应的县，并渲染到第3个下拉框的位置
      // console.log(pname)
      const { data: res3 } = await axios.get('/api/area', { params: { pname, cname } })
      // console.log(res2) // { message: '获取成功', data: ['xx市', 'xx市', 'xx市', .....] }
      let arr3 = res3.data.map(item => `<option value="${item}">${item}</option>`)
      area.innerHTML = '<option value="">--地区--</option>' + arr3.join('')
    })
  }
  initCity()
  
  // --------------------- 5. 添加学员 -------------------------
  document.querySelector('#submit').addEventListener('click', async function () {
    // 获取表单各个元素的值
    let data = val(document.querySelector('#form'))
    // console.log(data)
    // 根据接口要求，数字类型的，必须用纯数字，不能使用 '20'
    data.age = +data.age // 如果使用 + 的方式转换，注意 +和变量 挨在一起
    data.gender = Number(data.gender)
    data.group = +data.group
    data.hope_salary = +data.hope_salary
    data.salary = +data.salary
    // console.log(data) // 此次查看，数据完全符合接口要求了，下面可以提交了
    // 点击弹出层中的确认的时候，根据弹出层中的标题判断一下，是添加操作还是修改操作
    let title = document.querySelector('.modal-title').innerHTML
    if (title === '添加学员') {
      const { data: res } = await axios.post('/students', data)
      message.success(res.message) // 使用插件提示
      modal.hide() // 关闭弹出层
      renderStudent() // 更新页面数据
    } else if (title === '修改学员') {
      let id = document.querySelector('.modal-title').dataset.id
      // 发送请求，进行修改
      const { data: res } = await axios.put(`/students/${id}`, data)
      message.success(res.message) // 使用插件提示
      modal.hide() // 关闭弹出层
      renderStudent() // 更新页面数据
    }
  })
  
  // --------------------- 6. 删除和编辑的单击事件 ---------------
  document.querySelector('tbody').addEventListener('click', async function (e) {
    // 因为删除和编辑，都需要id，所以放到判断外部
    let id = e.target.dataset.id
    // console.log(id)
    if (e.target.classList.contains('bi-trash')) {
      // 说明点击了删除
      message.confirm('提示', '你确定不要我了吗？', async res => {
        if (res) {
          // axios.delete(`/students/187`)
          await axios.delete(`/students/${id}`)
          message.success('删除成功')
          renderStudent() // 更新页面数据
        }
      })
    }
  
    if (e.target.classList.contains('bi-pen')) {
      // 说明点击了编辑
      document.querySelector('.modal-title').innerHTML = '修改学员'
      document.querySelector('.modal-title').setAttribute('data-id', id)
      modal.show() // 显示模态框
      // 根据id，获取当前这个学员的详细信息
      const { data: res } = await axios.get(`/students/${id}`)
      // console.log(res)
      // 获取市和县，获取后，渲染到对应的下拉框之后，才能数据回填
      let p1 = axios.get('/api/city', { params: { pname: res.data.province } })
      let p2 = axios.get('/api/area', { params: { pname: res.data.province, cname: res.data.city } })
      const [{ data: { data: c } }, { data: { data: a } }] = await Promise.all([p1, p2])
      // console.log(c, a)
      // [{ data: { data: c } }, { data: { data: a } }]
      let arr2 = c.map(item => `<option value="${item}">${item}</option>`)
      document.querySelector('[name=city]').innerHTML = '<option value="">--城市--</option>' + arr2.join('')
  
      let arr3 = a.map(item => `<option value="${item}">${item}</option>`)
      document.querySelector('[name=area]').innerHTML = '<option value="">--地区--</option>' + arr3.join('')
      // val(表单) // 获取表单各项数据
      // val(表单, 数据) // 数据回填。把数据回填到表单中【要求数据的键 ==== 表单各项的name属性值】
      val(document.querySelector('#form'), res.data)
    }
  })
  
  
  