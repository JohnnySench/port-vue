<script setup lang="ts">
import { shallowRef } from "vue"
import PrimeInputText from "primevue/inputtext"
import PrimeButton from "primevue/button"

const initWorker = (url: string) => {
  return <T>(data: T): Promise<T> => {
    const worker = new Worker(new URL(url, import.meta.url), {type: "module"})
    return new Promise((resolve, reject) => {
      worker.onmessage = (e) => {
        worker.terminate()
        resolve(e.data)
      }
      worker.onerror = (e) => {
        worker.terminate()
        reject(e)
      }
      worker.postMessage(data)
    })
  }
}
const run = initWorker("../lib/workerPromise.ts")


const msg = shallowRef<string>()
const sendMessage = async () => {
  if (msg.value) {
    const res = await run(msg.value)
    console.log(res)
  }

}
</script>

<template>
  <prime-input-text v-model="msg"/>
  <prime-button label="Send" @click="sendMessage"/>
</template>

<style scoped>

</style>
