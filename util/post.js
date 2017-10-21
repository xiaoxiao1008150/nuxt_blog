import http from './fetch'

// 获取全部文章
export const _getAllPosts = (params) => {
  return http.fetchGet('/api/posts', params)
}
// 增加一篇文章
export const _addPost = (params) => {
  return http.fetchPost('/api/add-post', params)
}

// 删除一篇文章
export const _deletePost = (params) => {
  return http.fetchPost('/api/posts/delete/:id', params)
}
// 查看一篇文章详情
export const _postDetail = (params) => {
  return http.fetchGet('/api/posts/detail/:brief', params)
}
export const _postDetailById = (urlParams, params) => {
  return http.fetchGet(`/api/posts/detail_id/${urlParams}`, params)
}
