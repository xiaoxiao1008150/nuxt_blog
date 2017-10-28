import http from './fetch'

// // 用户登录
// export const _login = (params) => {
//   return http.fetchPost(`/api/user/login`, params)
// }
// // 用户登出
// export const _logout = (params) => {
//   return http.fetchPost(`/api/user/logout`, params)
// }

// 增加一个用户
export const _addUser = (params) => {
  return http.fetchPost('/api/add-user', params)
}

// 修改密码
export const _updatePassword = (params) => {
  return http.fetchPost('/api/user/update-password', params)
}

// 查找用户
export const _getUser = (id, params) => {
  return http.fetchGet(`/api/user/${id}`, params)
}
