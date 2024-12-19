import axios, { type AxiosInstance} from "axios"

export const instanceFirebase: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL_FIREBASE,
  params: {
    key: import.meta.env.VITE_API_KEY,
  },
})
