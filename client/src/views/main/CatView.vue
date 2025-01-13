<script setup>
  import { ref } from 'vue'
  import { VueSpinner } from 'vue3-spinners'
  import { getCat } from '@/api/cat'

  const imgEl = ref(null)
  const loading = ref(true)

  const getCatImg = () => {
    loading.value = true
    getCat()
      .then((res) => {
        imgEl.value.src = res.data[0].url
        loading.value = false
      })
      .catch((err) => console.log(err))
      .finally(() => console.log('axios 끝'))
  }

  getCatImg()
</script>

<template>
  <v-container grid-list-xs>
    <v-sheet
      class="d-flex justify-space-around"
      style="height: 720px"
    >
      <v-sheet>
        <h1>This is a CAT page</h1>
        <v-btn @click="getCatImg">I want new cat</v-btn>
        <br />
        <vue-spinner
          v-if="loading"
          size="48"
        ></vue-spinner>
      </v-sheet>
      <img
        ref="imgEl"
        width="480px"
        height="480px"
        style="object-fit: cover"
      />
    </v-sheet>
  </v-container>
</template>

<style scoped></style>
