<script setup>
  defineProps({
    comment: {
      type: Object,
      required: true,
    },
  })
</script>

<template>
  <v-card
    class="bg-grey-lighten-3 mb-3"
    border="none"
    variant="outlined"
    style="border-radius: 12px"
  >
    <v-container>
      <div class="d-flex align-center">
        <div class="w-100 h-100">
          <div class="d-flex justify-start align-center pb-2">
            <div class="text-secondary">{{ comment.nickname }}</div>
          </div>
          <p>{{ comment.content }}</p>
          <div class="d-flex justify-end">
            <p class="text-secondary">{{ comment.createdAt }}</p>
          </div>
        </div>
      </div>
    </v-container>
  </v-card>
</template>

<style scoped></style>
