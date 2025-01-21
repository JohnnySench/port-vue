<script setup lang="ts">
import PrimeButton from "primevue/button"
import { authDialog } from "@/features/auth/ui"
import { shallowRef } from "vue"

const visibleAuth = shallowRef(false)
const handleCallAuth = () => {
  visibleAuth.value = true
}

console.log(1)

const authTabActive = shallowRef<"up" | "in">("up")
</script>

<template>
  <prime-button @click="handleCallAuth" label="login" />
  <auth-dialog
    :visible="visibleAuth"
    :tab="authTabActive"
    @update:visible="(value) => (visibleAuth = value)"
    @update:auth-tab="(tab) => (authTabActive = tab)"
  />
</template>

<style scoped></style>
