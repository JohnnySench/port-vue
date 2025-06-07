<script setup lang="ts">
import {useTemplateRef, onMounted, shallowRef} from "vue";
import PrimeButton from "primevue/button";

const canvas1 = useTemplateRef<HTMLCanvasElement>("canvasRef1");
const context1 = shallowRef<CanvasRenderingContext2D | null>(null);

const canvas2 = useTemplateRef<HTMLCanvasElement>("canvasRef2");
const context2 = shallowRef<CanvasRenderingContext2D | null>(null);


const drawOnCanvas = () => {
  if (canvas1.value && canvas2.value) {
    context1.value = canvas1.value.getContext("2d");
    context2.value = canvas2.value.getContext("2d");
    if (context1.value && context2.value) {
      console.log(1123)
      // Рисуем на первом канвасе
      context1.value.fillStyle = "red";
      context1.value.fillRect(50, 50, 200, 200);
      context1.value.font = "30px Arial";
      context1.value.fillStyle = "black";
      context1.value.fillText("Канвас 1", 60, 100);

      // Рисуем на втором канвасе
      context2.value.fillStyle = "blue";
      context2.value.fillRect(100, 100, 200, 200);
      context2.value.font = "30px Arial";
      context2.value.fillStyle = "white";
      context2.value.fillText("Канвас 2", 110, 150);
    }

  }



}

const resultCanvas = useTemplateRef<HTMLCanvasElement | null>("resultCanvasRef")
const resultContext = shallowRef<CanvasRenderingContext2D | null>(null)
const resultImg = useTemplateRef<HTMLImageElement>("resultImgRef")
const combineCanvases = () => {
 if (resultCanvas.value) {
   resultContext.value = resultCanvas.value.getContext("2d");
   if (resultContext.value) {
     resultContext.value.drawImage(canvas1.value!, 0, 0);
     resultContext.value.drawImage(canvas2.value!, 0, 0);
     resultImg.value!.src = resultCanvas.value.toDataURL();
   }
 }
}

onMounted(() => {
  drawOnCanvas()
})
</script>

<template>
<h1>canvas</h1>
  <div>
    <div style="position: relative;">
      <canvas ref="canvasRef1" width="500" height="500" style="position: absolute; top: 0; left: 0;"></canvas>
      <canvas ref="canvasRef2" width="500" height="500" style="position: absolute; top: 0; left: 0;"></canvas>
    </div>
    <prime-button @click="combineCanvases">Склеить канвасы</prime-button>
    <canvas ref="resultCanvasRef" width="500" height="500" style="display: none;"></canvas>
    <img ref="resultImgRef" alt="Result Image" class="absolute right-0"/>
  </div>
</template>

<style scoped>

</style>
