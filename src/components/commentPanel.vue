<script setup>
import { ref, onMounted } from 'vue'
import commentComp from '@/components/commentComp.vue'

defineProps({
  articleId: Number,
})

const scrolled = ref(false)
const container = ref(null)

onMounted(() => {
  const el = container.value

  el.addEventListener('scroll', () => {
    scrolled.value = el.scrollTop > 0
  })
})
</script>

<template>
  <aside ref="container" class="bg-white rounded-xl h-fit max-h-[80vh] overflow-y-auto">
    <div
      class="sticky top-0 bg-white z-10 p-4 flex items-center justify-between transition-shadow"
      :class="scrolled ? 'shadow-md' : ''"
    >
      <h2 class="font-bold text-lg">Comentários</h2>

      <button class="text-xl" @click="$emit('close')">✕</button>
    </div>

    <div class="p-4">
      <commentComp :articleId="articleId" />
    </div>
  </aside>
</template>
