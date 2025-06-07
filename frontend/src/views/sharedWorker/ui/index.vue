<script setup lang="ts">
import PrimeButton from "primevue/button"
import { onMounted } from "vue"
const worker = new SharedWorker(new URL("../lib/sharedWorker.ts", import.meta.url), {type: "module"});
worker.port.start();
worker.port.onmessage = (e) => {
  console.log(e, "Message received from worker");
};


const sendMessage = () => {
  worker.port.postMessage("HEllo");
}

</script>

<template>
  <h1>SHARED WORKER</h1>
  <prime-button label="Send" @click="sendMessage"/>
</template>

<style scoped>

</style>
