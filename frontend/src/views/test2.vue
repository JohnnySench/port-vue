<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"

onMounted(() => {
  console.log("test2 mounted")
})

onUnmounted(() => {
  console.log("test2 unmounted")
})
</script>

<template>
  <h1>TEST2</h1>
</template>

<style scoped></style>
