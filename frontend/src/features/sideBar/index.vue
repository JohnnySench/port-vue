<script setup lang="ts">
import { computed, shallowRef } from "vue"

const toggleVisible = shallowRef(true)

const widthVisible = computed(() => {
  return toggleVisible.value ? "300px" : "100px"
})
</script>

<template>
  <div
    :style="{ width: widthVisible }"
    :class="[`transition-[width] duration-300 ease-in-out border-r overflow-hidden`]"
    @mouseenter="toggleVisible = true"
    @mouseleave="toggleVisible = false"
  >
    <div>{{ toggleVisible }}</div>
    <h1>sidebar</h1>
    <h1>sidebar</h1>
    <h1>sidebar</h1>
    <h1>sidebar</h1>
    <h1>sidebar</h1>
    <h1>sidebar</h1>
    <h1>sidebar</h1>
    <h1>sidebar</h1>
    <h1>sidebar</h1>
  </div>
</template>

<style scoped></style>
