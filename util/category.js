import http from './fetch'
// 获取全部分类
export const _getAllCategories = (params) => {
  return http.fetchGet('/api/categories', params)
}
// 增加一个分类
export const _addCategory = (params) => {
  return http.fetchPost('/api/add-category', params)
}
