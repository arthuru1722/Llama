<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

const props = defineProps({
  articleId: Number,
})

const comentarios = ref([])
const nome = ref('')
const texto = ref('')

async function carregar() {
  const { data } = await supabase
    .from('Comments')
    .select('*')
    .eq('article_id', props.articleId)
    .order('created_at', { ascending: false })

  comentarios.value = data || []
}

onMounted(carregar)

async function enviar() {
  if (!nome.value || !texto.value) return

  await supabase.from('Comments').insert({
    article_id: props.articleId,
    name: nome.value,
    content: texto.value,
  })

  nome.value = ''
  texto.value = ''

  carregar()
}

function tempoAtras(data) {
  const agora = new Date()
  const d = new Date(data)
  const diff = Math.floor((agora - d) / 1000)

  if (diff < 60) return 'agora mesmo'
  if (diff < 3600) return `${Math.floor(diff / 60)} min atrás`
  if (diff < 86400) return `${Math.floor(diff / 3600)} h atrás`
  if (diff < 604800) return `${Math.floor(diff / 86400)} dia(s) atrás`
  if (diff < 2592000) return `${Math.floor(diff / 604800)} semana(s) atrás`
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} mês(es) atrás`

  return `${Math.floor(diff / 31536000)} ano(s) atrás`
}
</script>

<template>
  <div class="space-y-4">
    <div class="space-y-2 p-1 rounded-xl shadow-inner">
      <textarea
        v-model="texto"
        @input="autoResize"
        rows="1"
        placeholder="Escreva um comentário..."
        class="w-full p-2 font-sans resize-none focus:outline-none text-xs"
      ></textarea>

      <div class="flex gap-2">
        <input
          v-model="nome"
          placeholder="Seu nome"
          class="flex min-w-0 p-2 font-sans focus:outline-none"
        />

        <button @click="enviar" class="px-4 py-2 bg-accent text-white font-bold font-sans rounded">
          Enviar
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <div v-for="c in comentarios" :key="c.id" class="rounded-xl p-2">
        <p class="flex gap-2 items-center font-semibold font-sans text-text">
          <span>{{ c.name }}</span>
          <span class="text-xs text-text-gray">
            {{ tempoAtras(c.created_at) }}
          </span>
        </p>

        <p class="text-xs">{{ c.content }}</p>
      </div>
    </div>
  </div>
</template>
