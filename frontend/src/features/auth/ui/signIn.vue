<script setup lang="ts">
import PrimeButton from "primevue/button"
import PrimeFloatLabel from "primevue/floatlabel"
import PrimeInputText from "primevue/inputtext"
import { shallowRef } from "vue"
import { authSignIn } from "@features/auth/api"
import { useRouter } from "vue-router"

const email = shallowRef("")
const password = shallowRef("")

const router = useRouter()
const handleAuthSignIn = async () => {
  const res = await authSignIn(email.value, password.value)
  if (res) {
    await router.push({ name: "main" })
  }
}
</script>

<template>
  <div class="p-8 flex flex-col gap-6 justify-center items-center">
    <div class="flex flex-col gap-5">
      <prime-float-label>
        <prime-input-text id="username" v-model="email" />
        <label for="username">Email</label>
      </prime-float-label>
      <prime-float-label>
        <prime-input-text id="username" v-model="password" />
        <label for="username">Password</label>
      </prime-float-label>
    </div>

    <prime-button label="Войти" @click="handleAuthSignIn" />
  </div>
</template>
