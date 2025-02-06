import axios from "axios"

const instanceChat = axios.create({
  baseURL: "/api",
  withCredentials: true,
})

export default instanceChat
