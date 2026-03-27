<script setup>
import { ref, onMounted, computed } from 'vue'
import cardComp from '@/components/cardComp.vue'
import mainComp from '@/components/mainComp.vue'
import authorComp from '@/components/authorComp.vue'
import { supabase } from '@/lib/supabase'

const materias = ref([])
const cols = ref(3)

onMounted(async () => {
  const { data, error } = await supabase
    .from('Article')
    .select('*')
    .order('created_at', { ascending: false })

  if (!error) materias.value = data
  else console.error(error)

  updateCols()
  window.addEventListener('resize', updateCols)
})

const outrosGrid = computed(() => {
  const c = cols.value
  const lista = outros.value

  if (lista.length === 0) return []

  const minimo = 3

  const alvo = Math.max(c * Math.ceil(minimo / c), minimo)

  return lista.slice(0, Math.min(alvo, lista.length))
})

function updateCols() {
  const w = window.innerWidth

  if (w >= 1024)
    cols.value = 3 // lg
  else if (w >= 640)
    cols.value = 2 // sm
  else cols.value = 1
}

const autores = ref([])

onMounted(async () => {
  const { data, error } = await supabase.from('Author').select('*')

  if (!error) autores.value = data
  else console.error(error)
})

const destaque = computed(() => materias.value.find((m) => m.id === 21))
const outros = computed(() => materias.value.filter((m) => m.id !== 21))
</script>

<template>
  <main class="flex flex-col max-w-5xl mx-auto p-6 gap-4">
    <div class="grid grid-cols-2 md:flex md:flex-row justify-between">
      <authorComp v-for="a in autores" :key="a.id" :name="a.name" :image="a.avatar" :bio="a.bio" />
    </div>
    <hr class="border-hr" />
    <mainComp
      v-if="destaque"
      :id="destaque.id"
      :title="destaque.title"
      :text="destaque.short_summary"
      :image="destaque.cover"
      :category="destaque.category"
      :topics="destaque.topics"
    />

    <div class="grid pt-2 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      <cardComp
        v-for="m in outrosGrid"
        :key="m.id"
        :id="m.id"
        :title="m.title"
        :image="m.cover"
        :category="m.category"
        :topics="m.topics"
      />
    </div>
  </main>
</template>
