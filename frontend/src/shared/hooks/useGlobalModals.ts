import { createApp, h } from "vue"
import { PrimeVue, config } from "@/plugins"
import router from "@/app/router"

export const useResolvedModal = (component: any, props: any): Promise<any> => {
  return new Promise((resolve) => {
    const dialogContainer = document.createElement("div")
    document.body.appendChild(dialogContainer)

    const app = createApp({
      setup() {
        const onDestroy = (result: any) => {
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
