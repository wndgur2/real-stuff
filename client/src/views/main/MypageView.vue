<script setup>
  import BtnDefault from '@/components/common/BtnDefault.vue'
  import MypageCard from '@/components/mypage/MypageCard.vue'
  import MypageCardRow from '@/components/mypage/MypageCardRow.vue'
  import MypageCardRowContent from '@/components/mypage/MypageCardRowContent.vue'
  import MypageProfile from '@/components/mypage/MypageProfile.vue'
  import MypageArticleItem from '@/components/mypage/MypageArticleItem.vue'
  import { useUserStore } from '@/store/user'
  import { ROLES } from '@/utils/user'
  import MypageDeals from '@/components/mypage/MypageDeals.vue'
  import { ref, onMounted } from 'vue'
  import {
    updateCurrentMemberInfo,
    updateMemberNickname,
    updatePassword,
    updateLoginId,
  } from '@/api/user'
  import { getMyArticles } from '@/api/houseComment'
  const { user } = useUserStore()
  const memberRole = user.memberRole === ROLES.agent ? '중개인' : '사용자'
  const articles = ref(null)

  const updatingName = ref(false)
  const updatingNickname = ref(false)
  const updatingEmail = ref(false)
  const updatingId = ref(false)
  const updatingPassword = ref(false)

  const newName = ref(user.name)
  const newNickname = ref(user.nickname)
  const newEmail = ref(user.email)
  const newId = ref(user.loginId)
  const currentPassword = ref('')
  const newPassword = ref('')

  const saveName = () => {
    updatingName.value = false
    if (confirm('이름을 ' + newName.value + ' 로 변경합니까?')) {
      user.name = newName.value
      updateCurrentMemberInfo({
        nickname: user.nickname,
        name: newName.value,
        email: user.email,
      })
        .then(() => {
          alert('이름 변경 성공')
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  }
  const saveNickname = () => {
    updatingNickname.value = false
    if (confirm('닉네임을 ' + newNickname.value + ' 로 변경합니까?')) {
      user.nickname = newNickname.value
      updateMemberNickname({ nickname: newNickname.value })
        .then(() => {
          alert('닉네임 변경 성공')
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  }
  const saveEmail = () => {
    updatingEmail.value = false
    if (confirm('이메일을 ' + newEmail.value + ' 로 변경합니까?')) {
      user.email = newEmail.value
      updateCurrentMemberInfo({
        nickname: user.nickname,
        name: user.name,
        email: newEmail.value,
      })
        .then((res) => {
          alert('이메일 변경 성공')
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  }
  const saveId = () => {
    updatingId.value = false
    if (confirm('아이디를 ' + newId.value + ' 로 변경합니까?')) {
      user.loginId = newId.value
      updateLoginId({
        loginId: newId.value,
      })
        .then((res) => {
          console.log(res)
          alert('아이디 변경 성공')
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  }
  const savePassword = () => {
    updatingPassword.value = false
    if (confirm('비밀번호를 변경합니까?')) {
      updatePassword({
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
      })
        .then(() => {
          alert('비밀번호 변경 성공')
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  }

  onMounted(() => {
    getMyArticles()
      .then((res) => {
        articles.value = res.data.articles
        console.log(articles.value)
      })
      .catch((err) => {
        console.error(err)
      })
  })
</script>

<template>
  <div class="d-flex flex-row flex-wrap ga-16 py-12 px-16 w-100">
    <div
      class="d-flex flex-column flex-grow-1 ga-8 w-25"
      style="min-width: 25em"
    >
      <MypageProfile
        :name="user.name"
        :role="memberRole"
        :img="user.imageUrl"
      />
      <MypageCard title="내 정보">
        <MypageCardRow>
          <MypageCardRowContent
            type="이름"
            :editable="true"
            @edit="updatingName = true"
            @save="saveName"
            @cancel="updatingName = false"
          >
            <v-text-field
              label="이름"
              variant="outlined"
              density="compact"
              rounded="pill"
              v-model="newName"
              v-if="updatingName"
              hide-details
            ></v-text-field>
            <h3 v-else>{{ user.name }}</h3>
          </MypageCardRowContent>
        </MypageCardRow>
        <v-divider />
        <MypageCardRow>
          <MypageCardRowContent
            type="닉네임"
            :editable="true"
            @edit="updatingNickname = true"
            @save="saveNickname"
            @cancel="updatingNickname = false"
          >
            <v-text-field
              label="닉네임"
              variant="outlined"
              density="compact"
              rounded="pill"
              v-model="newNickname"
              v-if="updatingNickname"
              hide-details
            ></v-text-field>
            <h3 v-else>{{ user.nickname }}</h3>
          </MypageCardRowContent>
        </MypageCardRow>
        <v-divider />
        <MypageCardRow>
          <MypageCardRowContent
            type="이메일"
            :editable="true"
            @edit="updatingEmail = true"
            @save="saveEmail"
            @cancel="updatingEmail = false"
          >
            <v-text-field
              type="email"
              label="email"
              variant="outlined"
              density="compact"
              rounded="pill"
              v-model="newEmail"
              v-if="updatingEmail"
              hide-details
            ></v-text-field>
            <h3 v-else>{{ user.email }}</h3>
          </MypageCardRowContent>
        </MypageCardRow>
        <v-divider />
        <MypageCardRow>
          <MypageCardRowContent
            type="아이디"
            :editable="true"
            @edit="updatingId = true"
            @save="saveId"
            @cancel="updatingId = false"
          >
            <v-text-field
              type="id"
              label="id"
              variant="outlined"
              density="compact"
              rounded="pill"
              v-model="newId"
              v-if="updatingId"
              hide-details
            ></v-text-field>
            <h3 v-else>{{ user.loginId }}</h3>
          </MypageCardRowContent>
        </MypageCardRow>
        <v-divider />
        <MypageCardRow class="pa-6">
          <div class="d-flex justify-end align-center w-100 ga-4">
            <template v-if="updatingPassword">
              <v-text-field
                type="password"
                label="현재 비밀번호"
                variant="outlined"
                density="compact"
                rounded="pill"
                v-model="currentPassword"
                hide-details
              ></v-text-field>
              <v-text-field
                type="password"
                label="새로운 비밀번호"
                variant="outlined"
                density="compact"
                rounded="pill"
                v-model="newPassword"
                hide-details
              ></v-text-field
            ></template>
            <BtnDefault
              v-if="!updatingPassword"
              @click="updatingPassword = true"
              ><span>비밀번호 변경</span></BtnDefault
            >

            <div v-else>
              <v-btn
                icon="fa-check"
                color="primary"
                size="x-small"
                variant="text"
                @click="savePassword"
              ></v-btn>
              <v-btn
                icon="fa-times"
                color="error"
                size="x-small"
                variant="text"
                @click="updatingPassword = false"
              ></v-btn>
            </div>

            <!-- <BtnDefault addonClass="text-danger border-danger"
              ><span>회원 탈퇴</span></BtnDefault
            > -->
          </div>
        </MypageCardRow>
      </MypageCard>
    </div>
    <div
      class="d-flex flex-column flex-grow-1 ga-8 w-25"
      style="min-width: 35em"
    >
      <template v-if="user.memberRole === ROLES.agent">
        <MypageDeals />
      </template>
      <template v-else-if="user.memberRole === ROLES.user">
        <MypageCard
          title="내 게시글"
          v-if="articles"
        >
          <template
            v-for="article in articles"
            :key="article.articleId"
          >
            <MypageCardRow>
              <MypageArticleItem :article="article" />
            </MypageCardRow>
          </template> </MypageCard
      ></template>
    </div>
  </div>
</template>

<style scoped></style>
