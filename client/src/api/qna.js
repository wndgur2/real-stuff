// question.js
import request from '@/utils/request'

// 모든 질문 조회
export function getQuestions(page = 0, size = 10, sort = []) {
  return request({
    url: `/questions`,
    method: 'get',
    params: {
      page,
      size,
      sort,
    },
  })
}

// 특정 질문 조회
export function getQuestion(questionId) {
  return request({
    url: `/questions/${questionId}`,
    method: 'get',
  })
}

// 특정 질문 생성
export function createQuestion(data) {
  return request({
    url: `/questions`,
    method: 'post',
    data,
  })
}

// 특정 질문 수정
export function updateQuestion(questionId, data) {
  return request({
    url: `/questions/${questionId}`,
    method: 'put',
    data,
  })
}

// 특정 질문 삭제
export function deleteQuestion(questionId) {
  return request({
    url: `/questions/${questionId}`,
    method: 'delete',
  })
}

// 내가 작성한 질문 조회
export function getMyQuestions(accessContext, page = 0, size = 10, sort = []) {
  return request({
    url: `/me/questions`,
    method: 'get',
    params: {
      ...accessContext,
      page,
      size,
      sort,
    },
  })
}
