<script setup>
  import { requestPasswordReset, verifyPasswordReset } from '@/api/user'
  import { rules } from '@/utils/form'
  import { secondsToTime } from '@/utils/time'
  import { computed, ref } from 'vue'

  const props = defineProps(['routes'])
  const emit = defineEmits(['route'])

  const id = ref('')
  const code = ref('')
  const timer = ref(180)
  const codeSent = ref(false)

  const hint = computed(() => {
    const t = secondsToTime(timer.value)
    const sec = t.sec === 0 ? '00' : t.sec
    return '인증번호를 확인해주세요. ' + `${t.min}:${sec}`
  })

  const sendCode = () => {
    requestPasswordReset({ loginId: id.value }).then((res) => {
      codeSent.value = true
      const interval = setInterval(() => {
        timer.value--
        if (timer.value === 0) {
          clearInterval(interval)
          codeSent.value = false
        }
      }, 1000)
    })
  }

  const resetPassword = () => {
    verifyPasswordReset({ loginId: id.value, code: code.value }).then((res) => {
      alert('비밀번호가 재설정되었습니다. 이메일을 확인해주세요.')
      emit('route', props.routes.LOGIN)
    })
  }
</script>

<template>
  <div class="d-flex justify-space-between align-center h-25">
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
    <h2>비밀번호 재설정</h2>
    <v-sheet width="40"></v-sheet>
  </div>
  <v-form
    @submit.prevent="resetPassword"
    class="d-flex flex-column ga-5 mb-6"
  >
    <div class="d-block">
      <!-- <div class="d-flex ga-6 align-center"> -->
      <v-text-field
        :rules="[rules.required]"
        density="comfortable"
        name="id"
        label="아이디"
        id="id"
        v-model="id"
        variant="outlined"
        rounded="pill"
        border="sm"
        color="primary"
      >
        <template #append>
          <v-btn
            class="d-block h-100"
            rounded="pill"
            variant="outlined"
            border="sm"
            color="info"
            @click="sendCode"
            ><h4>인증</h4></v-btn
          ></template
        >
      </v-text-field>
    </div>
    <div class="d-flex flex-column ga-2 mb-4">
      <v-text-field
        :rules="[rules.required]"
        density="comfortable"
        name="code"
        label="인증번호"
        id="code"
        v-model="code"
        variant="outlined"
        rounded="pill"
        border="sm"
        class="d-block w-100"
        color="primary"
      ></v-text-field>
      <span
        class="text-error pl-4"
        v-if="codeSent"
        >{{ hint }}</span
      >
    </div>
    <v-spacer class="my-4"></v-spacer>
    <v-btn
      size="large"
      rounded="pill"
      elevation="0"
      variant="outlined"
      border="sm"
      type="submit"
      ><h4>비밀번호 재설정</h4></v-btn
    >
  </v-form>
</template>

<style scoped>
  .input-field > *:nth-child(2) {
    display: none;
  }
</style>
