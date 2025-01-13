import request from '@/utils/request'

export function addFavoriteRegion(sido, gugun, dong) {
  return request({
    url: '/regions/like',
    method: 'post',
    data: {
      sido,
      gugun,
      dong,
    },
  })
}
/*
region-controller

GET
/regions/{sido}/{gugun}/dongs

GET
/regions/{sido}/guguns

GET
/regions/sidos
*/

export function getDongs(sido, gugun) {
  return request({
    url: `/regions/${sido}/${gugun}/dongs`,
    method: 'get',
  })
}

export function getGuguns(sido) {
  return request({
    url: `/regions/${sido}/guguns`,
    method: 'get',
  })
}

export function getSidos() {
  return request({
    url: '/regions/sidos',
    method: 'get',
  })
}

/*
  GET
/regions/like
관심 지역 조회
*/

export function getFavoriteRegions() {
  return request({
    url: '/regions/like',
    method: 'get',
  })
}
