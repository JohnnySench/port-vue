import {instanceFirebase} from "./instance"

export const signUp = async (email: string, password: string) => {
  return await instanceFirebase.post("/accounts:signUp", {
      email: email,
      password: password,
      returnSecureToken: true,
    },
  )
}

export const signIn = async (email: string, password: string) => {
  return await instanceFirebase.post("/accounts:signInWithPassword", {
      email: email,
      password: password,
      returnSecureToken: true,
    },
  )
}


