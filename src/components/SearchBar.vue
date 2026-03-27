<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  open: Boolean,
})

const emit = defineEmits(['close'])

const router = useRouter()
const query = ref('')
const inputRef = ref(null)

async function focusInput() {
  await nextTick()
  inputRef.value?.focus()
}

if (props.open) focusInput()

function submit() {
  const q = query.value.trim()
  if (!q) return

  router.push(`/search?q=${encodeURIComponent(q)}`)
  emit('close')
}

function handleKey(e) {
  if (e.key === 'Enter') submit()
  if (e.key === 'Escape') emit('close')
}
</script>

<template>
  <div v-if="open" class="absolute inset-0 flex min-w-10 items-center bg-bg px-4">
    <input
      ref="inputRef"
      v-model="query"
      @keydown="handleKey"
      type="text"
      placeholder="Buscar..."
      class="w-full bg-transparent border-b border-text outline-none text-lg"
    />

    <button @click="submit" class="ml-3 text-xl text-text hover:text-accent">
      <FontAwesomeIcon icon="search" />
    </button>
  </div>
</template>
