<script setup>
  import { createComment } from '@/api/comment'
  import { ref } from 'vue'
  const { articleId } = defineProps({ articleId: { type: Number, required: true } })
  const emit = defineEmits(['commentCreated'])
  const comment = ref('')

  const handleSubmit = () => {
    const temp = comment.value
    comment.value = ''
    createComment(articleId, { content: temp }).then(() => {
      emit('commentCreated', temp)
    })
  }
</script>

<template>
  <div class="my-2">
    <v-form @submit.prevent="handleSubmit">
      <v-textarea
        density="compact"
        menu-icon=""
        variant="outlined"
        label="댓글 남기기"
        hide-details
        row-height="5"
        rows="1"
        auto-grow
        resize="none"
        rounded
        v-model="comment"
      >
        <template #append-inner>
          <v-btn
            variant="plain"
            size="x-small"
            icon="fa-arrow-up-from-bracket"
            @click="handleSubmit"
          />
        </template>
      </v-textarea>
    </v-form>
  </div>
</template>

<style>
  .v-input:focus-within {
    border-radius: 0;
  }

  .v-list {
    border-radius: 50%;
  }
  .v-autocomplete__content {
    border-radius: 50%;
  }
  .v-overlay__content {
    border-radius: 50%;
  }
</style>
