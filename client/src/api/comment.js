import request from '@/utils/request'

export function getCommentsByArticleId(articleId) {
  return request({
    url: `/articles/${articleId}/comments`,
    method: 'get',
  })
}

export function createComment(articleId, data) {
  return request({
    url: `/articles/${articleId}/comments`,
    method: 'post',
    data,
  })
}

export function getMyComments() {
  return request({
    url: '/me/comments',
    method: 'get',
  })
}

export function deleteComment(commentId) {
  return request({
    url: `/comments/${commentId}`,
    method: 'delete',
  })
}
