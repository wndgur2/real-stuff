import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHouseInfoStore = defineStore('houseInfo', () => {
  const houseInfos = ref([])
  const moveFlag = ref(false)
  const currentLocation = ref({
    sido: '',
    gugun: '',
    dong: '',
  })

  const setCurrentLocation = (newLocation) => {
    currentLocation.value = { ...newLocation }
  }

  const setHouseInfos = (newHouseInfos) => {
    houseInfos.value = [...newHouseInfos]
  }

  const moveMap = () => {
    moveFlag.value = !moveFlag.value
  }

  return {
    houseInfos,
    moveFlag,
    setHouseInfos,
    currentLocation,
    setCurrentLocation,
    moveMap,
  }
})
