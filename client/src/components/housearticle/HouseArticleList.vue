<script setup>
  import { onMounted, ref } from 'vue'
  import { getArticlesByHouse } from '@/api/houseComment'
  import { useRoute, useRouter } from 'vue-router'
  import { RouterView } from 'vue-router'
  import NoData from '../common/NoData.vue'
  import HouseArticleItem from './HouseArticleItem.vue'

  const articles = ref([])
  const images = ref([])
  const route = useRoute()
  const router = useRouter()
  const openedImage = ref(null)
  const imageOpened = ref(false)

  const openImage = (i) => {
    imageOpened.value = true
    openedImage.value = i
  }

  const closeImage = () => {
    imageOpened.value = false
    setTimeout(() => {
      openedImage.value = null
    }, 500)
  }

  const goDetail = (articleId) => {
    router.push({
      name: 'house-article-detail',
      params: { articleId: articleId },
    })
  }

  getArticlesByHouse(route.params.houseId).then((res) => {
    articles.value = res.data.articles
    console.log(articles.value)
    articles.value.forEach((article) => {
      images.value.push(...article.imageUrl)
    })
  })
</script>

<template>
  <v-card
    border="sm"
    variant="outlined"
    class="bg-white"
    style="border-radius: 32px"
    v-if="articles.length"
  >
    <v-container>
      <v-card
        border="0"
        class="w-100 d-flex flex-wrap"
        variant="outlined"
        style="border-radius: 20px"
      >
        <v-sheet
          v-for="(image, i) in images"
          :key="image"
          style="max-height: 128px; max-width: 33%; cursor: pointer; overflow: hidden"
          rounded="lg"
          class="ma-1"
          @click="openImage(i)"
        >
          <img
            :src="image"
            alt="house"
            style="object-fit: cover"
            class="w-100 h-100"
          />
        </v-sheet>
      </v-card>
    </v-container>
    <v-divider class="mx-4" />
    <template
      v-for="(article, index) in articles"
      :key="article.articleId"
    >
      <div
        @click="goDetail(article.articleId)"
        style="cursor: pointer"
      >
        <HouseArticleItem :article="article" />
      </div>
      <v-divider
        class="mx-4"
        v-if="index < articles.length - 1"
      ></v-divider>
    </template>
  </v-card>
  <NoData v-else />

  <v-dialog
    v-model="imageOpened"
    width="800"
    height="600"
  >
    <div class="w-100 h-100 d-flex justify-center align-center bg-black pa-8">
      <img
        :src="images[openedImage]"
        alt="house"
        style="object-fit: contain; max-width: 100%; max-height: 100%"
      />
      <v-btn
        icon="fa-xmark"
        border="0"
        variant="outlined"
        @click="closeImage"
        class="position-absolute top-0 right-0 ma-4"
      />
      <div
        class="position-absolute d-flex justify-space-between"
        style="width: 100vw; padding: 0 10vw; height: 0; overflow: visible"
      >
        <div>
          <v-btn
            icon="fa-angle-left"
            @click="openedImage--"
            v-show="openedImage > 0"
          />
        </div>
        <div>
          <v-btn
            icon="fa-angle-right"
            @click="openedImage++"
            v-show="openedImage < images.length - 1"
          />
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<style scoped></style>
