const example = {
  id: 1,
  name: '테헤란 아이파크',
  dongName: '서초동',
  address: '서울특별시 강남구 테헤란로 311',
  houseType: '아파트',
  houseDealType: '매매',
  date: '2021-10-01',
  dong: 3,
  floor: 10,
  commentN: 3,
  liked: false,
  price: 104000000,
  area: 84.5,
  lat: 37.504,
  lng: 127.057,
}

const houseInfoDumps = []

for (let i = 0; i < 100; i++) {
  const newExample = { ...example }
  newExample.id = i + 1
  newExample.name = newExample.name + i
  newExample.dongName = newExample.dongName
  newExample.address = newExample.address + i
  newExample.houseType = i % 2 === 0 ? '아파트' : '빌라'
  newExample.houseDealType = i % 2 === 0 ? '매매' : '전세'
  newExample.date = '2021-10-0' + (i + 1)
  newExample.dong = (i % 3) + 1
  newExample.floor = (i % 10) + 1
  newExample.commentN = i % 5
  newExample.liked = i % 2 === 0 ? true : false
  newExample.price = Math.floor(12400 + Math.random() * 100000) * 10000
  newExample.area = 84.5 + i * 0.5
  newExample.lat = 37.504 + Math.random() * 0.01 - 0.005
  newExample.lng = 127.057 + Math.random() * 0.01 - 0.005
  houseInfoDumps.push(newExample)
}

export default houseInfoDumps
