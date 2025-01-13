<script setup>
  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
    iconColor: {
      type: String,
      default: '',
    },
    prefix: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: () => [],
    },
  })
</script>

<template>
  <div
    class="d-block"
    :class="{ 'w-33': icon, 'flex-grow-1': !icon }"
  >
    <v-select
      variant="outlined"
      border="sm"
      rounded="pill"
      density="compact"
      color="primary"
      :rules="rules"
      :label="label"
      :items="values"
      menu-icon="caret-down"
      :hide-details="true"
      :no-data-text="prefix ? prefix + ' 골라주세요.' : '데이터가 없습니다.'"
      @update:model-value="$emit('selected', id, $event)"
    >
      <template
        #prepend-inner
        v-if="icon"
      >
        <v-icon
          :color="iconColor"
          size="x-small"
          class="mx-1"
          >{{ icon }}</v-icon
        >
      </template>
    </v-select>
  </div>
</template>

<style scoped></style>
