<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  id: Number,
  title: String,
  text: String,
  image: String,
  category: String,
})

const router = useRouter()

function abrir() {
  router.push(`/article/${props.category}/${props.id}`)
}
</script>

<template>
  <div
    @click="abrir"
    class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
  >
    <img v-if="image" :src="image" class="w-full h-48 object-cover" />

    <div class="p-4">
      <h2 class="font-bold text-lg mb-2">{{ title }}</h2>
      <p class="text-sm text-gray-600">{{ text }}</p>
    </div>
  </div>
</template>
