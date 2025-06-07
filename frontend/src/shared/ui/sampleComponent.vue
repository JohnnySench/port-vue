<script setup lang="ts">
import PrimeInputText from "primevue/inputtext"
import PrimeButton from "primevue/button"
import { shallowRef } from "vue"

const inputValue = shallowRef("");
</script>

<template>
  <div class="flex flex-col w-1/3 mx-auto gap-4">
    <prime-input-text
      data-test="input-component"
      v-model="inputValue"
    />
    <prime-button
      data-test="button-component"
      :disabled="Boolean(!inputValue.trim())"
      @click="inputValue = ''"
      label="Clear text"
    />
    <p
      data-test="paragraph"
      v-if="Boolean(inputValue.trim())"
    >Текст: {{inputValue}}</p>
  </div>

</template>

<style scoped>

</style>
