<script setup lang="ts">
console.log(1)
console.log(2)
console.log(2)
import { ref, toRef, markRaw } from "vue"
const props = defineProps({ value: Boolean })
const defaultValue = toRef(() => props.value)
const refChild = ref(defaultValue)
const refChild2 = ref(props.value)

const modelValue = defineModel()
</script>

<template>
  <div>{{ refChild }} - refReactive</div>
  <div>{{ refChild2 }} - ref2</div>
  <button @click="refChild = !refChild">CHANGE CHGILD REF</button>
  <div>{{ modelValue }} - modelValue</div>
  <input v-model="modelValue" />
</template>

<style scoped></style>
