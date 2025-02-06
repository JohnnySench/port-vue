<script setup lang="ts">
import PrimeInputText from "primevue/inputtext"
import PrimeButton from "primevue/button"
import { onMounted, onUnmounted, ref, shallowRef } from "vue"

const wsInstance = shallowRef<WebSocket | null>(null)

const messages = ref([])

onMounted(() => {
  wsInstance.value = new WebSocket("ws://localhost:3001")
  wsInstance.value.onopen = function (event) {
    console.log(event)
    const message = {
      event: "connection",
      username: "Johnn",
      id: Date.now(),
      text: "зашел johnn",
    }
    wsInstance.value?.send(JSON.stringify(message))
  }
  wsInstance.value.onmessage = function (event) {
    const message = JSON.parse(event.data)
    messages.value.push(message)
  }
  wsInstance.value.onclose = function (event) {
    console.log(1)
    const message = {
      event: "message",
      username: "Johnn",
      id: Date.now(),
      text: "Johnn вышел",
    }
    wsInstance.value?.send(JSON.stringify(message))
  }
})

const disconnect = () => {
  const message = {
    event: "disconnect",
    username: "Johnn",
    id: Date.now(),
    text: "Johnn вышел",
  }
  wsInstance.value?.send(JSON.stringify(message))
}

const sendMessage = () => {
  const message = {
    event: "message",
    username: "Johnn",
    id: Date.now(),
    text: "Hello World!",
  }
  wsInstance.value?.send(JSON.stringify(message))
}
</script>

<template>
  <div class="bg-[#181818] h-full">
    <div class="container mx-auto grid grid-cols-12 h-full">
      <div class="col-span-3 bg-[#212121]">
        <div></div>
      </div>
      <div class="col-span-9 relative bg-[url('@/assets/images/chat/bg.png')]">
        <div class="px-4 py-3 rounded-s bg-white">
          <prime-input-text placeholder="Уникальное имя" />
          <prime-input-text placeholder="Название комнаты" />
        </div>
        <router-view />
        <!--        <img-->
        <!--          src="@/assets/images/chat/bg.png"-->
        <!--          alt="bg"-->
        <!--          loading="lazy"-->
        <!--          class="size-full object-cover"-->
        <!--        />-->
      </div>
    </div>
    <div v-if="messages.length">
      <template v-for="message in messages" :key="message.id">
        <div>{{ message.text }}</div>
      </template>
    </div>
    <div class="flex flex-col gap-5 max-w-[200px]">
      <prime-input-text placeholder="Message" />
      <prime-button label="Send" @click="sendMessage" />
    </div>
  </div>
</template>

<style scoped></style>
