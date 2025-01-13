<script setup>
  import BtnGoBack from '../common/BtnGoBack.vue'
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'

  import { getHouse } from '@/api/houseInfo'
  import { createArticle } from '@/api/houseComment'

  const route = useRoute()
  const router = useRouter()
  const houseId = route.params.houseId
  const houseName = ref(null)
  const submitted = ref(false)
  const content = ref('')

  onMounted(() => {
    loadHouse()
  })

  function loadHouse() {
    getHouse(houseId)
      .then((res) => {
        houseName.value = res.data.name
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const src = ref([])
  const imgFiles = ref([])

  const addImage = (e) => {
    const file = e.target.files
    const fileLength = file.length
    let newList = []
    let imgFileList = []
    for (let i = 0; i < fileLength; i++) {
      newList.push({
        id: i,
        img: URL.createObjectURL(file[i]),
      })
      imgFileList.push(file[i])
    }
    src.value = newList
    imgFiles.value = imgFileList
  }

  const submit = () => {
    const formData = new FormData()

    const articleCreateRequest = {
      content: content.value,
    }

    // const blob = new Blob([JSON.stringify(articleCreateRequest)], {
    //   type: 'application/json',
    // })

    formData.append('articleCreateRequest', JSON.stringify(articleCreateRequest))

    imgFiles.value.forEach((img) => {
      formData.append('images', img)
    })

    createArticle(houseId, formData)
      .then(() => {
        submitted.value = true

        router.go(-1)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  onBeforeRouteLeave(
    () => submitted.value || confirm('정말 떠나실건가요? 작성 중인 내용은 사라집니다.')
  )

  const goBack = () => {
    router.back()
  }
</script>

<template>
  <v-container>
    <form @submit.prevent="submit">
      <div class="d-flex justify-space-between align-center mb-3">
        <div>
          <BtnGoBack @click="goBack" />
        </div>
        <div>
          <h1>아파트 톡</h1>
        </div>
        <v-chip color="transparent"></v-chip>
      </div>

      <v-card
        border="sm"
        variant="outlined"
        class="bg-white"
        style="border-radius: 32px; min-height: 100vh"
      >
        <v-card-item class="mt-3"
          ><v-card-title
            ><h1>{{ houseName }}</h1></v-card-title
          >
          <div>에 대한 이야기를 작성해주세요.</div></v-card-item
        >
        <v-container>
          <v-textarea
            variant="outlined"
            v-model="content"
            rows="12"
            hide-details
            resize="none"
          >
          </v-textarea>

          <div class="d-flex ga-2 pt-3">
            <label for="file-upload">
              <v-sheet
                width="60"
                height="60"
                class="d-flex align-center text justify-center bg-grey-lighten-2 rounded-lg mb-4 cursor-pointer"
              >
                <div>
                  <font-awesome-icon
                    color="white"
                    :icon="['fas', 'camera']"
                  />
                </div>
              </v-sheet>
            </label>

            <input
              id="file-upload"
              type="file"
              @change="addImage"
              multiple
              style="display: none"
            />
            <img
              v-for="item in src"
              width="60"
              height="60"
              class="border-thin rounded-lg"
              :key="item.id"
              :src="item.img"
            />
          </div>

          <v-btn
            class="w-100"
            color="primary"
            type="submit"
            variant="flat"
            rounded
            ><h3>등록하기</h3></v-btn
          >
        </v-container>
      </v-card>
    </form>
  </v-container>
</template>

<style scoped></style>
