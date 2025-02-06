<script setup lang="ts">
import PrimeDialog from "primevue/dialog"
import signIn from "./signIn.vue"
import signUp from "./signUp.vue"
import { computed } from "vue"

const props = defineProps<{ visible: boolean; tab: "in" | "up" }>()

const currentComponent = computed(() => {
  return props.tab === "up" ? signUp : signIn
})

interface IEmits {
  (e: "update:auth-tab", tab: "in" | "up"): void
  (e: "update:visible", value: boolean): void
}
const emits = defineEmits<IEmits>()
const changeAuth = () => {
  if (props.tab === "up") {
    emits("update:auth-tab", "in")
  } else {
    emits("update:auth-tab", "up")
  }
}

const handleUpdateVisible = (value: boolean) => {
  emits("update:visible", value)
}
</script>

<template>
  <prime-dialog :visible="visible" modal @update:visible="handleUpdateVisible">
    <keep-alive>
      <component :is="currentComponent" />
    </keep-alive>
    <p class="text-blue-600 cursor-pointer" @click="changeAuth">
      {{ tab === "up" ? "Уже есть аккаунт?" : "Нет аккаунта?" }}
    </p>
  </prime-dialog>
</template>

<style scoped></style>
