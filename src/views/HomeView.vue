<script setup>
import { ref, onMounted } from 'vue'
import cardComp from '@/components/cardComp.vue'
import { supabase } from '@/lib/supabase'

const materias = ref([])

onMounted(async () => {
  const { data, error } = await supabase
    .from('Article')
    .select('*')
    .order('created_at', { ascending: false })

  if (!error) materias.value = data
  else console.error(error)
})
</script>

<template>
  <main class="max-w-6xl mx-auto p-6">
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
