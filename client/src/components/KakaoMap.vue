<script setup>
  import { getAllHouses, getHouse } from '@/api/houseInfo'
  import { getOverlay } from '@/utils/map'
  import { onMounted, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useHouseInfoStore } from '@/store/house'
  import { storeToRefs } from 'pinia'

  const mapContainer = ref(null)
  const centerLocation = ref({ lat: 37.504826, lng: 127.0586567 })

  const houseInfoStore = useHouseInfoStore()
  const { setCurrentLocation } = houseInfoStore
  const houseInfos = storeToRefs(houseInfoStore).houseInfos
  const router = useRouter()
  const route = useRoute()

  const markers = []
  let previousRegion = ''

  // const zoomSizeByLevel = [
  //   0, 20, 30, 50, 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000,
  // ]

  // add click event listener on real dom
  window.markerClickHandler = function (id) {
    router.push({ name: 'house-info-detail', params: { houseId: id } })
  }

  // add hover event listener
  window.markerHoverHandler = function (id) {
    console.log('hover', id)
  }

  onMounted(() => {
    /* global kakao */
    kakao.maps.load(initMap)

    function initMap() {
      const mapOption = {
        center: new kakao.maps.LatLng(centerLocation.value.lat, centerLocation.value.lng), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
      }
      const map = new kakao.maps.Map(mapContainer.value, mapOption)
      const geocoder = new kakao.maps.services.Geocoder()
      const imageSrc = '/src/assets/images/icons/marker.svg'

      // get device location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          centerLocation.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }

          // move map
          map.panTo(
            new kakao.maps.LatLng(centerLocation.value.lat, centerLocation.value.lng)
          )
        })
      }

      var clusterer = new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 3, // 클러스터 할 최소 지도 레벨
        gridSize: 95,
        styles: [
          {
            width: '40px',
            height: '40px',
            background: 'rgba(0, 160, 255, 0.5)',
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '40px',
          },
          {
            width: '60px',
            height: '60px',
            background: 'rgba(50, 100, 180, 0.6)',
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '60px',
          },
          {
            width: '100px',
            height: '100px',
            background: 'rgba(250, 160, 100, 0.7)',
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '100px',
          },
        ],
      })

      let currentRequestId = 0

      searchAddrFromCoords(map.getCenter(), printCenterInfo)

      kakao.maps.event.addListener(map, 'idle', function () {
        searchAddrFromCoords(map.getCenter(), printCenterInfo)
      })

      watch(
        () => route.params.houseId,
        (newHouseId) => {
          if (!newHouseId) return
          // move map center to house location
          getHouse(newHouseId)
            .then((res) => {
              const house = res.data
              const lat = house.latitude
              const lng = house.longitude

              map.panTo(new kakao.maps.LatLng(lat, lng))
              if (map.getLevel() > 2) map.setLevel(2)
            })
            .catch((err) => {
              console.error(err)
            })
        }
      )

      watch(
        () => houseInfoStore.moveFlag,
        (_) => {
          // move map center to house location
          const lat = houseInfos.value[0].latitude
          const lng = houseInfos.value[0].longitude

          map.panTo(new kakao.maps.LatLng(lat, lng))
        }
      )

      function searchAddrFromCoords(coords, callback) {
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback)
      }

      function printCenterInfo(result, status) {
        const zoom = map.getLevel()

        const sido = result[0].region_1depth_name
        const gugun = zoom < 8 ? result[0].region_2depth_name : null
        const dong = zoom < 6 ? result[0].region_3depth_name : null

        const region = dong || gugun || sido

        if (previousRegion === region) return
        previousRegion = region

        // remove all markers
        markers.forEach((marker) => marker.setMap(null))
        markers.length = 0
        clusterer.clear()

        currentRequestId++

        setCurrentLocation({ sido, gugun, dong })
        houseInfos.value = []
        searchHouses({ sido, gugun, dong }, 0, currentRequestId)
      }

      async function searchHouses({ sido, gugun, dong }, i, id) {
        if (id < currentRequestId) return

        getAllHouses(sido, gugun, dong, 'APT', i, 150)
          .then((res) => {
            houseInfos.value = [...houseInfos.value, ...res.data.houses]
            if (res.data.houses.length === 0) return
            else searchHouses({ sido, gugun, dong }, i + 1, id)

            for (const houseInfo of res.data.houses) {
              var content = getOverlay(imageSrc, houseInfo)
              // 커스텀 오버레이를 생성합니다
              const customOverlay = new kakao.maps.CustomOverlay({
                position: new kakao.maps.LatLng(
                  houseInfo.latitude - -0.0008,
                  houseInfo.longitude - 0.0005
                ),
                content: content,
              })

              markers.push(customOverlay)
            }
            clusterer.addMarkers(markers)
          })
          .catch((err) => {
            console.error(err)
          })
      }
    }
  })
</script>

<template>
  <div
    id="map"
    class="w-100 h-100"
    ref="mapContainer"
  ></div>
</template>
