<script setup lang="ts">
import { onMounted, shallowRef, useTemplateRef, ref } from "vue"
import PrimeButton from "primevue/button"
import PrimeFileUpload from "primevue/fileupload"

let worker: Worker | null = null
const createWorker = () => {
  if ("Worker" in window) {
    worker = new Worker(new URL("../lib/worker.ts", import.meta.url), {type: "module"})
    // worker = new Worker("../lib/worker.ts")
    worker.onmessage = event => {
      // обрабатываем сообщение здесь
      if (canvasRef.value) {
        const ctx = canvasRef.value.getContext("2d");
        ctx?.putImageData(event.data, 0, 0);
      }
      console.log(event.data, " message from worker")
    }
    worker.onerror = err => {
      // ctx.putImageData(processedData, 0, 0);
    }
  }
}

onMounted(() => {
  createWorker()
})

const sendMessage = () => {
  worker?.postMessage({data: "hello"})
}
const canvasRef = shallowRef<HTMLCanvasElement>()
const image = shallowRef<HTMLImageElement | null>(null)
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          image.value = new Image();
          image.value.src = e.target?.result as string;
          image.value.onload = () => {
            drawImage();
          };
        };
        reader.readAsDataURL(file);
    }
  }
}

const drawImage = () => {
  if (canvasRef.value) {
    const ctx = canvasRef.value.getContext("2d");
    if (ctx && image.value) {
      ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
      ctx.drawImage(image.value, 0, 0, canvasRef.value.width, canvasRef.value.height);
    }
  }
}

const applyFilter = () => {
  if (canvasRef.value) {
    const ctx = canvasRef.value.getContext("2d");
    if (ctx) {
      const imageData = ctx.getImageData(0, 0, canvasRef.value.width, canvasRef.value.height);
      console.time("start")
      worker?.postMessage(imageData, [imageData.data.buffer])
      console.timeEnd("start")
    }
  }
}
</script>

<template>
  <h1>worker</h1>
  <input type="file" @change="onFileChange" accept="image/*" />
  <canvas ref="canvasRef" width="500" height="500"></canvas>
  <prime-button label="Send" @click="sendMessage"/>
  <prime-button label="Filter" @click="applyFilter"/>

</template>

<style scoped>

</style>
