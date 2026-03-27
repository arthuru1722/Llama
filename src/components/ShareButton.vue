<script setup>
import { ref } from 'vue'
import ShareModal from './ShareModal.vue'

const props = defineProps({
  title: String,
})

const open = ref(false)

const url = window.location.href

async function share() {
  if (navigator.share) {
    try {
      await navigator.share({
        title: props.title,
        url,
      })
      return
    } catch (err) {
      void err
    }
  }

  open.value = true
}
</script>

<template>
  <div>
    <button
      @click="share"
      class="flex items-center gap-2 p-2 border border-text rounded-2xl hover:bg-text-gray/10 tel text-bg hover:text-text transition"
    >
      <FontAwesomeIcon class="drop-shadow-[0_0_1px_black]" icon="share-nodes" />
    </button>

    <ShareModal :open="open" :url="url" :title="title" @close="open = false" />
  </div>
</template>
