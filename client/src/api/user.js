// Member 컨트롤러
import request from '@/utils/request'

export function getMembers() {
  return request({
    url: '/members',
    method: 'get',
  })
}

// PATCH
// /members/{memberId}/status

export function toggleMemberStatus(memberId) {
  return request({
    url: `/members/${memberId}/status`,
    method: 'patch',
  })
}

export function socialLogin(data) {
  return request({
    url: '/auth/social-login',
    method: 'post',
    data,
  })
}

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

export function reissueToken() {
  return request({
    url: '/auth/reissue',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'delete',
  })
}

export function createMember(data) {
  return request({
    url: '/members',
    method: 'post',
    data,
  })
}

export function requestPasswordReset(data) {
  return request({
    url: '/members/password-reset/request',
    method: 'post',
    data,
  })
}

export function verifyPasswordReset(data) {
  return request({
    url: '/members/password-reset/verify',
    method: 'post',
    data,
  })
}

export function createAdminMember(data) {
  return request({
    url: '/members/admin',
    method: 'post',
    data,
  })
}

export function updateProfileImage(data) {
  return request({
    url: '/members/profile-image',
    method: 'patch',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export function updatePassword(data) {
  return request({
    url: '/members/password',
    method: 'patch',
    data,
  })
}

export function getMemberNickname() {
  return request({
    url: '/members/nickname',
    method: 'get',
  })
}

export function updateMemberNickname(data) {
  return request({
    url: '/members/nickname',
    method: 'patch',
    data,
  })
}

export function getCurrentMemberInfo() {
  return request({
    url: '/me',
    method: 'get',
  })
}

export function updateCurrentMemberInfo(data) {
  return request({
    url: '/me',
    method: 'patch',
    data,
  })
}

export function updateLoginId(data) {
  return request({
    url: '/members/login-id',
    method: 'patch',
    data,
  })
}

export function getMyDeals() {
  return request({
    url: '/me/deals',
    method: 'get',
    params: {
      size: null,
      cursorId: null,
    },
  })
}

export function createLikeDeal(id) {
  return request({
    url: `/deals/like/${id}`,
    method: 'post',
  })
}

export function deleteLikeDeal(id) {
  return request({
    url: `/deals/like/${id}`,
    method: 'delete',
  })
}

export function getLikeDeals() {
  return request({
    url: '/deals/like',
    method: 'get',
    params: { size: 30, authority: 'USER' },
  })
}

export function getLikeHouses() {
  return request({
    url: '/houses/like',
    method: 'get',
    params: { size: 30, authority: 'USER' },
  })
}

// POST
// /houses/like/{houseId}

export function createLikeHouse(houseId) {
  return request({
    url: `/houses/like/${houseId}`,
    method: 'post',
  })
}

//DELETE
// /houses/like/{houseId}
// 관심 House 삭제

export function deleteLikeHouse(houseId) {
  return request({
    url: `/houses/like/${houseId}`,
    method: 'delete',
  })
}
