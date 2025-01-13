<script setup>
  import { RouterView } from 'vue-router'

  const routes = [
    {
      name: 'admin-user',
      title: '사용자 관리',
    },
    // {
    //   name: 'admin-house-info',
    //   title: '아파트 관리',
    // },
    // {
    //   name: 'admin-house-deal',
    //   title: '매물 관리',
    // },
  ]
</script>

<template>
  <div class="d-flex flex-row ga-0 pa-0 m-0 h-100">
    <v-sheet
      class="d-flex flex-column ga-0 pa-0 m-0 text-center"
      style="width: 15vw; min-width: 15vw"
      border="sm"
    >
      <v-list-item
        link
        v-for="{ name, title } in routes"
        :to="{ name }"
        :key="name"
        class="py-4"
      >
        <h4>{{ title }}</h4>
      </v-list-item>
    </v-sheet>
    <div
      class="d-flex justify-center align-center flex-grow-1 h-100 pa-8 overflow-x-scroll"
    >
      <v-sheet
        class="d-flex flex-column w-100 h-100"
        border="sm"
      >
        <router-view />
      </v-sheet>
    </div>
  </div>
</template>

<style scoped></style>
