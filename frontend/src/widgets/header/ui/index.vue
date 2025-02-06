<script setup lang="ts">
import PrimeButton from "primevue/button"
import { authDialog } from "@/features/auth/ui"
import { shallowRef } from "vue"
import { navItems } from "@shared/const"
import { buttonLine } from "@shared/ui"
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/entities/auth"
import { useRouter } from "vue-router"

const visibleAuth = shallowRef(false)
const { accessToken } = storeToRefs(useAuthStore())
const { logoutUser, refreshUser } = useAuthStore()

const handleCallAuth = async () => {
  if (accessToken.value) {
    try {
      await logoutUser()
    } catch (e) {
      console.error(e)
    }
  } else {
    visibleAuth.value = true
  }
}

const authTabActive = shallowRef<"up" | "in">("up")

const updateRefresh = async () => {
  try {
    await refreshUser()
  } catch (e) {
    console.error(e)
  }
}

const router = useRouter()
const navigateTo = async (routeName: string) => {
  await router.push({ name: routeName })
}
</script>

<template>
  <div class="w-full bg-transparent h-12">
    <div class="size-full border">
      <div class="flex flex-row justify-between items-center">
        <div class="flex flex-row items-center">
          <template
            v-for="(navItem, navItemIndex) in navItems"
            :key="`${navItemIndex}-${navItem.id}`"
          >
            <button-line>
              <span @click="navigateTo(navItem.name)">{{ navItem.label }}</span>
            </button-line>
          </template>
          <prime-button label="Update" @click="updateRefresh" />
          <prime-button label="TEST@" @click="router.push({ name: 'test2' })" />
        </div>
        <prime-button
          @click="handleCallAuth"
          :label="accessToken ? 'Выйти' : 'Войти'"
          severity="info"
        />
        <auth-dialog
          :visible="visibleAuth"
          :tab="authTabActive"
          @update:visible="(value) => (visibleAuth = value)"
          @update:auth-tab="(tab) => (authTabActive = tab)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
