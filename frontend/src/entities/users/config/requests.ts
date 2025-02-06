import instanceUser from "./instance"
import { ROUTES_PATH } from "./routes"

export const users = () => {
  return instanceUser.get(ROUTES_PATH.USERS)
}

export const user = (params: unknown) => {
  return instanceUser.get(`${ROUTES_PATH.USER}/${params}`)
}
