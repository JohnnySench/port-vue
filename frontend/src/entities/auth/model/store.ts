import { defineStore } from "pinia"
import { computed, shallowRef } from "vue"
import { authLogin, authLogout, authProfile, authRefresh } from "../api"
import type { TLoginRequest } from "./types"
import { isTokenExpired } from "../utils"
import { ROLES_RIGHTS_ROUTES } from "@shared/config"

export const useAuthStore = defineStore("auth", () => {
  const accessToken = shallowRef<string | null>()
  const role = shallowRef<1 | 2 | 3>(1)
  const roleRights = computed(() => {
    return ROLES_RIGHTS_ROUTES[role.value]
  })

  const setAccessToken = (token: string) => accessToken.value = token
  const isAuthorized = computed(() => Boolean(accessToken.value))

  const loginUser = async (data: TLoginRequest) => {
    try {
      const res = await authLogin(data)
      accessToken.value = res.accessToken
    } catch (e) {
      throw e
    }
  }

  const logoutUser = async () => {
    try {
      await authLogout()
      accessToken.value = null
    } catch (e) {
      throw e
    }
  }

  const profileUser = async () => {
    try {
      if (!accessToken.value || isTokenExpired(accessToken.value)) {
        await refreshUser()
      }
      const res = await authProfile()
      role.value = res.answer.role
    } catch (e) {
      throw e
    }
  }

  const refreshUser = async () => {
    try {
      const res = await authRefresh()
      accessToken.value = res.accessToken
    } catch (e) {
      throw e
    }
  }

  return {
    setAccessToken,
    isAuthorized,
    accessToken,
    loginUser,
    logoutUser,
    profileUser,
    refreshUser,
    roleRights,
  }
})
