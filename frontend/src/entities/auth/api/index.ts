import { login, profile, refresh, logout } from "../config"
import type { TLoginRequest } from "../model"
import { errorResolved } from "../utils"

export const authLogin = async (data: TLoginRequest) => {
  try {
    return (await login(data)).data
  } catch (e) {
    throw errorResolved(e)
  }
}

export const authLogout = async () => {
  try {
    return (await logout()).data
  } catch (e) {
    throw errorResolved(e)
  }
}

export const authProfile = async () => {
  try {
    return (await profile()).data
  } catch (e) {
    throw errorResolved(e)
  }
}

export const authRefresh = async () => {
  try {
    return (await refresh()).data
  } catch (e) {
    throw errorResolved(e)
  }
}
