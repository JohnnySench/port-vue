import type { NavigationGuard } from "vue-router";

export const useAuthorizationRouteGuard: NavigationGuard = (...args) => {
  const to = args[0]
  const from = args[1]
  const next = args[2]
  localStorage.getItem("user") ? next({name: "main"}) : next(true)
};

export const useAuthorizationRouteGuard2: NavigationGuard = (...args) => {
  const to = args[0]
  const from = args[1]
  const next = args[2]
  localStorage.getItem("user") ? next(true) : next({name: "auth"})
};
