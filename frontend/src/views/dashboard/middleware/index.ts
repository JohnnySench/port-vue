import { useAuthStore } from "@/entities/auth"
import type { NavigationGuard } from "vue-router"

export const useRouteGuardDashboard: NavigationGuard = (to, from, next) => {
  const rightsDashboard = useAuthStore().roleRights["dashboard"]
  if (!rightsDashboard.includes("closed")) {
    return next()
  } else {
    if (from?.name) {
      next({ name: from.name })
    } else {
      return next({ name: "main" })
    }
  }
}
