import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value += 1
  }
  function decrement() {
    count.value = 1
  }
  function refresh() {
    count.value = 0;
  }

  return { count, doubleCount, increment, decrement, refresh }
})
