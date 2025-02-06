import { createApp, h, type VNode } from "vue"
import { PrimeVue, config } from "@/plugins"
import router from "@/app/router"

export const useResolvedModal = <T, R>(component: VNode[], props: T): Promise<R> => {
  return new Promise((resolve) => {
    const dialogContainer = document.createElement("div")
    document.body.appendChild(dialogContainer)

    const app = createApp({
      setup() {
        const onDestroy = (result: R) => {
          app.unmount()
          document.body.removeChild(dialogContainer)
          resolve(result)
        }

        return {
          onDestroy,
        }
      },
      render() {
        return h(component, {
          ...props,
          onDestroy: this.onDestroy,
        })
      },
    })
    app.use(PrimeVue, config)
    app.use(router)
    app.mount(dialogContainer)
  })
}
