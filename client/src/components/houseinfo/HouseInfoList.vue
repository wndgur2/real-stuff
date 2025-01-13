<script setup>
  import HouseInfoItem from '@/components/houseinfo/HouseInfoItem.vue'
  import SearchBox from '@/components/common/SearchBox.vue'
  import { useHouseInfoStore } from '@/store/house'
  import { storeToRefs } from 'pinia'
  import { computed, ref } from 'vue'
  import AppLoader from '../common/AppLoader.vue'
  const { houseInfos } = storeToRefs(useHouseInfoStore())

  // infinite scroll
  const SIZE = 6
  const page = ref(1)
  const _houseInfos = computed(() => houseInfos.value.slice(0, page.value * SIZE))
  const element = ref()
  const loading = ref(false)

  const handleScroll = () => {
    if (page.value * SIZE >= houseInfos.value.length) return
    const { scrollTop, clientHeight, scrollHeight } = element.value
    if (scrollTop + clientHeight + 20 >= scrollHeight && !loading.value) {
      loading.value = true
      setTimeout(() => {
        page.value++
        loading.value = false
      }, 500 + Math.random() * 800)
    }
  }
</script>

<template>
  <div
    class="h-100 overflow-y-scroll"
    @scroll="handleScroll"
    ref="element"
  >
    <SearchBox />
    <HouseInfoItem
      v-for="houseInfo in _houseInfos"
      :houseInfo="houseInfo"
      :key="houseInfo.houseId"
      :image="`/src/assets/images/houses/house_${houseInfo.houseId % 22}.png`"
    />
    <AppLoader v-if="loading" />
  </div>
</template>

<style scoped></style>
