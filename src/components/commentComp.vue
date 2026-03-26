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
</script>

<template>
  <div class="space-y-4">
    <h3 class="font-bold text-lg">Comentários</h3>

    <!-- Form -->
    <div class="space-y-2">
      <input v-model="nome" placeholder="Seu nome" class="w-full border p-2 rounded" />

      <textarea
        v-model="texto"
        placeholder="Escreva um comentário..."
        class="w-full border p-2 rounded"
      />

      <button @click="enviar" class="px-4 py-2 bg-blue-500 text-white rounded">Enviar</button>
    </div>

    <!-- Lista -->
    <div v-for="c in comentarios" :key="c.id" class="border-b pb-2">
      <p class="font-semibold">{{ c.name }}</p>
      <p class="text-sm text-gray-500">
        {{ new Date(c.created_at).toLocaleString('pt-BR') }}
      </p>
      <p>{{ c.content }}</p>
    </div>
  </div>
</template>
