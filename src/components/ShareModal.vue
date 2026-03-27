<script setup>
import { ref } from 'vue'

const props = defineProps({
  open: Boolean,
  url: String,
  title: String,
})

const emit = defineEmits(['close'])

const copied = ref(false)

function copy() {
  navigator.clipboard.writeText(props.url)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm"
    @click.self="emit('close')"
  >
    <div
      class="bg-bg text-text p-6 rounded-xl shadow-lg w-full max-w-sm flex flex-col gap-4 font-sans"
    >
      <h2 class="font-bold text-2xl font-serif">Compartilhar</h2>

      <a
        :href="`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`"
        target="_blank"
        class="flex items-center gap-2 p-2 border border-hr rounded hover:border-accent transition"
      >
        <FontAwesomeIcon :icon="['fab', 'whatsapp']" />
        WhatsApp
      </a>

      <a
        :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`"
        target="_blank"
        class="flex items-center gap-2 p-2 border border-hr rounded hover:border-accent transition"
      >
        <FontAwesomeIcon :icon="['fab', 'x-twitter']" />
        X / Twitter
      </a>

      <div class="flex gap-2 items-center">
        <input
          :value="url"
          readonly
          class="flex-1 p-2 border border-hr rounded bg-transparent text-sm text-text-gray outline-none"
        />
        <button @click="copy" class="p-2 border border-hr rounded hover:border-accent transition">
          <FontAwesomeIcon icon="copy" />
        </button>
      </div>
      <span v-if="copied" class="text-xs text-accent">Copiado!</span>

      <button
        @click="emit('close')"
        class="mt-2 py-2 text-sm text-text-gray transition hover:outline-1 outline-accent"
      >
        Fechar
      </button>
    </div>
  </div>
</template>
