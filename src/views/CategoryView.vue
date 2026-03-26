<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/lib/supabase'
import cardComp from '@/components/cardComp.vue'
import { formatCategory } from '@/utils/category.js'

const route = useRoute()
const materias = ref([])

const categoriaAtual = computed(() =>
  route.params.category ? route.params.category.join('/') : null,
)

async function load() {
  if (!categoriaAtual.value) return

  const { data } = await supabase
    .from('Article')
    .select('*')
    .like('category', categoriaAtual.value + '%')
    .order('created_at', { ascending: false })

  materias.value = data || []
}

watch(() => route.params.category, load, { immediate: true })
</script>

<template>
  <main class="max-w-6xl mx-auto p-6">
    <h1 class="text-3xl font-sans font-bold mb-6">
      {{ formatCategory(categoriaAtual) }}
    </h1>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <cardComp
        v-for="m in materias"
        :key="m.id"
        :id="m.id"
        :title="m.title"
        :text="m.summary"
        :image="m.cover"
        :category="m.category"
      />
    </div>
  </main>
</template>
