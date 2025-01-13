import request from '@/utils/request'

export function getNotices() {
  return request({
    url: '/notices',
    method: 'get',
  })
}

export function createNotice(data) {
  return request({
    url: '/notices',
    method: 'post',
    data,
  })
}

export function getNoticeById(id) {
  return request({
    url: `/notices/${id}`,
    method: 'get',
  })
}

export function deleteNotice(id) {
  return request({
    url: `/notices/${id}`,
    method: 'delete',
  })
}

export function updateNotice(id, data) {
  return request({
    url: `/notices/${id}`,
    method: 'patch',
    data,
  })
}
