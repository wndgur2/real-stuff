import { ROLES } from '@/utils/user'

const userExample = {
  id: 'wndgur2',
  email: 'wndgur76@naver.com',
  name: '김민수',
  nickname: 'KIMMS',
  memberRole: ROLES.admin,
  isOAuth: false,
  disabled: false,
}

const userDumps = []

for (let i = 0; i < 100; i++) {
  const newUser = { ...userExample }
  newUser.id = newUser.id + i
  newUser.email = newUser.email + i
  newUser.name = newUser.name + i
  newUser.nickname = newUser.nickname + i
  newUser.memberRole = i % 3 === 0 ? ROLES.admin : i % 3 === 1 ? ROLES.user : ROLES.agent
  newUser.isOAuth =
    i % 3 === 0 ? 'kakao' : i % 3 === 1 ? 'google' : i % 3 === 2 ? 'naver' : 'false'
  newUser.disabled = i % 5 === 0 ? true : false
  userDumps.push(newUser)
}

export default userDumps
