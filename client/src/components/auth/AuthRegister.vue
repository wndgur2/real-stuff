<script setup>
  import { createMember } from '@/api/user'
  import { computed, ref } from 'vue'
  import { rules, validations } from '@/utils/form'
  import { ROLES } from '@/utils/user'

  const props = defineProps(['routes'])
  const emit = defineEmits(['route'])

  const id = ref('')
  const pw = ref('')
  const pwCheck = ref('')
  const name = ref('')
  const nickname = ref('')
  const email = ref('')

  // role = user / broker
  const role = ref(ROLES.user)
  const code = ref('')
  const error = ref('')
  const isValid = computed(() => {
    return (
      validations.required(id.value) &&
      validations.minLength(id.value) &&
      validations.maxLength(id.value) &&
      validations.required(pw.value) &&
      validations.minLength(pw.value) &&
      validations.maxLength(pw.value) &&
      validations.required(pwCheck.value) &&
      validations.minLength(pwCheck.value) &&
      validations.maxLength(pwCheck.value) &&
      validations.passwordCheck(pw.value, pwCheck.value) &&
      validations.required(name.value) &&
      validations.nameMinLenght(name.value) &&
      validations.nameMaxLenght(name.value) &&
      validations.required(nickname.value) &&
      validations.nicknameMinLenght(nickname.value) &&
      validations.nicknameMaxLenght(nickname.value)
    )
  })

  const register = () => {
    if (!isValid.value) {
      error.value = '입력값을 확인해주세요.'
      return
    }
    createMember({
      nickname: nickname.value,
      name: name.value,
      email: email.value,
      loginId: id.value,
      password: pw.value,
      memberRole: role.value, // USER, ADMIN 등 역할에 따라 설정
    })
      .then((res) => {
        emit('route', props.routes.LOGIN)
      })
      .catch((err) => {
        console.error(err)
        error.value = err.response.data.message
      })
  }
</script>

<template>
  <div class="d-flex justify-space-between align-center py-8">
    <v-btn
      @click="$emit('route', routes.LOGIN)"
      variant="text"
      icon="fa-arrow-left"
      color="secondary"
      rounded="circle"
      size="small"
      class="m-3"
    >
    </v-btn>
    <h2>회원가입</h2>
    <v-sheet width="40"></v-sheet>
  </div>
  <v-form
    class="d-flex flex-column ga-4 mb-2"
    fast-fail
    @submit.prevent="register"
  >
    <div class="d-flex flex-column ga-5">
      <v-radio-group
        v-model="role"
        inline
        color="primary"
      >
        <v-radio
          label="일반회원"
          :value="ROLES.user"
        ></v-radio>
        <v-radio
          label="부동산 중개인"
          :value="ROLES.agent"
        ></v-radio>
      </v-radio-group>
      <div class="d-flex ga-6 align-center">
        <v-text-field
          :rules="[rules.required, rules.minLength, rules.maxLength]"
          density="comfortable"
          name="id"
          label="아이디"
          id="id"
          v-model="id"
          variant="outlined"
          rounded="pill"
          border="sm"
          class="d-block w-66"
          color="primary"
        ></v-text-field>
        <!-- <v-btn
        rounded="pill"
        variant="outlined"
        border="sm"
        color="info"
        class="h-100"
        ><h4>인증</h4></v-btn
      > -->
      </div>
      <!-- <div class="d-flex ga-6 align-center w-auto mb-4">
        <v-text-field
          density="comfortable"
          name="code"
          label="인증번호"
          id="code"
          v-model="code"
          variant="outlined"
          rounded="pill"
          border="sm"
          class="d-block w-25 "
          color="primary"
        ></v-text-field>
        <v-btn
          rounded="pill"
          variant="outlined"
          border="sm"
          color="info"
          class="h-100"
          ><h4>확인</h4></v-btn
        >
      </div> -->
      <v-text-field
        :rules="[rules.required, rules.minLength, rules.maxLength]"
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
      <v-text-field
        :rules="[rules.required, rules.minLength, rules.maxLength, rules.passwordCheck]"
        density="comfortable"
        name="pwCheck"
        label="비밀번호 확인"
        id="pwCheck"
        v-model="pwCheck"
        variant="outlined"
        rounded="pill"
        border="sm"
        class="d-block"
        color="primary"
        type="password"
      ></v-text-field>
      <div class="d-flex ga-6 align-center">
        <v-text-field
          :rules="[rules.required, rules.nameMinLenght, rules.nameMaxLenght]"
          density="comfortable"
          name="name"
          label="이름"
          id="name"
          v-model="name"
          variant="outlined"
          rounded="pill"
          border="sm"
          class="d-block w-66"
          color="primary"
        ></v-text-field>
        <v-text-field
          :rules="[rules.required, rules.nicknameMinLenght, rules.nicknameMaxLenght]"
          density="comfortable"
          name="nickname"
          label="닉네임"
          id="nickname"
          v-model="nickname"
          variant="outlined"
          rounded="pill"
          border="sm"
          class="d-block w-66"
          color="primary"
        ></v-text-field>
      </div>

      <v-text-field
        :rules="[rules.required, rules.emailCheck]"
        density="comfortable"
        name="email"
        label="이메일"
        id="email"
        v-model="email"
        variant="outlined"
        rounded="pill"
        border="sm"
        class="d-block"
        color="primary"
      ></v-text-field>
    </div>
    <v-alert
      v-if="error"
      type="error"
      elevation="0"
      rounded="xl"
      :text="error"
    />
    <v-btn
      size="large"
      rounded="pill"
      elevation="0"
      variant="outlined"
      border="sm"
      type="submit"
      ><h4>회원가입</h4></v-btn
    >
  </v-form>
</template>

<style scoped></style>
