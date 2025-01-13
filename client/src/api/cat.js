import request from '@/utils/request'

export function getCat() {
  return request({
    url: 'https://api.thecatapi.com/v1/images/search',
    method: 'get',
  })
}
