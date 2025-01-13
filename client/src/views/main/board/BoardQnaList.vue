<script setup>
  import { getQuestions } from '@/api/qna'
  import { ROLES } from '@/utils/user'
  import { onMounted, ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import { useUserStore } from '@/store/user'
  import { storeToRefs } from 'pinia'
  const qnas = ref([])
  const user = storeToRefs(useUserStore()).user
  onMounted(() => {
    getQuestions().then((res) => {
      console.log(res.data)
      qnas.value = res.data.questions
    })
  })
</script>
<template>
  <div>
    <v-row>
      <v-col
        cols="6"
        class="d-flex justify-start"
      >
        <template v-if="user.memberRole != ROLES.guest">
          <v-btn
            variant="outlined"
            border="sm"
            class="text-info bg-surface"
            rounded="0"
            size="large"
            :to="{ name: 'qna-form', params: { type: 'regist' } }"
          >
            질문하기
          </v-btn>
        </template>
      </v-col>
      <!-- <v-col
        cols="6"
        class="d-flex ga-4 align-center"
        ><v-select
          variant="outlined"
          v-model="searchKey"
          label="검색조건"
          :items="selectOption"
          item-title="text"
          item-value="value"
          density="compact"
          rounded="0"
          hide-details
        ></v-select>
        <v-text-field
          variant="outlined"
          v-model="searchWord"
          density="compact"
          class="w-50"
          rounded="0"
          hide-details
        />
        <v-btn
          variant="outlined"
          border="sm"
          class="text-info bg-surface"
          size="large"
          rounded="0"
          @click="getArticles"
          >검색</v-btn
        >
      </v-col> -->
    </v-row>

    <div
      style="min-height: 40vh"
      class="mt-4"
    >
      <v-divider class="border-opacity-100"></v-divider>
      <v-table class="w-100 border-sm">
        <thead>
          <tr>
            <th class="text-center w-10">글번호</th>
            <th class="text-center w-55">제목</th>
            <!-- <th class="text-center w-25">진행상태</th> -->
            <th class="text-center w-25">작성자</th>
            <!-- <th class="text-center w-25">날짜</th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="article in qnas"
            :key="article.questionId"
          >
            <td class="text-center">{{ article.questionId }}</td>
            <td class="text-center">
              <router-link
                :to="{
                  name: 'qna-detail',
                  params: { articleId: article.questionId },
                }"
              >
                {{ article.title }}
              </router-link>
            </td>
            <!-- <td class="text-center">{{ article.isSolved ? '완료' : '대기' }}</td> -->
            <!-- <td class="text-center">{{ article.date }}</td> -->
            <td class="text-center">{{ article.nickname }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<style scoped>
  button {
    border: 1px solid #abc;
    padding: 0.4em 1em;
  }
</style>
