<script setup>
  import { getMyDeals } from '@/api/user'
  import HouseDealItem from '../housedeal/HouseDealItem.vue'
  import MypageCard from './MypageCard.vue'
  import MypageCardRow from './MypageCardRow.vue'
  import { onMounted, ref } from 'vue'
  const houseDeals = ref([])
  onMounted(() => {
    getMyDeals().then((res) => {
      houseDeals.value = [...res.data.myDeals]
      console.log(houseDeals.value)
    })
  })
</script>

<template>
  <MypageCard title="내 매물">
    <template
      v-for="deal in houseDeals"
      :key="deal.dealId"
    >
      <MypageCardRow>
        <HouseDealItem
          :houseDeal="deal"
          :houseId="deal.house.houseId"
        />
      </MypageCardRow>
    </template>
  </MypageCard>
</template>

<style scoped></style>
