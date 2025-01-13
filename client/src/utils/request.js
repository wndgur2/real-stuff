import axios from 'axios'
// console.log(import.meta.VITE_API_BASE_API)

axios.defaults.withCredentials = true

const service = axios.create({
  baseURL: 'http://localhost:8080/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 25000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Function to add the token to the Authorization header
export function setAuthToken(token) {
  service.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Function to remove the token from the Authorization header
export function removeAuthToken() {
  delete service.defaults.headers.common['Authorization']
}

// route on authentication error
service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(error)
    const code = error.response?.data.code
    if (code === 2001 || code === 2008)
      import('@/store/modal').then(({ useModalStore }) => useModalStore().openAuthModal())
    return Promise.reject(error)
  }
)

export default service
