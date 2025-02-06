<script setup lang="ts">
import { ref, useSlots, provide } from "vue"

const { defaultTab = 1 } = defineProps<{ defaultTab?: number }>()

const slots = useSlots()
const tabNodes = slots.default?.()
const tabs = ref(tabNodes?.map((tab) => tab.props?.title))
const selectedTab = ref(tabs.value?.[defaultTab])

provide("selectedTab", selectedTab)
</script>

<template>
  <div class="">
    <div class="flex flex-row items-center">
      <div
        v-for="(tab, tabIndex) in tabs"
        :key="tabIndex"
        @click="selectedTab = tab"
        :class="[{ 'border rounded-5px bg-grey': selectedTab === tab }]"
      >
        <span>{{ tabIndex }}{{ tab }}</span>
      </div>
    </div>
    <div class="flex flex-col">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
