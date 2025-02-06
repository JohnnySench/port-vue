import { createI18n } from "vue-i18n"
import { ru, en, defaultLocale } from "./languages"
import type { InjectionKey, Plugin } from "vue"

// const { t } = useI18n()
export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: "en",
  messages: {
    en,
    ru,
  },
})

// export const keyI18n = Symbol() as InjectionKey<typeof t>
//
// export const TranslatePlugin: Plugin = {
//   install: (app) => {
//     app.provide(keyI18n, t)
//   },
// }
