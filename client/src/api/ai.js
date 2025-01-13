import request from '@/utils/request'

export function sendAIMessage(data) {
  return request({
    url: '/chat',
    method: 'post',
    data,
  })
}
