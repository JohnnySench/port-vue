<script setup lang="ts">
import { generalLayoutV2 } from "@/layouts/generalLayoutV2"
import { WHeader } from "@widgets/header"
import { onMounted, onUnmounted } from "vue"

onMounted(() => {
  console.log("layout mounted")
})

onUnmounted(() => {
  console.log("layout unmounted")
})
</script>

<template>
  <general-layout-v2>
    <template #display>
      <div class="h-full flex flex-col">
        <header>
          <w-header />
        </header>
        <main class="h-[80vh] overflow-y-auto">
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </main>
        <footer class="border h-[20vh]">
          <slot name="footer" />
        </footer>
      </div>
    </template>
  </general-layout-v2>
</template>

<style scoped></style>
