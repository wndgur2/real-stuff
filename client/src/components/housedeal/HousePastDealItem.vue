<script setup>
  import { meterToPyung, koreanPrice } from '@/utils/house'

  const { housePastDeal } = defineProps({
    housePastDeal: Object,
  })
</script>

<template>
  <tr>
    <td class="text-center">
      <span>{{ housePastDeal.dealDate.split(' ')[0] }}</span>
    </td>
    <td>
      <span>{{ meterToPyung(housePastDeal.exclusiveArea) }}평</span>
    </td>
    <td class="text-left">
      <span> {{ housePastDeal.floor }}층 </span>
    </td>
    <td>
      <span>{{ koreanPrice(housePastDeal.price * 10000) }}</span>
    </td>
  </tr>
</template>

<style scoped></style>
