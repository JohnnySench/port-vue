import { ROUTES_PATH } from "./routes"
import instanceAuth from "./instance"
import type { TLoginRequest, TLoginResponse } from "../model"
import type { AxiosResponse } from "axios"

export const login = (data: TLoginRequest): Promise<AxiosResponse<TLoginResponse>> => {
  return instanceAuth.post(ROUTES_PATH.LOGIN, data)
}

export const logout = () => {
  return instanceAuth.get(ROUTES_PATH.LOGOUT)
}

export const profile = () => {
  return instanceAuth.get(ROUTES_PATH.PROFILE)
}

export const refresh = () => {
  return instanceAuth.get(ROUTES_PATH.REFRESH)
}
