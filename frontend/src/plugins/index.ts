import PrimeVue, { type PrimeVueConfiguration } from "primevue/config"
import Aura from "@primevue/themes/aura";
// import ThemePreset from "./theme"

const config: PrimeVueConfiguration = {
  unstyled: false,
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".my-app-dark"
    }
  }
}

export { PrimeVue, config }
