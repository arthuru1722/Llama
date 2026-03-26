<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/lib/supabase'
import { marked } from 'marked'

import AudioPlayer from '@/components/AudioPlayer.vue'
import likeComp from '@/components/likeComp.vue'
import commentComp from '@/components/commentComp.vue'

const route = useRoute()
const article = ref(null)

async function load() {
  if (!route.params.id) return

  const { data } = await supabase.from('Article').select('*').eq('id', route.params.id).single()

  article.value = data
}

watch(() => route.params.id, load, { immediate: true })

const html = computed(() => (article.value ? marked(article.value.content) : ''))
</script>

<template>
  <main v-if="article" class="max-w-3xl mx-auto p-6">
    <p class="font-sans font-semibold text-xs">{{ article.category.replaceAll('/', ' > ') }}</p>
    <h1 class="text-3xl font-serif font-bold mb-6">{{ article.title }}</h1>
    <p class="font-sans font-bold">Por {{ article.author }}</p>
    <p class="font-sans text-base text-text-gray">
      {{ new Date(article.created_at).toLocaleDateString('pt-BR') }}
      |
      {{
        new Date(article.created_at).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        })
      }}
    </p>
    <hr class="border-hr" />
    <likeComp :articleId="article.id" />
    <commentComp :articleId="article.id" />
    <br />
    <p class="font-sans prose-lg max-w-none text-justify">{{ article.summary }}</p>
    <br />
    <AudioPlayer
      v-if="article.audio"
      :src="article.audio"
      :title="article.title"
      :image="article.cover"
    />
    <br />

    <div class="font-sans prose-lg max-w-none text-justify" v-html="html"></div>
  </main>
</template>
