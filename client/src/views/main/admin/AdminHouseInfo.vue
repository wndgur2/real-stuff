<script setup>
  import BtnDefault from '@/components/common/BtnDefault.vue'
  import BtnSmall from '@/components/common/BtnSmall.vue'
  import AdminHouseInfoForm from '@/views/main/admin/AdminHouseInfoForm.vue'
  import { houseInfoDumps } from '@/schemas'
  import { ref } from 'vue'

  const houseInfos = ref(houseInfoDumps)
  const headers = [
    { title: 'ID', value: 'id', sortable: true },
    { title: '아파트명', value: 'name', sortable: true },
    { title: '동이름', value: 'dongName', sortable: true },
    { title: '주택유형', value: 'houseType', sortable: true },
    { title: '등록날짜', value: 'date', sortable: true },
    { title: '관리', key: 'actions' },
  ]
  const selected = ref([])
  const expanded = ref([])
  const dialog = ref(false)

  const updateHandler = (item) => {
    console.log('editHouseInfo', item)
    // reloadHouseInfos()
  }

  const deleteHouseInfo = (item) => {
    console.log('deleteHouseInfo', item)
    if (confirm('[' + item.id + '] ' + item.name + ' 아파트를 삭제합니까?')) {
      alert('삭제되었습니다.')
      // reloadHouseInfos()
    }
  }

  const deleteSelectedHouseInfos = () => {
    const n = selected.value.length
    if (n == 0) return alert('선택된 아파트가 없습니다.')
    console.log('deleteSelectedHouseInfos')
    if (confirm('정말 선택한 아파트 ' + n + '개를 모두 삭제합니까?')) {
      alert('삭제되었습니다.')
      // reloadHouseInfos()
    }
  }
</script>

<template>
  <v-data-table
    :items="houseInfos"
    :headers="headers"
    v-model="selected"
    item-value="id"
    show-select
    show-expand
    v-model:expanded="expanded"
    class="d-flex flex-grow-1 no-break"
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title><h3 class="text-secondary">아파트 관리</h3></v-toolbar-title>
        <BtnSmall
          border="error"
          class="text-error bg-surface mr-4"
          @click="deleteSelectedHouseInfos"
          ><h5>선택한 아파트 삭제</h5></BtnSmall
        >
      </v-toolbar>
    </template>
    <template #item.actions="{ item }">
      <div class="d-flex align-center">
        <AdminHouseInfoForm
          :houseInfo="item"
          :dialog="dialog"
          @updated="updateHandler"
        />

        <v-btn
          icon="fa-trash"
          size="small"
          variant="plain"
          rounded="circle"
          @click="deleteHouseInfo(item)"
        ></v-btn>
      </div>
    </template>
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <div class="d-flex pa-4 ga-4 align-center">
            <v-chip variant="outlined">주소: {{ item.address }}</v-chip>
            <v-chip variant="outlined">{{ item.dong }}동</v-chip>
            <v-chip variant="outlined">{{ item.floor }}층</v-chip>
            <v-chip variant="outlined">댓글: {{ item.commentN }}</v-chip>
            <BtnDefault border="secondary md">지도에서 확인하기</BtnDefault>
          </div>
        </td>
      </tr>
    </template>
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
  </v-data-table>
</template>
