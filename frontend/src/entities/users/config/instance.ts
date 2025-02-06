import axios, {
  type AxiosError,
  type AxiosHeaders,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios"
import { useAuthStore } from "@/entities/auth"

const instanceUser = axios.create({
  baseURL: "/api",
  withCredentials: true,
})

const onRequest = (config: InternalAxiosRequestConfig) => {
  const authorization = useAuthStore().accessToken
  config.headers = {
    ...config.headers,
    authorization: `Bearer ${authorization}`,
  } as AxiosHeaders["headers"]
  return config
}
instanceUser.interceptors.request.use((config) => onRequest(config))

const onResponse = (response: AxiosResponse) => {
  return response
}
const onResponseError = async (error: AxiosError) => {
  const config = error.config as InternalAxiosRequestConfig
  if (error.response?.status === 401) {
    try {
      await useAuthStore().refreshUser()
      return instanceUser.request(config)
    } catch (e) {
      console.error(e)
    }
  }
}
instanceUser.interceptors.response.use(
  (response) => onResponse(response),
  async (error) => await onResponseError(error),
)

export default instanceUser
