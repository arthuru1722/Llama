<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { get, set } from 'idb-keyval'

const props = defineProps({
  articleId: Number,
})

const likes = ref(0)
const liked = ref(false)

onMounted(async () => {
  if (!props.articleId) return

  const { count } = await supabase
    .from('ArticleLikes')
    .select('*', { count: 'exact', head: true })
    .eq('article_id', props.articleId)

  likes.value = count || 0

  const local = await get(`like-${props.articleId}`)
  liked.value = local?.liked || false
})

async function toggleLike() {
  if (!props.articleId) return

  if (liked.value) {
    await supabase.from('ArticleLikes').delete().eq('article_id', props.articleId)

    likes.value = Math.max(0, likes.value - 1)
    liked.value = false
  } else {
    await supabase.from('ArticleLikes').insert({
      article_id: props.articleId,
    })

    likes.value++
    liked.value = true
  }

  await set(`like-${props.articleId}`, {
    id: props.articleId,
    liked: liked.value,
  })
}
</script>

<template>
  <button
    @click="toggleLike"
    class="flex items-center gap-2 px-3 py-1 border border-text rounded-2xl hover:bg-text-gray/10"
  >
    <span :class="{ 'text-accent': liked, 'text-bg': !liked }"
      ><font-awesome-icon class="drop-shadow-[0_0_1px_black]" icon="heart" />
    </span>
    <span>{{ likes }}</span>
  </button>
</template>
