import type { NavigationGuard } from "vue-router"
import { useAuthStore } from "@/entities/auth"
export const useBeforeEachRouteGuard: NavigationGuard = async (to, from, next) => {
  console.log("beforeEach1")
  const { profileUser } = useAuthStore()
  try {
    await profileUser()
  } catch (e) {
  } finally {
    next()
  }
}
