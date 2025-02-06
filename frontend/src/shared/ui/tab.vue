<script setup lang="ts">
import { inject, onMounted } from "vue"
const props = defineProps<{ title: string }>()

const selectedTab = inject("selectedTab")

onMounted(() => {
  console.log(selectedTab)
})
</script>

<template>
  <div v-show="selectedTab === title">
    <slot />
  </div>
</template>

<style scoped></style>
