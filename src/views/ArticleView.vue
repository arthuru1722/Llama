<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/lib/supabase'
import { marked } from 'marked'

import AudioPlayer from '@/components/AudioPlayer.vue'
import likeComp from '@/components/likeComp.vue'
import commentPanel from '@/components/commentPanel.vue'
import ShareButton from '@/components/ShareButton.vue'

const route = useRoute()
const article = ref(null)
const mostrarComentarios = ref(false)
const totalComment = ref(0)

async function load() {
  if (!route.params.id) return

  const { data } = await supabase.from('Article').select('*').eq('id', route.params.id).single()

  article.value = data

  const { data: mount } = await supabase
    .from('Comments')
    .select('id')
    .eq('article_id', article.value.id)

  totalComment.value = mount.length || 0
}

watch(() => route.params.id, load, { immediate: true })

const html = computed(() => (article.value ? marked(article.value.content) : ''))
</script>

<template>
  <div
    v-if="article"
    class="max-w-6xl mx-auto p-6 gap-8 block"
    :class="mostrarComentarios ? 'flex' : 'block'"
  >
    <main class="flex-1 min-w-0 max-w-3xl mx-auto">
      <p class="font-sans font-semibold text-xs">
        {{ article.category.replaceAll('/', ' > ') }}
      </p>

      <h1 class="text-3xl font-serif font-bold mb-6">
        {{ article.title }}
      </h1>

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

      <div class="flex justify-end items-center gap-2 my-3">
        <likeComp :articleId="article.id" />

        <button
          @click="mostrarComentarios = !mostrarComentarios"
          class="flex items-center gap-2 px-3 py-1 border border-text rounded-2xl hover:bg-text-gray/10"
        >
          <font-awesome-icon class="drop-shadow-[0_0_1px_black] text-bg" icon="message" />
          {{ totalComment }}
        </button>

        <ShareButton :title="article.title" />
      </div>

      <p class="font-sans prose-lg max-w-none text-justify">
        {{ article.summary }}
      </p>

      <AudioPlayer
        v-if="article.audio"
        :src="article.audio"
        :title="article.title"
        :image="article.cover"
      />

      <div class="font-sans prose-lg max-w-none text-justify mt-6" v-html="html"></div>
    </main>

    <!-- DESKTOP-->
    <div v-if="mostrarComentarios" class="hidden lg:block w-95">
      <commentPanel :articleId="article.id" @close="mostrarComentarios = false" />
    </div>
  </div>

  <!-- MOBILE-->
  <div v-if="mostrarComentarios" class="fixed inset-0 z-50 lg:hidden">
    <div
      class="absolute inset-0 bg-black/40 backdrop-blur-sm"
      @click="mostrarComentarios = false"
    ></div>

    <aside class="absolute inset-x-0 bottom-0 top-40 bg-white rounded-t-2xl overflow-y-auto">
      <button @click="mostrarComentarios = false" class="absolute top-2 right-4 text-xl">✕</button>

      <commentPanel :articleId="article.id" @close="mostrarComentarios = false" />
    </aside>
  </div>
</template>
