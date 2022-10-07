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

// // 处理用户名和退出
// // 自己给用户名那个span加个 id="username"

// if (document.querySelector('#username') && document.querySelector('#logout')) {
//   document.querySelector('#username').innerHTML = localStorage.getItem('username')

//   document.querySelector('#logout').addEventListener('click', function () {
//     // 使用插件提供的 message.confirm('提示标题', '消息', res => {})
//     message.confirm('提示', '你确定要退出吗？', res => {
//       // 点击确定，res=true； 点击取消，res=false
//       if (res) {
//         // 移除本地存储的username和token
//         localStorage.removeItem('username')
//         localStorage.removeItem('token')
//         // 跳转到登录页  // js文件中的路径，不能以js文件在哪里为准，和js文件在哪里无关
//         // 和 使用js的html文件有关系
//         location.href = './login.html'
//       }
//     })
//   })
// }
