import request from '@/utils/request'
import { useUserStore } from '@/store/user'

export function getHouse(houseId) {
  return request({
    url: `/houses${useUserStore().isLogin ? '/like-check' : ''}/${houseId}`,
    method: 'get',
  })
}

export function updateHouse(houseId, data) {
  return request({
    url: `/houses/${houseId}`,
    method: 'put',
    data,
  })
}

export function deleteHouse(houseId) {
  return request({
    url: `/houses/${houseId}`,
    method: 'delete',
  })
}

export function getAllHouses(sido, gugun, dong, houseType, page, size) {
  return request({
    url: `/houses${useUserStore().isLogin ? '/like-check' : ''}`,
    method: 'get',
    params: {
      sido,
      gugun,
      dong,
      houseType,
      page,
      size,
    },
  })
}
// GET
// /houses/like-check

export function createHouse(data) {
  return request({
    url: '/houses',
    method: 'post',
    data,
  })
}

export function createDealForHouse(data) {
  return request({
    url: `/houses/deals`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export function getHouseByname(sido, gugun, dong, name) {
  return request({
    url: `/houses/name`,
    method: 'get',
    params: {
      sido,
      gugun,
      dong,
      name,
    },
  })
}
