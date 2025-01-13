<script setup>
  import { computed } from 'vue'
  import { RouterLink, useRouter } from 'vue-router'
  const router = useRouter()
  const isNotice = computed(() => router.currentRoute.value.fullPath.includes('notice'))
  const title = computed(() => (isNotice.value ? '공지사항' : 'Qna'))
</script>

<template>
  <v-container class="h-100 w-75 d-flex mt-16 align-center flex-column">
    <h1 class="my-12">{{ title }}</h1>
    <div class="d-flex w-100 border-sm bg-surface">
      <v-sheet class="w-50 text-center">
        <router-link :to="{ name: 'notice' }">
          <h2
            class="py-3"
            :class="{ 'bg-primary': isNotice }"
          >
            공지사항
          </h2>
        </router-link>
      </v-sheet>
      <div class="w-50 text-center">
        <router-link :to="{ name: 'qna' }">
          <h2
            class="py-3 bg-surface"
            :class="{ 'bg-primary': !isNotice }"
          >
            Q&A
          </h2>
        </router-link>
      </div>
    </div>

    <div class="d-flex flex-column w-100 py-4 mt-2">
      <router-view />
    </div>
  </v-container>
</template>

<style scoped>
  a {
    display: block;
    padding: 0;
  }
</style>
