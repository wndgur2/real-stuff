<script setup>
  import { useUserStore } from '@/store/user'
  import { storeToRefs } from 'pinia'
  import { onMounted, reactive, ref, watch } from 'vue'
  import SearchBoxSelect from './SearchBoxSelect.vue'
  import { getDongs, getGuguns, getSidos } from '@/api/region'
  import { getAllHouses } from '@/api/houseInfo'
  import { useHouseInfoStore } from '@/store/house'
  import { regionToString } from '@/utils/text'
  import { rules } from '@/utils/form'
  const userStore = useUserStore()
  const houseInfoStore = useHouseInfoStore()
  const { favoriteRegions, isLogin } = storeToRefs(userStore)
  const sido = ref('')
  const gugun = ref('')
  const dong = ref('')
  const favorite = ref('')
  const labels = reactive({
    sidos: { id: 'sido', label: '시/도', values: [], rules: [rules.required] },
    guguns: { id: 'gugun', label: '구/군', values: [], prefix: '시/도를' },
    dongs: { id: 'dong', label: '동', values: [], prefix: '구/군을' },
  })
  const favorites = ref({})

  onMounted(() => {
    getSidos().then((res) => {
      labels.sidos.values = res.data.data
    })
  })

  watch(
    favoriteRegions,
    (regions) => {
      favorites.value = {
        id: 'favorite',
        label: '관심 지역',
        values: regions.map((region) => regionToString(region)),
      }
    },
    { deep: true, immediate: true }
  )

  const handleSelected = (id, value) => {
    if (id == 'sido') {
      sido.value = value
      getGuguns(value).then((res) => {
        labels.guguns.values = res.data.data.filter((data) => data)
      })
    } else if (id == 'gugun') {
      gugun.value = value
      getDongs(sido.value, value).then((res) => {
        labels.dongs.values = res.data.data.filter((data) => data)
      })
    } else if (id == 'dong') {
      dong.value = value
    } else if (id == 'favorite') {
      favorite.value = value
      getAllHouses(...value.split(' '), 'APT', 0, 1000)
        .then((res) => {
          houseInfoStore.setHouseInfos(res.data.houses)
          houseInfoStore.moveMap()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const search = () => {
    getAllHouses(sido.value, gugun.value || null, dong.value || null, 'APT', 0, 1000)
      .then((res) => {
        houseInfoStore.setHouseInfos(res.data.houses)
        houseInfoStore.moveMap()
      })
      .catch((err) => {
        console.log(err)
      })
  }
</script>

<template>
  <v-list-item class="my-2 mt-3">
    <v-form
      class="d-flex flex-row ga-3 flex-wrap pt-2 align-center justify-space-between"
      fast-fail
      @submit.prevent="search"
    >
      <SearchBoxSelect
        class="w-33"
        v-for="label in Object.values(labels)"
        :rules="label.rules"
        :key="label.id"
        :id="label.id"
        :label="label.label"
        :icon="label.icon"
        :iconColor="label.color"
        :values="label.values"
        :prefix="label.prefix"
        @selected="handleSelected"
      />
      <v-btn
        icon="fa-magnifying-glass"
        size="small"
        variant="text"
        border="sm"
        class="border-secondary"
        color="secondary"
        type="submit"
      ></v-btn>

      <SearchBoxSelect
        v-if="isLogin"
        class="w-100 flex-grow-2"
        :id="favorites.id"
        :label="favorites.label"
        icon="fa-star"
        iconColor="#FAE012"
        :values="favorites.values"
        @selected="handleSelected"
      />
    </v-form>
  </v-list-item>
</template>

<style scoped></style>
