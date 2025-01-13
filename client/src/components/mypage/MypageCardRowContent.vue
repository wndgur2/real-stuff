<script setup>
  import { ref } from 'vue'

  defineProps({
    type: String,
    editable: {
      type: Boolean,
      default: false,
    },
  })
  const emit = defineEmits(['edit', 'save', 'cancel'])
  const editting = ref(false)

  const handleEdit = () => {
    editting.value = true
    emit('edit')
  }

  const handleSave = () => {
    editting.value = false
    emit('save')
  }

  const handleCancel = () => {
    emit('cancel')
    editting.value = false
  }
</script>

<template>
  <div class="d-flex py-6 px-8 ga-4 align-center w-100">
    <h3>{{ type }}</h3>
    <v-spacer></v-spacer>
    <slot />
    <template v-if="editable">
      <v-btn
        v-if="!editting"
        icon="fa-pen"
        color="secondary"
        size="x-small"
        variant="text"
        @click="handleEdit"
      ></v-btn>
      <div v-else>
        <v-btn
          icon="fa-check"
          color="primary"
          size="x-small"
          variant="text"
          @click="handleSave"
        ></v-btn>
        <v-btn
          icon="fa-times"
          color="error"
          size="x-small"
          variant="text"
          @click="handleCancel"
        ></v-btn></div
    ></template>
  </div>
</template>

<style scoped></style>
