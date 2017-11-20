import * as axios from 'axios'

let env = process.env.NODE_ENV || 'development'
let options = {}
// The server-side needs a full url to works
if (env === 'development') {
  options.baseURL = 'http://localhost:3000'
}else{
  options = {
    baseURL: 'http://47.104.98.140:3000',
    timeout: 5000,
    responseType: "json",
    validateStatus: function (status) {
      return status < 305; // Reject only if the status code is greater than or equal to 500
    }
  };
}

const instance = axios.create(options)

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // 此处的错误属于request error，发出了请求但是没有响应
    // console.log('error.request===', error.request)
    return Promise.reject(error.request);
});


// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // response 错误分为两种 ,响应吗是200正确的时候是不走这里的, 我们认为浏览器的缓存304也是可以的
    // 因此需要配置状态码,当状态码大于304认为是有问题的
    // 1. 响应的状态码不在200-300之间
    // 例子: {data: null, status: 500, statusText: "Internal Server Error", headers: {…}, config: {…}, …}
    // 例子: {data: null, status: 404, statusText: "Not Found", headers: {…}, config: {…}, …}
    if(error.response){
      // console.log('error.response====', error.response);
      return Promise.reject({code:1000}) //状态码错误
    }
    if(error.message){
      return Promise.reject({ code: 100 }); //请求超时
    }
      //官方解释: 请求的设置问题引发的错误 
      // 亲自试验: 数据库没连接 ‘timeout of 5000ms exceeded’,一般是请求超时
      // console.log('Error===', error.message);
      // console.log(error.config);
});

export default instance
