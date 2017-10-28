import http from './fetch'

// 获取全部文章
export const _getAllPosts = (query, params) => {
  return http.fetchGet(`/api/posts?${query}`, params)
}
// //按年份获取所有文章
// export const _getAllPostsByYear = (params) => {
//   return http.fetchGet(`/api/posts`, params)
// }

// 按标签获取文章
export const _getTagPosts = (tag, params) => {
  return http.fetchGet(`/api/posts/${tag}`, params)
}
// 点赞
export const _addVotes = (urlParams, params) => {
  return http.fetchGet(`/api/add-vote/${urlParams}`, params)
}
// 增加一篇文章
export const _addPost = (params) => {
  return http.fetchPost('/api/add-post', params)
}

// 删除一篇文章
export const _deletePost = (params) => {
  return http.fetchPost('/api/posts/delete', params)
}
// 查看一篇文章详情
export const _postDetail = (params) => {
  return http.fetchGet('/api/posts/detail/:brief', params)
}
export const _postDetailById = (urlParams, params) => {
  return http.fetchGet(`/api/posts/detail_id/${urlParams}`, params)
}
