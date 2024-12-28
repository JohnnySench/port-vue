import { useResolvedModal } from "@/shared/hooks/useGlobalModals"
import { defineAsyncComponent } from "vue"

export const useAuthorizationDialog = async (props: any) => {
  const currentComponent = defineAsyncComponent(() => import("@/features/auth/ui/index.vue"))
  return await useResolvedModal(currentComponent, props)
}
