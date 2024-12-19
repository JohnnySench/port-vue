<script setup lang="ts">
import Button from "primevue/button"
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext"
import { shallowRef } from "vue"
import {authSignUp} from "@features/auth/api"


const email = shallowRef("")
const password = shallowRef("")

</script>

<template>
  <div class="p-8 flex flex-col gap-6 justify-center items-center">
    <div class="flex flex-col gap-5">
      <FloatLabel>
        <InputText id="username" v-model="email"/>
        <label for="username">Email</label>
      </FloatLabel>
      <FloatLabel>
        <InputText id="username" v-model="password"/>
        <label for="username">Password</label>
      </FloatLabel>
    </div>

    <Button label="SignUp" @click="authSignUp(email, password)"/>
  </div>


</template>
