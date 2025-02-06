import { rooms } from "../config"
import { errorResolved } from "../utils"

export const getRooms = async () => {
  try {
    return (await rooms()).data
  } catch (e) {
    throw errorResolved(e)
  }
}
