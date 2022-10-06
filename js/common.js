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
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

// 另外，使用请求拦截器也可以，代码如下
// 3. 配置响应拦截器（判断token是否过期）
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // console.dir(error)
  if (error.response.status === 401) {
    // 说明token过期了，总之token不能用了
    localStorage.removeItem('token')
    location.href = './login.html' // JS中的相对路径和 js 文件在哪里无关；和使用js的html有关系
  }
  // 对响应错误做点什么
  return Promise.reject(error);
});