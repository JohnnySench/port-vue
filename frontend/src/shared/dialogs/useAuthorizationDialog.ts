import { useResolvedModal } from "@/shared/hooks/useGlobalModals"
import { defineAsyncComponent, type VNode } from "vue"

export const useAuthorizationDialog = async (props: any) => {
  const currentComponent = defineAsyncComponent(() => import("@/features/auth/ui/index.vue"))
  return await useResolvedModal(currentComponent as VNode[], props)
}
