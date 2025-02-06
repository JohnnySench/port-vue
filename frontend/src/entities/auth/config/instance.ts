import axios, {
  type AxiosError,
  type AxiosHeaders,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios"
import { ROUTES_PATH } from "./routes"
import { useAuthStore } from "../model"

const instanceAuth = axios.create({
  baseURL: "/api",
  withCredentials: true,
})

const urlSkipBearerToken = [ROUTES_PATH.LOGIN, ROUTES_PATH.LOGOUT, ROUTES_PATH.REFRESH]

// interceptors response
const onResponse = (response: AxiosResponse) => {
  return response
}
const onResponseError = async (error: AxiosError) => {
  const isLoggedIn = Boolean(useAuthStore().accessToken)
  if (
    isLoggedIn &&
    error.response?.status === 401 &&
    !error?.request?.responseUrl?.includes(ROUTES_PATH.LOGOUT)
  ) {
    await useAuthStore().logoutUser()
  }
  throw error
}
instanceAuth.interceptors.response.use(
  (response) => onResponse(response),
  async (error: AxiosError) => await onResponseError(error),
)

// interceptors request
const onRequest = (config: InternalAxiosRequestConfig) => {
  if (config.url && urlSkipBearerToken.includes(config.url)) {
    return config
  }
  const accessToken = useAuthStore().accessToken
  if (accessToken) {
    config.headers = {
      ...config.headers,
      authorization: `Bearer ${accessToken}`,
    } as AxiosHeaders["headers"]
  }
  return config
}
instanceAuth.interceptors.request.use((config) => onRequest(config))

export default instanceAuth
