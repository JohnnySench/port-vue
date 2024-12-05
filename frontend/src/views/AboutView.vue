<script setup lang="ts">
import { collection, query, getDocs } from 'firebase/firestore'
import { onMounted, ref } from 'vue'
import { db } from '@/firebase/config'

import PrimeButton from 'primevue/button'

const q = query(collection(db, 'tasks'))

const ans = ref()
onMounted(async () => {
  ;(await getDocs(q)).forEach((doc) => {
    console.log(doc.data())
  })
})
</script>

<template>
  <h1>Hello ДЖОН!!!!</h1>
  <PrimeButton severity="success" label="Hello" />
</template>

<style></style>
