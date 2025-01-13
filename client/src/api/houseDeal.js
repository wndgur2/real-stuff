import request from '@/utils/request'
import { useUserStore } from '@/store/user'

export function getDeal(dealId) {
  return request({
    url: `/deals/${dealId}`,
    method: 'get',
  })
}

export function updateDeal(dealId, data) {
  return request({
    url: `/deals/${dealId}`,
    method: 'put',
    data,
  })
}

export function deleteDeal(dealId) {
  return request({
    url: `/deals/${dealId}`,
    method: 'delete',
  })
}

export function createDeal(data) {
  return request({
    url: '/deals',
    method: 'post',
    data,
  })
}

export function getDealByHouse(houseId, params) {
  return request({
    url: `/deals/house/${useUserStore().isLogin ? 'login/' : ''}${houseId}`,
    method: 'get',
    params,
  })
}

export function getAvgDealByHouse(houseId) {
  return request({
    url: `/deals/average/${houseId}`,
    method: 'get',
  })
}
