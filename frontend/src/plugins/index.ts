import PrimeVue, { type PrimeVueConfiguration } from 'primevue/config'
import ThemePreset from './theme'

const config: PrimeVueConfiguration = {
  unstyled: true,
  pt: ThemePreset,
  zIndex: {
    modal: 1100,
    overlay: 1000,
    menu: 1000,
    tooltip: 1100,
  },
  ptOptions: {
    mergeProps: true,
    mergeSections: true,
  },
}

export { PrimeVue, config }
