import http from './fetch'

// 增加一个评论 | 回复评论
export const _addComment = (params) => {
  return http.fetchPost('/api/add-comment', params)
}

// 获取一篇文章的所有评论
export const _getComment = (postid, params) => {
  return http.fetchGet(`/api/get-comment/${postid}`, params)
}
