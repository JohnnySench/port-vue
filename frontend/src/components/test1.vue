<script setup lang="ts">
import { ref, toRef } from "vue"
import {SodisButton, SodisText} from "sench-ui-hard"
const props = defineProps({ value: Boolean })
const defaultValue = toRef(() => props.value)
const refChild = ref(defaultValue)
const refChild2 = ref(props.value)

const modelValue = defineModel("dasdas")
</script>

<template>
  <div>{{ refChild }} - refReactive</div>
  <div>{{ refChild2 }} - ref2</div>
  <button @click="refChild = !refChild">CHANGE CHGILD REF</button>
  <div>{{ modelValue }} - modelValue</div>
  <input v-model="modelValue" />
  <SodisButton text="Hello"/>
  <SodisText label="Hello World"/>
</template>

<style scoped></style>
