import request from '@/utils/request'

export function updateArticle(articleId, data) {
  return request({
    url: `/articles/${articleId}`,
    method: 'put',
    data,
  })
}

// GET
// /articles/{articleId}

export function getArticle(articleId) {
  return request({
    url: `/articles/${articleId}`,
    method: 'get',
  })
}

export function getComments(articleId) {
  return request({
    url: `/articles/${articleId}/comments`,
    method: 'get',
  })
}

export function deleteArticle(articleId) {
  return request({
    url: `/articles/${articleId}`,
    method: 'delete',
  })
}

export function getArticlesByHouse(houseId) {
  return request({
    url: `/houses/${houseId}/articles`,
    method: 'get',
  })
}

export function createArticle(houseId, data) {
  return request({
    url: `/houses/${houseId}/articles`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export function getMyArticles() {
  return request({
    url: '/me/articles',
    method: 'get',
  })
}
