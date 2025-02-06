import type { InjectionKey, Plugin } from "vue"
import { AccessScopesEnum } from "@shared/config/accessScopes"
import { logger } from "@shared/utils"

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $scopes: typeof AccessScopesEnum
    $checkHasScope: typeof logger
  }
}
export const keyLogger = Symbol() as InjectionKey<typeof logger>
export const keyScopes = Symbol() as InjectionKey<typeof AccessScopesEnum>
export const RolesPlugin: Plugin = {
  install: (app) => {
    app.config.globalProperties.$scopes = AccessScopesEnum
    app.config.globalProperties.$checkHasScope = logger
    app.provide(keyLogger, logger)
    app.provide(keyScopes, AccessScopesEnum)
  },
}
