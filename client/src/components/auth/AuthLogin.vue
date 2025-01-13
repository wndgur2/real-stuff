<script setup>
  import { computed, ref, watch } from 'vue'
  import AuthLoginOAuth from './AuthLoginOAuth.vue'
  import { login } from '@/api/user'
  import { useUserStore } from '@/store/user'
  import { rules, validations } from '@/utils/form'

  defineProps(['routes'])
  const emit = defineEmits(['route', 'loggedIn'])

  const userStore = useUserStore()

  const id = ref('')
  const pw = ref('')
  const error = ref('')
  const isValid = computed(() => {
    return (
      validations.required(id.value) &&
      validations.minLength(id.value) &&
      validations.maxLength(id.value) &&
      validations.required(pw.value) &&
      validations.minLength(pw.value) &&
      validations.maxLength(pw.value)
    )
  })

  watch([id, pw], () => {
    error.value = ''
  })

  const handleLogin = () => {
    if (!isValid.value) {
      error.value = '입력값을 확인해주세요.'
      return
    }
    login({
      loginId: id.value,
      password: pw.value,
    })
      .then((res) => {
        // print cookies
        console.log(res.headers['set-cookie'])
        console.log('login res: ', res)
        console.log('cookies: ' + document.cookie)
        userStore.login(res.data.accessToken)
        emit('loggedIn')
      })
      .catch((err) => {
        error.value = err.response.data.message
      })
  }
</script>

<template>
  <v-form
    class="h-100 d-flex flex-column ga-4 px-8 justify-center"
    fast-fail
    @submit.prevent="handleLogin"
  >
    <div class="d-flex justify-center align-center pt-6 pb-9">
      <h1>로그인</h1>
    </div>
    <div class="d-block">
      <v-text-field
        :rules="[rules.required, rules.minLength, rules.maxLength]"
        hint="이메일 형식이 아니어도 돼요."
        density="comfortable"
        name="id"
        label="아이디"
        id="id"
        v-model="id"
        variant="outlined"
        rounded="pill"
        border="sm"
        class="d-block mb-3"
        color="primary"
      ></v-text-field>
      <v-text-field
        :rules="[rules.required, rules.minLength, rules.maxLength]"
        hint="특수문자는 없어도 돼요."
        density="comfortable"
        name="pw"
        label="비밀번호"
        id="pw"
        v-model="pw"
        variant="outlined"
        rounded="pill"
        border="sm"
        class="d-block"
        color="primary"
        type="password"
      ></v-text-field>
    </div>
    <div class="d-block">
      <v-alert
        v-if="error"
        type="error"
        elevation="0"
        rounded="xl"
        :text="error"
        density="comfortable"
      />
    </div>

    <v-btn
      size="large"
      rounded="pill"
      variant="outlined"
      border="sm"
      type="submit"
      ><h4>로그인</h4>
    </v-btn>
    <div class="d-flex justify-space-around align-center px-12 my-4 text-secondary">
      <v-btn
        variant="text"
        rounded="pill"
        @click="$emit('route', routes.REGISTER)"
        >회원가입</v-btn
      >
      <span>/</span>
      <v-btn
        variant="text"
        rounded="pill"
        @click="$emit('route', routes.FIND_PASSWORD)"
        >비밀번호 재설정</v-btn
      >
    </div>
    <!-- <div class="d-flex mt-6 justify-center">
      <div class="d-flex flex-column ga-4">
        <AuthLoginOAuth
          icon="/src/assets/images/oauth/google.svg"
          name="Google"
        />
        <AuthLoginOAuth
          icon="/src/assets/images/oauth/kakao.svg"
          name="Kakao"
          bg-color="#FEE500"
        />
      </div>
    </div> -->
  </v-form>
</template>

<style scoped></style>
