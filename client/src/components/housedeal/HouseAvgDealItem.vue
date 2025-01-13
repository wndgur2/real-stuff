<script setup>
  import { meterToPyung, koreanPrice } from '@/utils/house'

  const { avgDeal } = defineProps({
    avgDeal: Object,
  })
</script>

<template>
  <tr>
    <td class="text-center">{{ meterToPyung(avgDeal.area) }}평</td>
    <td class="w-66 px-2 py-2">
      <div class="mx-auto">
        <div class="d-flex justify-start ga-4">
          <h4>매매</h4>
          <div>
            <h4>{{ koreanPrice(avgDeal.avgPrice * 10000) }} 원</h4>
          </div>
        </div>
        <div class="d-flex justify-start ga-4">
          <h4>전세</h4>
          <div>
            <h4>{{ koreanPrice(avgDeal.rentPrice) || '-' }} 원</h4>
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>

<style scoped></style>
