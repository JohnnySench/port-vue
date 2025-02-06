<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"

onMounted(() => {
  console.log("general layout mounted")
})

onUnmounted(() => {
  console.log("general layout unmounted")
})
</script>

<template>
  <div class="h-screen overflow-hidden">
    <slot name="display" />
  </div>
</template>

<style scoped></style>
