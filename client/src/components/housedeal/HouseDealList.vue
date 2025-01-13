<script setup>
  import HouseDealItem from '@/components/housedeal/HouseDealItem.vue'
  import HousePastDealItem from '@/components/housedeal/HousePastDealItem.vue'
  import { useRoute } from 'vue-router'
  import { ref, watch } from 'vue'
  import { getDealByHouse } from '@/api/houseDeal'
  const route = useRoute()
  const houseDeals = ref()
  const housePastDeals = ref()

  watch(
    () => route.params.houseId,
    async (newHouseId) => {
      getDealByHouse(newHouseId, { status: 'COMPLETED' }).then((res) => {
        console.log('completed: ', res)
        housePastDeals.value = res.data.deals
      })
      getDealByHouse(newHouseId, { status: 'PENDING' }).then((res) => {
        console.log('pendings: ', res)
        houseDeals.value = res.data.deals
      })
    },
    { immediate: true }
  )
</script>

<template>
  <div>
    <v-sheet>
      <v-sheet class="mb-5">
        <div class="d-flex justify-center">
          <div class="my-5">
            <h1>매물</h1>
          </div>
        </div>
        <HouseDealItem
          v-for="houseDeal in houseDeals"
          :key="houseDeal.dealId"
          :houseDeal="houseDeal"
          hideName
        />
      </v-sheet>
    </v-sheet>
    <v-sheet>
      <v-container>
        <div class="d-flex justify-center my-3">
          <div>
            <h1>실거래가</h1>
          </div>
        </div>

        <v-table>
          <thead class="no-break">
            <tr>
              <th class="text-center"><h3>계약일</h3></th>
              <th class="text-center"><h3>면적</h3></th>
              <th class="text-center"><h3>층수</h3></th>
              <th class="text-center"><h3>가격</h3></th>
            </tr>
          </thead>
          <tbody class="no-break">
            <HousePastDealItem
              v-for="housePastDeal in housePastDeals"
              :key="housePastDeal.dealId"
              :housePastDeal="housePastDeal"
            />
          </tbody>
        </v-table>
      </v-container>
    </v-sheet>
  </div>
</template>

<style scoped></style>
