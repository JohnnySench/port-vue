<script setup lang="ts">
// import { BlyaButton, BlyaInput } from "my-ui-kit"
import { useAuthStore } from "@/entities/auth"
import { onMounted, inject } from "vue"
import { keyLogger, keyScopes } from "@/plugins/roles"
// import { tab, tabsWrapper } from "@shared/ui"

const logger12 = inject(keyLogger)
const scopes12 = inject(keyScopes)
onMounted(() => {
  console.log(logger12?.("HELLO123321!!!!!"))
  console.log(scopes12)
})
</script>

<template>
  <h1 class="p-2">DASHBOARD</h1>
  <div>{{ useAuthStore().accessToken }}</div>
  <!--  <tabs-wrapper>-->
  <!--    <tab title="Tab 1">-->
  <!--      <span>Hello</span>-->
  <!--    </tab>-->
  <!--    <tab title="Tab 2">-->
  <!--      <span>Hello2</span>-->
  <!--    </tab>-->
  <!--    <tab title="Tab 3">-->
  <!--      <span>Hello3</span>-->
  <!--    </tab>-->
  <!--  </tabs-wrapper>-->
<!--  <blya-button label="Hello">-->
<!--    <template #default="{ msg }">-->
<!--      <div>{{ msg }}</div>-->
<!--    </template>-->
<!--  </blya-button>-->
<!--  <blya-input />-->
</template>

<style scoped></style>
