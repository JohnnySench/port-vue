import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios"

const instanceUser = axios.create({
  baseURL: "https://dummyjson.com",
})

const onRequest = (config: InternalAxiosRequestConfig) => {
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
