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
async function initCity(){
    // 1.马上获取全部的省，渲染到第一个下拉框的位置
    let province = document.querySelector('[name=province]');//返回文档中匹配指定 CSS选择器的一个元素。!!注意仅仅返回匹配指定选择器的第一个元素
    let city = document.querySelector('[name=city]');//返回文档中匹配指定 CSS选择器的一个元素。!!注意仅仅返回匹配指定选择器的第一个元素
    let area = document.querySelector('[name=area]');//返回文档中匹配指定 CSS选择器的一个元素。!!注意仅仅返回匹配指定选择器的第一个元素

   let {data:res} =  await axios.get('/api/province')
   let arr =  res.data.map(item=>`<option value = '${item}'>${item}</option>`)
    province.innerHTML = `<option value = ''>--省份--</option>` + arr.join('');
    // 2.切换省的时候，获取对应的市，渲染到第二个下拉框的位置
    province. addEventListener('change',function () {
        city.innerHTML = `<option value="">--城市--</option>`
    })//绑定事件
    // 3.切换市的时候获取对应的县，渲染到第三个下拉框的位置
}
initCity()