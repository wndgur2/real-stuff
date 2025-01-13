import request from '@/utils/request'
//POST
///articles/{articleId}/like

export function likeArticle(articleId) {
  return request({
    url: `/articles/${articleId}/like`,
    method: 'post',
  })
}
export function dislikeArticle(articleId) {
  return request({
    url: `/articles/${articleId}/like`,
    method: 'delete',
  })
}
