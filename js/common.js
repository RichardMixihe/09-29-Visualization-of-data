// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})

// common.js是一个公用的JS文件
// 所以，在这里，配置好axios

// 1.配置请求跟路径。

axios.defaults.baseURL = 'http://ajax-api.itheima.net'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
// 2.配置请求拦截器（目的是加请求头）
// 3.配置相应拦截器（判断token是否过期）
