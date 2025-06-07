<script setup lang="ts">
import SampleComponent from "@shared/ui/sampleComponent.vue"
import UsersComponent from "@shared/ui/usersComponent.vue"
import {useFetchUsersPagination} from "@/composables/useFetchUsers"
import { shallowRef, toValue } from "vue"

const skip = shallowRef(0)
const {fetchUsers, users, isLoading} = useFetchUsersPagination()
const handleClick = async (value: number) => {
  skip.value += value
  await fetchUsers(toValue(skip.value))
}
</script>

<template>
<h1 class="text-center mb-5">Play</h1>
  <sample-component />
  <users-component />
  <div class="container border border-gray-200">
    <ul
      data-test="list-container"
      v-if="!isLoading">
      <li
        data-test="list-container-item"
        v-for="(user, userId) in users"
        :key="userId"
      >
        {{user.id}}: {{user.firstName}}: {{user.lastName}}
      </li>
    </ul>
    <div data-test="block-loading" v-else>Loading...</div>
    <button
      data-test="button-prev"
      :disabled="skip === 0"
      class="border bg-amber-500"
      @click="handleClick(-5)">PrevPage</button>
    <button
      data-test="button-next"
      class="border bg-amber-500"
      @click="handleClick(5)">NextPage</button>
  </div>
</template>

<style scoped>

</style>
