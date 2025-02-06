import instanceChat from "./instance"
import { ROUTE_PATH } from "./routes"

export const rooms = () => {
  return instanceChat.get(ROUTE_PATH.ROOMS)
}
