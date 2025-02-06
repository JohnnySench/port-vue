<script setup lang="ts">
import { userCard, getRangeUsers, type IUser } from "@/entities/fakeUsers"
import { useVirtualList, useInfiniteScroll, useDebounceFn, useEventListener } from "@vueuse/core"
import { inject, ref, shallowRef } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
const LIMIT = 40
const listUsers = ref<IUser[]>([])

const getUsers = async (isLoadMore = false, SKIP = 0) => {
  try {
    const response = await getRangeUsers(SKIP, LIMIT)
    if (isLoadMore) {
      listUsers.value.push(...response.users)
    } else {
      listUsers.value = response.users
    }
  } catch (e) {
    console.error(e)
  }
}
const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(listUsers, {
  itemHeight: 40,
  overscan: 3,
})

const { reset, isLoading } = useInfiniteScroll(
  containerProps.ref,
  async () => {
    await getUsers(true, listUsers.value.length)
  },
  {
    distance: 40,
    canLoadMore: () => {
      if (listUsers.value.length < 208) return true // for demo purposes
      return false
    },
  },
)

const isScrolling = shallowRef(false)
const timeoutId: null | number = null
const handleScroll = () => {
  isScrolling.value = true
  if (timeoutId) clearTimeout(timeoutId)
  debouncedSetScroll()
}
const debouncedSetScroll = useDebounceFn(() => {
  isScrolling.value = false
}, 200)

useEventListener(containerProps.ref, "scroll", handleScroll)
</script>

<template>
  <div class="h-full grid grid-cols-12">
    <div class="col-span-3 flex flex-col">
      <button @click="reset">{{ t("login") }}</button>
      <button @click="scrollTo(100)"></button>
      <div>{{ isScrolling }}</div>
    </div>
    <div class="h-full col-span-9">
      <div class="h-12">123213213</div>
      <div v-bind="containerProps" class="col-span-9 h-[70vh]">
        <div v-bind="wrapperProps">
          <div v-for="(item, itemIndex) in list" :key="item.index" class="h-10 overflow-hidden">
            <div v-if="isScrolling">Scrolling</div>
            <img
              class="h-full object-cover"
              v-else
              src="https://fotoblik.ru/wp-content/uploads/2023/09/grustnaia-devochka-na-kacheliakh-33.webp"
              loading="lazy"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
