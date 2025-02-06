<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  useTemplateRef,
} from "vue"
import { getAllUsers, getRangeUsers } from "@/entities/fakeUsers"

onBeforeMount(async () => {
  await getAllUsers()
  const response = (await getRangeUsers(0, 208)).users
  listItems.value = response
})
const items = Array.from({ length: 10_000 }, (_, index) => ({
  id: Math.random().toString(36).slice(2),
  text: String(index),
}))
const itemHeight = 40
const durationRender = 200
const overscan = 3
const listItems = ref([])

const listHeight = shallowRef(0)
const scrollTop = shallowRef(0)
const isScrolling = shallowRef(false)
const setScrollTop = (value: number) => {
  scrollTop.value = value
}
const setIsScrolling = (value: boolean) => {
  isScrolling.value = value
}
const setListHeight = (value: number) => {
  listHeight.value = value
}

const scrollElementRef = useTemplateRef<HTMLDivElement | null>("scrollElementTemplateRef")

const handleScroll = () => {
  const scrollTop = scrollElementRef.value?.scrollTop as number
  setScrollTop(scrollTop)
}

onMounted(() => {
  if (!scrollElementRef.value) {
    return
  }
  handleScroll()
  scrollElementRef.value.addEventListener("scroll", handleScroll)
  nextTick(() => {
    if (!scrollElementRef.value) {
      return
    }
    let timeoutId: number | null = null
    const handleIsScrolling = () => {
      setIsScrolling(true)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        setIsScrolling(false)
      }, durationRender)
    }

    scrollElementRef.value?.addEventListener("scroll", handleIsScrolling)
  })
})

onMounted(() => {
  nextTick(() => {
    if (!scrollElementRef.value) {
      return
    }
    const resizeObserver = new ResizeObserver(([entry]) => {
      if (!entry) {
        return
      }
      const height =
        entry.borderBoxSize[0]?.blockSize ?? entry.target.getBoundingClientRect().height

      setListHeight(height)
    })
    resizeObserver.observe(scrollElementRef.value)
  })
})

onUnmounted(() => {
  scrollElementRef.value?.removeEventListener("scroll", handleScroll)
})

const range = computed(() => {
  const rangeStart = scrollTop.value
  const rangeEnd = scrollTop.value + (listHeight.value ?? 0)

  let startIndex = Math.floor(rangeStart / itemHeight)
  let endIndex = Math.ceil(rangeEnd / itemHeight)

  startIndex = Math.max(0, startIndex - overscan)
  endIndex = Math.min(listItems.value.length - 1, endIndex + overscan)

  return { startIndex, endIndex }
})

const offsetTopContainer = computed(() => {
  return range.value.startIndex * itemHeight
})

const itemsToRender = computed(() => {
  return listItems.value.slice(range.value.startIndex, range.value.endIndex + 1)
})

const totalListHeight = itemHeight * listItems.value.length

onMounted(() => {
  nextTick(() => {
    if (scrollElementRef.value && localStorage.getItem("scrollTo")) {
      scrollElementRef.value.scrollTo({
        top: JSON.parse(localStorage.getItem("scrollTo") as string),
        behavior: "auto",
      })
      localStorage.removeItem("scrollTo")
    }
  })
})
</script>

<template>
  <div class="h-[80vh]">
    <div>{{ range }}</div>
    <div ref="scrollElementTemplateRef" class="border overflow-auto relative h-full">
      <div :style="{ height: `${totalListHeight}px` }">
        <div :style="{ transform: `translateY(${offsetTopContainer}px)` }" class="absolute w-full">
          <div
            v-for="(item, indexKey) in itemsToRender"
            :key="`${item}-${indexKey}`"
            class="h-10 p-4 border w-full"
          >
            <div v-if="isScrolling">Loading...</div>
            <div v-else>{{ indexKey }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
