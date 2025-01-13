<script setup>
  import { getNotices } from '@/api/notice'
  import { useUserStore } from '@/store/user'
  import { ROLES } from '@/utils/user'
  import { onMounted, ref } from 'vue'
  import { RouterLink } from 'vue-router'

  const userStore = useUserStore()
  const { user } = userStore

  const notices = ref([])
  onMounted(() => {
    getNotices().then((res) => {
      console.log(res.data)
      notices.value = res.data.notices
    })
  })
</script>
<template>
  <div
    style="min-height: 40vh"
    class="d-flex flex-column ga-4"
  >
    <template v-if="user.memberRole === ROLES.admin || user.memberRole === ROLES.master">
      <v-btn
        variant="outlined"
        border="sm"
        class="text-info bg-surface"
        rounded="0"
        size="large"
        :to="{ name: 'notice-form', params: { type: 'regist' } }"
      >
        글쓰기
      </v-btn>
    </template>
    <div>
      <v-divider class="border-opacity-100"></v-divider>
      <v-table class="w-100 border-sm">
        <thead>
          <tr>
            <th class="text-center w-75">제목</th>
            <th class="text-center w-25">날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="article in notices"
            :key="article.id"
          >
            <td class="text-center">
              <router-link
                :to="{ name: 'notice-detail', params: { articleId: article.noticeId } }"
              >
                {{ article.title }}
              </router-link>
            </td>
            <td class="text-center">{{ article.createdAt }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<style scoped></style>
