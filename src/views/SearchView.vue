<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/lib/supabase'
import cardComp from '@/components/cardComp.vue'

const route = useRoute()

const results = ref([])
const loading = ref(false)

async function search(q) {
  if (!q || typeof q !== 'string') {
    results.value = []
    return
  }

  loading.value = true

  const { data, error } = await supabase
    .from('Article')
    .select('*')
    .or(`title.ilike.%${q}%,short_summary.ilike.%${q}%,topics.ilike.%${q}%`)
    .order('created_at', { ascending: false })

  if (!error) results.value = data
  else console.error(error)

  loading.value = false
}

watch(
  () => route.query.q,
  (q) => search(q),
  { immediate: true }, //toda a refatoração dessa parte foi inutil e pode dar problema no futuro
)
</script>

<template>
  <main class="max-w-5xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Resultados para "{{ $route.query.q }}"</h1>

    <div v-if="loading">Buscando...</div>

    <div v-else-if="results.length === 0">Nenhum resultado encontrado</div>

    <div v-else class="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      <cardComp
        v-for="m in results"
        :key="m.id"
        :id="m.id"
        :title="m.title"
        :text="m.short_summary"
        :image="m.cover"
        :category="m.category"
        :topics="m.topics"
      />
    </div>
  </main>
</template>
