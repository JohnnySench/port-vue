import { users, user } from "../config"
import { errorResolved } from "../utils"

export const getUsers = async () => {
  try {
    return (await users()).data
  } catch (e) {
    throw errorResolved(e)
  }
}

export const getUser = async (params: unknown) => {
  try {
    return (await user(params)).data
  } catch (e) {
    throw errorResolved(e)
  }
}
