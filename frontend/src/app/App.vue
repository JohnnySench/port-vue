<script setup lang="ts">
import { onMounted } from "vue"
import { useAuthStore } from "@/entities/auth"

const { setAccessToken } = useAuthStore()
onMounted(() => {
  const bc = new BroadcastChannel("internal_notification");
  bc.addEventListener("message", ({data}) => {
    setAccessToken(data)
  });
})
</script>

<template>
  <router-view />
</template>
