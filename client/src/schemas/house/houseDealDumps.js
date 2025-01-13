const example = {
  id: 1,
  area: '84.98',
  phone: '02-2051-1234',
  date: '2021-10-01',
  floor: 10,
  area: 124.98,
  price: 1000000,
  houseDealType: '매매',
  likedN: 5,
  liked: false,
  houseInfo: {
    id: 1,
    name: '테헤란 아이파크',
    dongName: '서초동',
    address: '서울특별시 강남구 테헤란로 311',
    houseType: '아파트',
    date: '2021-10-01',
    dong: 3,
    floor: 10,
    commentN: 3,
    liked: false,
  },
}

const houseDealDumps = []

for (let i = 0; i < 100; i++) {
  const newExample = { ...example }
  newExample.id = i + 1
  newExample.area = '84.98' + i
  newExample.phone = '02-2051-1234' + i
  newExample.date = '2021-10-0' + (i + 1)
  newExample.floor = (i % 10) + 1
  newExample.price = 1000000 + i * 10000
  newExample.likedN = i % 5
  newExample.liked = i % 2 === 0 ? true : false
  houseDealDumps.push(newExample)
}

export default houseDealDumps
