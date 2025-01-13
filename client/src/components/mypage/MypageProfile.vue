<script setup>
  import { updateProfileImage } from '@/api/user'
  import { ref } from 'vue'
  import { useUserStore } from '@/store/user'
  const { user } = useUserStore()

  const props = defineProps({
    name: { type: String, required: true },
    role: { type: String, required: true },
    img: String,
  })
  const isHover = ref(false)
  const formRef = ref(null) // Reference to the form element
  const profileImage = ref(props.img || '/src/assets/images/profile.png') // Initialize with the provided image or default
  const fileInputRef = ref(null) // Reference to the hidden file input

  // Methods
  function triggerFileInput() {
    fileInputRef.value.click() // Trigger file input when image is clicked
  }

  function handleFileChange(event) {
    const file = event.target.files[0]
    if (file) {
      // Preview the uploaded image
      const reader = new FileReader()
      reader.onload = () => {
        profileImage.value = reader.result // Set the image preview
      }
      reader.readAsDataURL(file)
      handleSubmit()

      // You can handle file upload here if needed
      console.log('File selected:', file)
    }
  }

  function handleSubmit() {
    // Submit the form
    updateProfileImage({ file: fileInputRef.value.files[0] })
      .then((res) => {
        console.log('Profile image updated:', res)
      })
      .catch((err) => {
        console.error('Failed to update profile image:', err)
      })
  }
</script>

<template>
  <div class="d-flex ga-8">
    <div
      class="d-flex justify-center align-center"
      @mouseover="isHover = true"
      @mouseleave="isHover = false"
    >
      <div
        class="position-absolute z-index-2000 bg-color-info"
        v-if="isHover"
      >
        <h1 class="text-info">편집</h1>
      </div>
      <img
        :class="{ 'on-hover': isHover }"
        :src="profileImage"
        width="160"
        height="160"
        alt="profile"
        @click="triggerFileInput"
        style="cursor: pointer; object-fit: cover"
        class="rounded-circle"
      />
    </div>
    <form
      ref="formRef"
      @submit.prevent="handleSubmit"
      style="display: none"
    >
      <input
        type="file"
        accept="image/*"
        ref="fileInputRef"
        @change="handleFileChange"
      />
    </form>
    <div class="d-flex flex-column w-100 h-100 ga-4 justify-center align-start">
      <v-chip color="primary">{{ role }}</v-chip>
      <div class="d-flex justify-start align-center">
        <p class="text-center">
          <b>{{ name }}</b> 님, 안녕하세요.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  p {
    font-size: 1.2em;
  }
  b {
    font-size: 1.4em;
  }
  .on-hover {
    opacity: 0.2;
    transition: opacity 0.2s;
  }
</style>
