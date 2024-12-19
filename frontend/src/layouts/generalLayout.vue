<script setup lang="ts">
import { sideBar } from '@features/sideBar'
import baseLayout from './baseLayout.vue'
</script>

<template>
  <base-layout>
    <template #content>
      <div class="container">
        <div class="flex flex-row">
          <side-bar />
          <router-view />
        </div>
      </div>
    </template>
  </base-layout>
</template>

<style scoped></style>
