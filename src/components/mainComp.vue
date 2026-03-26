<script setup>
import { useRouter } from 'vue-router'
import topicComp from '@/components/topicComp.vue'
import { formatCategory } from '@/utils/category.js'

const props = defineProps({
  id: Number,
  title: String,
  text: String,
  image: String,
  category: String,
  topics: String,
})
const topicList = props.topics ? props.topics.split(';').map((t) => t.trim()) : []
const router = useRouter()

function abrir() {
  router.push(`/${props.category}/article/${props.id}`)
}
</script>
<template>
  <div @click="abrir" class="overflow-hidden transition cursor-pointer">
    <p class="font-sans font-semibold text-xs">{{ formatCategory(category) }}</p>
    <h2 class="font-serif text-4xl font-bold">{{ title }}</h2>
    <p class="text-sm font-sans text-gray-600">{{ text }}</p>
    <div class="flex justify-between">
      <div class="grid sm:grid-cols-2 h-fit">
        <topicComp v-for="(t, i) in topicList" :key="i" :topic="t" />
      </div>
      <img v-if="image" :src="image" class="w-48 rounded-xs h-48 object-cover hidden sm:inline" />
    </div>
  </div>
</template>
