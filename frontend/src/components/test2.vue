<script setup lang="ts">
import { shallowRef } from 'vue'
import test1 from './test1.vue'

const modelValue = shallowRef(true)
const value = shallowRef('hello')
</script>

<template>
  <div>
    <button @click="modelValue = !modelValue">CHANGE VALUE</button>
    <button @click="value = 'hello world'">CHANGE MODEL VALUE</button>
    <div>{{ modelValue }} - parent</div>
    <div>{{ value }} - valueparent</div>
    <div>child</div>
    <test1 :value="modelValue" v-model="value" />
  </div>
</template>

<style scoped></style>
