<script setup lang="ts">
import { onMounted, ref, shallowRef } from "vue"

interface User {
  id: number
  name: string
  email: string
}

const users = ref<User[]>([])
const loading = shallowRef(true)
const error = shallowRef<string | null>(null)

const fetchUsers = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users ", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    if (!res.ok) throw new Error("Ошибка загрузки данных")
    users.value = await res.json()
  } catch (err: unknown) {
    if (isMessageError(err)) {
      error.value = err.message
    }
  } finally {
    loading.value = false
  }
}
const isObject = (obj: unknown): obj is object => {
  return typeof obj === "object" && obj !== null
}
const isMessageError = (e: unknown): e is {message: string} => {
  return isObject(e) && "message" in e && typeof e["message"] === "string"
}



onMounted(async () => {
  await fetchUsers()
})
</script>

<template>
  <div>
    <h2>Список пользователей</h2>

    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error" data-test="error-message">{{ error }}</div>
    <table v-else data-test="user-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Имя</th>
        <th>Email</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
