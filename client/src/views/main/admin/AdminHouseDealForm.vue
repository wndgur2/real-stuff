<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    dialog: { type: Boolean, required: true },
    houseDeal: { type: Object, required: true },
  })

  const formRef = ref(null)
  const dialog = ref(props.dialog)
  const houseDeal = ref({ ...props.houseDeal })
</script>
<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          icon="fa-pen"
          size="small"
          variant="plain"
          rounded="circle"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card
        prepend-icon="fa-house"
        class="text-info"
        title="매물 수정"
      >
        <v-form ref="formRef">
          <v-text-field
            v-for="key of Object.keys(houseDeal)"
            :key="key"
            :label="key"
            :name="key"
            v-model="houseDeal[key]"
          ></v-text-field>
        </v-form>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="취소"
            variant="plain"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="저장"
            variant="tonal"
            @click="
              (e) => {
                dialog = false
                for (el of formRef.elements) {
                  console.log(el.name)
                  console.log(el.value)
                }
              }
            "
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
