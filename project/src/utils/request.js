/**
 * axios请求/响应封装
 */
import axios from 'axios'



// 请求超时时间
axios.defaults.timeout = 5000;


if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://10.21.19.86:8080'
} else if (process.env.NODE_ENV === 'testing') {
  axios.defaults.baseURL = 'http://10.21.19.86:8080'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://10.21.19.86:8080'
}

// axios.defaults.baseURL = '/api'
// request拦截器
axios.interceptors.request.use(config => {
  // do something before request is sent
  // 这里可以给每个请求添加Token
  return config
}, error => {
  // do something with request error
  console.log(error)
  return Promise.reject(error)
})


axios.interceptors.response.use(
  response => {
    const res = response.data
    if (res.retCode === '401') {
      // 登陆过期
    } else {
      return Promise.resolve(response)
    }
  }, error => {
    return Promise.reject(error.response)
  })

  export function get(url,params={}){
    return new Promise((resolve,reject)=>{
      axios.get(url,{params})
      .then((response)=>{
        resolve(response);
      })
      .catch((err)=>{
        reject(err)
      });
    });
  }

  export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then((response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        });
    });
  }
