<script setup lang="ts">
import PrimeButton from "primevue/button"
import PrimeFloatLabel from "primevue/floatlabel"
import PrimeInputText from "primevue/inputtext"
import PrimePassword from "primevue/password"
import { shallowRef } from "vue"
import { authSignUp } from "@features/auth/api"

const email = shallowRef("")
const password = shallowRef("")
const repeatPassword = shallowRef("")
</script>

<template>
  <div class="p-8 flex flex-col gap-5 justify-center items-center">
    <div class="flex flex-col gap-6">
      <prime-float-label variant="on">
        <prime-input-text id="email" v-model="email" />
        <label for="email">Email</label>
      </prime-float-label>
      <prime-float-label variant="on">
        <prime-password id="password" v-model="password" />
        <label for="password">Password</label>
      </prime-float-label>
      <prime-float-label variant="on">
        <prime-password
          id="repeat-password"
          v-model="repeatPassword"
          :invalid="repeatPassword !== password"
        />
        <label for="repeat-password">Repeat password</label>
      </prime-float-label>
    </div>

    <prime-button
      label="Зарегистрироваться"
      :disabled="repeatPassword !== password"
      @click="authSignUp(email, password)"
    />
  </div>
</template>
