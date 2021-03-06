import axios from '~/plugins/axios'
// post数据的时候以正常表单的形式 ，服务器以相对应的措施解析
export default {
  fetchGet (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        console.log('GetUrl', url)
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        console.log('testUrl', url)
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
