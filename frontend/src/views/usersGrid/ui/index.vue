<script setup lang="ts">
import { getUsers, getUser } from "@/entities/users"
import { onMounted } from "vue"
import PrimeButton from "primevue/button"

onMounted(async () => {
  const res = await getUsers()
  console.log(res)
})

const params = {
  id: 1,
}
const getUserOne = async () => {
  const res = await getUser(1)
  console.log(res)
}
</script>

<template>
  <div>GRID</div>
  <prime-button @click="getUserOne">Получить юзера</prime-button>
</template>

<style scoped></style>
