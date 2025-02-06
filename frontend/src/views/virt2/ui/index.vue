<script setup lang="ts">
import { ref, useTemplateRef } from "vue"
import { useExample } from "@/composables/example"

const items = Array.from({ length: 10_000 }, (_, index) => ({
  id: Math.random().toString(36).slice(2),
  text: String(index),
}))

const listItems = ref(items)
const containerRef = useTemplateRef<HTMLDivElement | null>("containerTemplateRef")

// const countLoad = shallowRef(0)
// const loadMore = computed(() => range.value.endIndex === listItems.value.length)
// watch(loadMore, (value) => {
//   if (value) {
//     countLoad.value++
//     const items = Array.from({ length: 10_000 }, (_, index) => ({
//       id: Math.random().toString(36).slice(2),
//       text: String(index) + `array ${countLoad.value}`,
//     }))
//     listItems.value.push(...items)
//     if (listItems.value.length > 20000) {
//       listItems.value.splice(0, items.length)
//       containerRef.value?.scrollTo({
//         behavior: "auto",
//         top: itemHeight * items.length,
//       })
//     }
//   }
// })

const { isScrolling, wrapperListProps, containerProps, listToRender } = useExample({
  templateRef: containerRef,
  listItemHeight: 40,
  overscan: 3,
  list: listItems,
})
</script>

<template>
  <h1>VIRT2</h1>
  <div>{{ isScrolling }}</div>
  <div class="h-[80vh]">
    <div ref="containerTemplateRef" v-bind="containerProps" class="w-1/2">
      <div v-bind="wrapperListProps">
        <template v-for="(item, itemIndex) in listToRender" :key="itemIndex">
          <div class="h-10 border">{{ item }} - {{ itemIndex }}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
