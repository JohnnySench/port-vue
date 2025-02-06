<script setup lang="ts">
import PrimeInputText from "primevue/inputtext"
import PrimePassword from "primevue/password"
import PrimeButton from "primevue/button"
import { shallowRef } from "vue"
import axios from "axios"

const login = shallowRef<string | null>(null)
const password = shallowRef<string | null>(null)

const auth = () => {
  const payload = {
    login: login.value,
    password: password.value,
  }
  axios.post("http://localhost:3001/login", payload, {
    withCredentials: true,
  })
}
</script>

<template>
  <div class="flex flex-col gap-4 justify-center items-center">
    <PrimeInputText v-model="login" />
    <PrimePassword v-model="password" />
    <PrimeButton @click="auth"> Войти </PrimeButton>
  </div>
</template>

<style scoped></style>
