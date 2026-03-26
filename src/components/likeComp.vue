<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

const props = defineProps({
  articleId: Number,
})

const likes = ref(0)
const liked = ref(false)
const fp = ref(null)

onMounted(async () => {
  if (!props.articleId) return

  // gerar fingerprint
  const agent = await FingerprintJS.load()
  const result = await agent.get()
  fp.value = result.visitorId

  // contar likes totais
  const { count } = await supabase
    .from('ArticleLikes')
    .select('*', { count: 'exact', head: true })
    .eq('article_id', props.articleId)

  likes.value = count || 0

  // verificar se já curtiu
  const { data } = await supabase
    .from('ArticleLikes')
    .select('id')
    .eq('article_id', props.articleId)
    .eq('fingerprint', fp.value)
    .maybeSingle()

  liked.value = !!data
})

async function toggleLike() {
  if (!fp.value) return

  if (liked.value) {
    // remover like
    await supabase
      .from('ArticleLikes')
      .delete()
      .eq('article_id', props.articleId)
      .eq('fingerprint', fp.value)

    likes.value = Math.max(0, likes.value - 1)
    liked.value = false
  } else {
    // adicionar like
    await supabase.from('ArticleLikes').insert({
      article_id: props.articleId,
      fingerprint: fp.value,
    })

    likes.value++
    liked.value = true
  }
}
</script>

<template>
  <button
    @click="toggleLike"
    class="flex items-center gap-2 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
  >
    <span>{{ liked ? '❤️' : '🤍' }}</span>
    <span>{{ likes }}</span>
  </button>
</template>
