<script setup>
  import { onMounted, ref } from 'vue'
  import AdminUserForm from './AdminUserForm.vue'
  import BtnSmall from '@/components/common/BtnSmall.vue'
  import { getMembers, toggleMemberStatus } from '@/api/user'

  const users = ref([])
  const headers = [
    { title: 'ID', value: 'memberId', sortable: true },
    { title: '이메일', value: 'email', sortable: true },
    { title: '이름', value: 'name', sortable: true },
    { title: '닉네임', value: 'nickname', sortable: true },
    { title: '역할', value: 'memberRole', sortable: true },
    // { title: 'OAuth', value: 'isOAuth', sortable: true },
    { title: '수정', key: 'update' },
    { title: '비활성화', key: 'disable', value: 'disabled' },
  ]
  const dialog = ref(false)
  const selected = ref([])

  onMounted(() => {
    getMembers().then((res) => {
      console.log(res.data)
      users.value = res.data.members
      users.value.forEach((u) => {
        u.disabled = u.status === 'DORMANT'
      })
    })
  })

  const updateHandler = (item) => {
    console.log('editUser', item)
  }

  const toggleUser = (item) => {
    console.log(item)
    if (item.disabled) {
      if (confirm('[' + item.memberId + '] ' + item.name + ' 사용자를 활성화합니까?')) {
        toggleMemberStatus(item.memberId).then((res) => {
          console.log(res.data)
          item.disabled = false
          alert('활성화되었습니다.')
        })
      }
    } else if (
      confirm('[' + item.memberId + '] ' + item.name + ' 사용자를 비활성화합니까?')
    ) {
      toggleMemberStatus(item.memberId).then((res) => {
        console.log(res.data)
        item.disabled = true
        alert('비활성화되었습니다.')
      })
    }
  }

  const disableSelectedUsers = () => {
    const n = selected.value.length
    if (n == 0) return alert('선택된 사용자가 없습니다.')
    if (confirm('정말 선택한 사용자 ' + n + '명을 모두 비활성화합니까?')) {
      selected.value.forEach((id) => {
        const user = users.value.find((u) => u.id == id)
        user.disabled = true
      })
      selected.value = []
      alert('비활성화되었습니다.')
      // reloadUsers()
    }
  }
</script>

<template>
  <v-data-table
    :items="users"
    :headers="headers"
    v-model="selected"
    item-value="memberId"
    class="d-flex flex-grow-1 no-break"
    show-select
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title><h3 class="text-secondary">사용자 관리</h3></v-toolbar-title>
        <BtnSmall
          border="error"
          class="text-error bg-surface mr-4"
          @click="disableSelectedUsers"
          ><h5>선택한 사용자 비활성화</h5></BtnSmall
        >
      </v-toolbar>
    </template>
    <template #item.update="{ item }">
      <AdminUserForm
        :user="item"
        :dialog="dialog"
        @updated="updateHandler"
      />
    </template>
    <template #item.disable="{ item }">
      <div class="d-block">
        <v-switch
          inset
          color="red"
          v-model="item.disabled"
          style="scale: 0.7"
          base-color="success"
          @click.prevent="toggleUser(item)"
        ></v-switch>
      </div>
    </template>
  </v-data-table>
</template>

<style scoped>
  .v-switch > *:last-child {
    display: none;
  }
</style>
