<script setup lang="ts">
import PrimeButton from "primevue/button"
import PrimeFloatLabel from "primevue/floatlabel"
import PrimeInputText from "primevue/inputtext"
import PrimePassword from "primevue/password"

import { useAuthStore } from "@/entities/auth"

import { useForm } from "vee-validate"
import * as yup from "yup"
import { computed } from "vue"
import { storeToRefs } from "pinia"

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    username: yup.string().required(),
    password: yup.string().min(5).required(),
  }),
})

const onSubmit = handleSubmit(async (values) => {
  await handleClickLogin()
})

const [username, usernameAttrs] = defineField("username")
const [password, passwordAttrs] = defineField("password")

const isValid = computed(() => {
  return Object.keys(errors.value)?.length === 0
})

const { loginUser } = useAuthStore()
const {accessToken} = storeToRefs(useAuthStore())
const handleClickLogin = async () => {
  const data = {
    login: username.value,
    password: password.value,
  }
  try {
    await loginUser(data)
    const bc = new BroadcastChannel("internal_notification");
    console.log(accessToken.value, " sign")
    bc.postMessage(accessToken.value);
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="p-8 flex flex-col gap-6 justify-center items-center">
    <div class="flex flex-col gap-y-8">
      <prime-float-label>
        <prime-input-text id="username" v-model="username" :invalid="Boolean(errors.username)" />
        <label for="username">Login</label>
      </prime-float-label>
      <prime-float-label>
        <prime-password id="password" v-model="password" :invalid="Boolean(errors.password)" />
        <label for="password">Password</label>
      </prime-float-label>
    </div>

    <prime-button label="Войти" :disabled="!isValid" @click="onSubmit" />
  </div>
</template>
