<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

const props = defineProps({
  articleId: Number,
})

const aberto = ref(false)
const total = ref(0)

async function carregarTotal() {
  const { count } = await supabase
    .from('Comment')
    .select('*', { count: 'exact', head: true })
    .eq('article_id', props.articleId)

  total.value = count || 0
}

onMounted(carregarTotal)

function toggle() {
  aberto.value = !aberto.value
}
</script>

<template>
  <button @click="toggle" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
    💬 {{ total }} Comentário<span v-if="total !== 1">s</span>
  </button>
</template>
