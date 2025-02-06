import instanceUser from "./instance"
import { ROUTES_PATH } from "./routes"

export const singleUser = (id: number) => {
  return instanceUser.get(ROUTES_PATH.USERS, { params: id })
}

export const allUsers = () => {
  return instanceUser.get(ROUTES_PATH.USERS)
}

export const rangeUsers = (skip: number, limit: number) => {
  return instanceUser.get(ROUTES_PATH.USERS, { params: { skip, limit } })
}
