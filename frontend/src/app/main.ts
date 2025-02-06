import "@/assets/style/style.css"
import { createApp } from "vue"
import { createPinia } from "pinia"
import { PrimeVue, config } from "@/plugins"
import App from "./App.vue"
import router from "./router"
import { registerSW } from "virtual:pwa-register"
import { RolesPlugin } from "@/plugins/roles"
import { i18n } from "@/plugins/i18n"

registerSW({ immediate: true })

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, config)
app.use(RolesPlugin)
// app.use(TranslatePlugin)
app.use(i18n)

app.mount("#app")
