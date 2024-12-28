import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import {
  useAuthorizationRouteGuard,
  useAuthorizationRouteGuard2,
} from "@/hooks/useAuthorizationRouteGuard"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/main/ui/index.vue"),
    meta: {
      auth: false,
    },
  },
  {
    path: "/content/photo-gallery",
    name: "content",
    component: () => import("@/layouts/generalLayout.vue"),
    meta: {
      auth: true,
    },
    children: [
      {
        path: "/content/photo-gallery",
        name: "photo-gallery",
        component: () => import("@/views/photo-gallery/ui/index.vue"),
      },
      {
        path: "/content/photo-gallery/:photoId",
        name: "photo-details",
        component: () => import("@/views/photo-gallery/ui/details.vue"),
      },
      {
        path: "/content/trello",
        name: "trello",
        component: () => import("@/views/trello/ui/index.vue"),
      },
    ],
  },
  // {
  //   path: "/",
  //   name: "home",
  //   component: () => import("@layouts/generalLayout.vue"),
  //   beforeEnter: useAuthorizationRouteGuard2,
  //   redirect: "/main",
  //   children: [
  //     {
  //       path: "/main",
  //       name: "main",
  //       component: () => import("@/views/test.vue"),
  //     },
  //     {
  //       path: "/photo-gallery",
  //       name: "photo-gallery",
  //       component: () => import("@/views/photoGallery.vue"),
  //       beforeEnter: (to, from, next) => {
  //         console.log("dasdasda")
  //         next(true)
  //       }
  //     }
  //   ],
  // },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/layouts/authLayout.vue"),
    beforeEnter: useAuthorizationRouteGuard,
    redirect: "/sign-in",
    children: [
      {
        path: "/sign-up",
        name: "sign-up",
        component: () => import("@/views/signUp.vue"),
      },
      {
        path: "/sign-in",
        name: "sign-in",
        component: () => import("@/views/signIn.vue"),
      },
    ],
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    console.log("Тут надо быть авторизованым")
  }
  next()
})

export default router
