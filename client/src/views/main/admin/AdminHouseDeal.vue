<script setup>
  import { houseDealDumps } from '@/schemas'
  import { ref } from 'vue'
  import AdminHouseDealForm from './AdminHouseDealForm.vue'
  import BtnSmall from '@/components/common/BtnSmall.vue'

  const houseDeals = ref(houseDealDumps)

  const headers = [
    { title: 'ID', value: 'id' },
    { title: '면적', value: 'area' },
    { title: '전화번호', value: 'phone' },
    { title: '등록날짜', value: 'date' },
    { title: '층', value: 'floor' },
    { title: '가격', value: 'price' },
    { title: '좋아요', value: 'likedN' },
    { title: '관리', value: 'actions' },
  ]
  const selected = ref([])
  const dialog = ref(false)

  const updateHandler = (item) => {
    console.log('editHouseDeal', item)
    // reloadHouseDeals()
  }

  const deleteHouseDeal = (item) => {
    console.log('deleteHouseDeal', item)
    if (confirm('[' + item.id + '] ' + item.area + 'm² 매물을 삭제합니까?')) {
      alert('삭제되었습니다.')
      // reloadHouseDeals()
    }
  }

  const deleteSelectedHouseDeals = () => {
    const n = selected.value.length
    if (n == 0) return alert('선택된 매물이 없습니다.')
    console.log('deleteSelectedHouseDeals')
    if (confirm('정말 선택한 매물 ' + n + '개를 모두 삭제합니까?')) {
      alert('삭제되었습니다.')
      // reloadHouseDeals()
    }
  }
</script>

<template>
  <v-data-table
    :items="houseDeals"
    :headers="headers"
    show-select
    v-model="selected"
    item-value="id"
    class="d-flex flex-grow-1 no-break"
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title><h3 class="text-secondary">매물 관리</h3></v-toolbar-title>
        <BtnSmall
          border="error"
          class="text-error bg-surface mr-4"
          @click="deleteSelectedHouseDeals"
          ><h5>선택한 매물 삭제</h5></BtnSmall
        >
      </v-toolbar>
    </template>
    <template #item.actions="{ item }">
      <div class="d-flex align-center">
        <AdminHouseDealForm
          :houseDeal="item"
          :dialog="dialog"
          @updated="updateHandler"
        />

        <v-btn
          icon="fa-trash"
          size="small"
          variant="plain"
          rounded="circle"
          @click="deleteHouseDeal(item)"
        ></v-btn>
      </div>
    </template>
  </v-data-table>
</template>

<style scoped></style>
