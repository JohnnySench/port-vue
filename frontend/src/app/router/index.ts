import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import { useRouteGuardDashboard } from "@/views/dashboard/middleware"
import { useBeforeEachRouteGuard } from "./useBeforeEachRouteGuard"
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/baseLayoutV2/ui/index.vue"),
    redirect: "/main",
    meta: {
      auth: false,
    },
    children: [
      {
        path: "/main",
        name: "main",
        component: () => import("@/views/mainV2/ui/index.vue"),
        meta: {
          auth: false,
        },
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/ui/index.vue"),
        meta: {
          auth: true,
        },
        beforeEnter: useRouteGuardDashboard,
      },
      {
        path: "/editor",
        name: "editor",
        component: () => import("@/views/editor/ui/index.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "/users",
        name: "users",
        component: () => import("@/views/usersGrid/ui/index.vue"),
      },
      {
        path: "/chat",
        name: "chat",
        component: () => import("@/views/chat/ui/index.vue"),
        children: [
          {
            path: "/chat/:roomId",
            name: "chat-room",
            component: () => import("@/entities/messages/ui/index.vue"),
          },
        ],
      },
      {
        path: "/grid",
        name: "grid",
        component: () => import("@/views/employeeGrid/ui/index.vue"),
      },
    ],
  },
  {
    path: "/virt",
    name: "virt",
    component: () => import("@/views/virt/ui/index.vue"),
  },

  // {
  //   path: "/test",
  //   name: "test",
  //   component: () => import("@/views/test.vue"),
  //   meta: {
  //     auth: false,
  //   },
  // },
  // {
  //   path: "/",
  //   name: "home",
  //   component: () => import("@/views/main/ui/index.vue"),
  //   meta: {
  //     auth: false,
  //   },
  // },
  // {
  //   path: "/content/photo-gallery",
  //   name: "content",
  //   component: () => import("@/layouts/generalLayout.vue"),
  //   meta: {
  //     auth: true,
  //   },
  //   children: [
  //     {
  //       path: "/content/photo-gallery",
  //       name: "photo-gallery",
  //       component: () => import("@/views/photo-gallery/ui/index.vue"),
  //     },
  //     {
  //       path: "/content/photo-gallery/:photoId",
  //       name: "photo-details",
  //       component: () => import("@/views/photo-gallery/ui/details.vue"),
  //     },
  //     {
  //       path: "/content/trello",
  //       name: "trello",
  //       component: () => import("@/views/trello/ui/index.vue"),
  //     },
  //   ],
  // },
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
  // {
  //   path: "/auth",
  //   name: "auth",
  //   component: () => import("@/layouts/authLayout.vue"),
  //   beforeEnter: useAuthorizationRouteGuard,
  //   redirect: "/sign-in",
  //   children: [
  //     {
  //       path: "/sign-up",
  //       name: "sign-up",
  //       component: () => import("@/views/signUp.vue"),
  //     },
  //     {
  //       path: "/sign-in",
  //       name: "sign-in",
  //       component: () => import("@/views/signIn.vue"),
  //     },
  //   ],
  // },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => await useBeforeEachRouteGuard(to, from, next))
router.beforeEach((to, from, next) => {
  console.log("beforeEach2")
  next()
})

export default router
