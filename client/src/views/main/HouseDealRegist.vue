<script setup>
  import { useRouter } from 'vue-router'
  import { ref, reactive, onMounted, watch } from 'vue'
  import { getDongs, getGuguns, getSidos } from '@/api/region'
  import { getHouseByname, createDealForHouse } from '@/api/houseInfo'

  const router = useRouter()
  const submitted = ref(false)
  const newDeal = ref({})
  const images = ref([])
  const houseId = ref('')

  watch(images, (newVal) => {
    console.log(newVal)
  })

  const saleType = [
    { item: '매매', value: 'SALE' },
    { item: '전세', value: 'RENT' },
    { item: '월세', value: 'MONTHLY_RENT' },
  ]

  const sido = ref('')
  const gugun = ref('')
  const dong = ref('')
  const houseName = ref('')
  const houses = ref([])

  const labels = reactive({
    sidos: { id: 'sido', label: '시/도', values: [] },
    guguns: { id: 'gugun', label: '구/군', values: [] },
    dongs: { id: 'dong', label: '동', values: [] },
  })

  onMounted(() => {
    getSidos().then((res) => {
      labels.sidos.values = res.data.data.filter((data) => data)
    })
  })

  const handleSidoChange = (value) => {
    sido.value = value
    getGuguns(value).then((res) => {
      labels.guguns.values = res.data.data.filter((data) => data)
    })
  }

  const handleGugunChange = (value) => {
    gugun.value = value
    getDongs(sido.value, value).then((res) => {
      labels.dongs.values = res.data.data.filter((data) => data)
    })
  }

  const handleDongChange = (value) => {
    dong.value = value
    search()
  }

  const search = () => {
    if (sido.value && gugun.value && dong.value && houseName.value) {
      getHouseByname(sido.value, gugun.value, dong.value, houseName.value)
        .then((res) => {
          houses.value = res.data.houseNames
          console.log(houses.value)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  const submit = () => {
    if (houseId.value) {
      console.log(houseId.value)

      const formData = new FormData()

      const dealCreateRequest = {
        exclusiveArea: newDeal.value.exclusiveArea,
        floor: newDeal.value.floor,
        price: newDeal.value.price,
        type: newDeal.value.type,
        houseId: houseId.value,
      }

      formData.append('dealCreateRequest', JSON.stringify(dealCreateRequest))
      images.value.forEach((image) => {
        formData.append('images', image)
      })

      createDealForHouse(formData)
        .then(() => {
          submitted.value = true
          router.push({
            name: 'house-info-detail',
            params: { houseId: houseId.value },
          })
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
</script>

<template>
  <v-container class="h-100 w-75 d-flex mt-16 align-center flex-column">
    <h1 class="my-12">매물등록</h1>
    <v-divider
      class="w-100"
      color="info"
    ></v-divider>
    <div class="d-flex flex-column w-100 py-4 mt-2">
      <form @submit:prevent="submit">
        <v-row>
          <v-col
            cols="4"
            md="3"
          >
            <v-select
              v-model="sido"
              :items="labels.sidos.values"
              label="시/도"
              variant="outlined"
              @update:model-value="handleSidoChange"
            ></v-select>
          </v-col>

          <v-col
            cols="4"
            md="3"
          >
            <v-select
              v-model="gugun"
              :items="labels.guguns.values"
              label="구/군"
              variant="outlined"
              @update:model-value="handleGugunChange"
            ></v-select>
          </v-col>

          <v-col
            cols="4"
            md="3"
          >
            <v-select
              v-model="dong"
              :items="labels.dongs.values"
              label="동"
              variant="outlined"
              @update:model-value="handleDongChange"
            ></v-select>
          </v-col>

          <v-col
            cols="12"
            md="3"
          >
            <v-text-field
              v-model="houseName"
              label="아파트 이름"
              variant="outlined"
              @input="search"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-select
              v-model="houseId"
              :items="houses"
              item-title="name"
              item-value="houseId"
              label="아파트 선택"
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col
            cols="8"
            md="4"
          >
            <v-select
              v-model="newDeal.type"
              label="거래종류"
              variant="outlined"
              :items="saleType"
              item-title="item"
              item-value="value"
            ></v-select>
          </v-col>
          <v-col
            cols="4"
            md="4"
          >
            <v-text-field
              v-model="newDeal.floor"
              label="층"
              variant="outlined"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col
            cols="8"
            md="4"
          >
            <v-text-field
              v-model="newDeal.exclusiveArea"
              label="면적(m²)"
              variant="outlined"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="newDeal.price"
              label="가격"
              variant="outlined"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-file-input
              v-model="images"
              variant="outlined"
              label="이미지"
              multiple
              accept="image/*"
            ></v-file-input>
          </v-col>
        </v-row>

        <v-divider class="w-100"></v-divider>
        <v-row>
          <v-col
            cols="12"
            class="d-flex justify-center ga-6 mt-10"
          >
            <v-btn
              rounded="0"
              color="primary"
              elevation="0"
              variant="outlined"
              @click="submit"
            >
              등록
            </v-btn>
            <v-btn
              elevation="0"
              rounded="0"
              border="sm"
              @click="router.push({ name: 'house-info-list' })"
            >
              취소
            </v-btn>
          </v-col>
        </v-row>
      </form>
    </div>
  </v-container>
</template>

<style scoped>
  a {
    display: block;
    padding: 0;
  }
</style>
