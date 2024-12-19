import {signUp, signIn} from "@shared/api/firebase"

export const authSignUp = async (email: string, password: string) => {
  try {
    const response = await signUp(email, password)
    if (response) {
      localStorage.setItem("user", JSON.stringify(response.data))
    }
  } catch (e) {

  } finally {

  }
}

export const authSignIn = async (email: string, password: string) => {
  try {
    const response = await signIn(email, password)
    if (response) {
      localStorage.setItem("user", JSON.stringify(response.data))
    }
    return true
  } catch (e) {

  } finally {

  }
}
