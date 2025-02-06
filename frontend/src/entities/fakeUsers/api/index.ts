import { allUsers, rangeUsers, singleUser } from "../config"
import type { IUser, IListUsers } from "../model/types"
import { errorResolved } from "../utils"

export const getAllUsers = async (): Promise<IListUsers> => {
  try {
    return (await allUsers()).data
  } catch (e) {
    throw errorResolved(e)
  }
}

export const getUserById = async (id: number): Promise<IUser | null> => {
  try {
    return (await singleUser(id)).data
  } catch (e) {
    throw errorResolved(e)
  }
}

export const getRangeUsers = async (skip: number, limit: number): Promise<IListUsers> => {
  try {
    return (await rangeUsers(skip, limit)).data
  } catch (e) {
    throw errorResolved(e)
  }
}
