// ------------------------------------------1.获取学生数据并渲染到表格汇总
async function renderStudent() {
   const {data:res} = await axios.get('/students')
   console.log(res);
   let arr = res.data.map(item=>{
    return `
    <tr>
    <td>${item.name}</td>
    <td>${item.age}</td>
    <td>${item.gender === 0 ? '男' :'女'}</td>
    <td>第${item.group}组</td>
    <td>${item.hope_salary}</td>
    <td>${item.salary}</td>
    <td>${item.province} ${item.city} >${item.area}</td>
    <td>
      <a href="javascript:;" class="text-success mr-3"><i class="bi bi-pen"></i></a>
      <a href="javascript:;" class="text-danger"><i class="bi bi-trash"></i></a>
    </td>
  </tr>
  `
  
   })
   document.querySelector('tbody').innerHTML = arr.join('')
}
renderStudent();


//添加操作，需要提前准备，比如模态框的用法，省市县的联动效果
//bootstrap 使用方法，两个步骤，1.实例化2.调用方法显示或隐藏
// let addModal = newbootstrap.Modal('模态框盒子')
let addModal = new bootstrap.Modal(document.querySelector('#modal'))


// addModal.hide()


// 点击+按钮的时候，让模态框显示
document.querySelector('#openModal'). addEventListener('click',function () {
    addModal.show()

})//绑定事件
//下面完成省市县的联动效果
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

document.querySelector('#submit'). addEventListener('click',async function (e) {
    e.preventDefault();
    let data = val(document.querySelector('#form'))
    console.log(data);
     // console.log(data)
  // 根据接口要求，数字类型的，必须用纯数字，不能使用 '20'
  data.age = +data.age // 如果使用 + 的方式转换，注意 +和变量 挨在一起
  data.gender = Number(data.gender)
  data.group = +data.group
  data.hope_salary = +data.hope_salary
  data.salary = +data.salary
  // console.log(data) // 此次查看，数据完全符合接口要求了，下面可以提交了
  const { data: res } = await axios.post('/students', data)
  message.success(res.message) // 使用插件提示
  addModal.hide() // 关闭弹出层
  renderStudent() // 更新页面数据
})//绑定事件
