import { getCurrentMemberInfo, reissueToken } from '@/api/user'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { removeAuthToken, setAuthToken } from '@/utils/request'
import { ROLES } from '@/utils/user'
import { useRouter } from 'vue-router'
import { getFavoriteRegions } from '@/api/region'
import { jwtDecode } from 'jwt-decode'

export const useUserStore = defineStore(
  'user',
  () => {
    const router = useRouter()
    const user = ref({})
    const favoriteRegions = ref([])
    const isLogin = ref(false)
    const timer = ref(null)
    const leftTime = ref(0)
    const expireAt = ref(0)
    const accessToken = ref('')

    watch(accessToken, (newVal) => {
      if (newVal) {
        setAuthToken(newVal)
        startTimer()
        getCurrentMemberInfo()
          .then((res) => {
            user.value = res.data
          })
          .catch((err) => {
            console.log(err)
          })

        getFavoriteRegions()
          .then((res) => {
            favoriteRegions.value = res.data.likeRegions
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        removeAuthToken()
      }
    })

    watch(
      isLogin,
      (newVal) => {
        if (!newVal) accessToken.value = ''
      },
      { immediate: true }
    )

    function startTimer() {
      stopTimer()

      const current = new Date().getTime()
      leftTime.value = Math.floor((expireAt.value - current) / 1000)
      timer.value = setInterval(() => {
        leftTime.value -= 1
        if (leftTime.value <= 0) {
          clearInterval(timer.value)
          alert('로그인 토큰이 만료되었습니다.')
          logout()
        }
      }, 1000)
    }

    function login(token) {
      accessToken.value = token
      expireAt.value = new Date(jwtDecode(token).exp).getTime() * 1000
      isLogin.value = true
    }

    function reissue() {
      reissueToken()
        .then((res) => {
          console.log(res)
          login(res.data.accessToken)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    function stopTimer() {
      if (timer.value) clearInterval(timer.value)
    }

    function logout() {
      isLogin.value = false
      stopTimer()
      removeAuthToken()
      user.value = { memberRole: ROLES.guest }
      router.go(0)
    }

    function addFavoriteRegion(region) {
      favoriteRegions.value.push(region)
    }

    return {
      user,
      isLogin,
      favoriteRegions,
      leftTime,
      expireAt,
      accessToken,
      logout,
      login,
      addFavoriteRegion,
      reissue,
    }
  },
  {
    persist: { storage: sessionStorage },
  }
)
