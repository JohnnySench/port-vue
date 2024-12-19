import "@/assets/style/main.pcss"
import { createApp } from "vue"
import { createPinia } from "pinia"
import { PrimeVue, config } from "@/plugins"
import App from "./App.vue"
import router from "./router"
import { registerSW } from "virtual:pwa-register"

registerSW({ immediate: true })

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, config)

app.mount("#app")
