<script setup>
import { ref } from 'vue'

defineProps({
  src: String,
  title: String,
  image: String,
})

const audio = ref(null)
const playing = ref(false)
const progress = ref(0)
const current = ref(0)
const duration = ref(0)

function updateProgress() {
  if (!audio.value) return

  current.value = audio.value.currentTime
  duration.value = audio.value.duration || 0

  progress.value = (audio.value.currentTime / audio.value.duration) * 100 || 0
}

function loadMeta() {
  if (!audio.value) return
  duration.value = audio.value.duration || 0
}

function format(t) {
  if (!t) return '00:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function toggle() {
  if (!audio.value) return

  if (audio.value.paused) {
    audio.value.play()
    playing.value = true
  } else {
    audio.value.pause()
    playing.value = false
  }
}

function seek(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  audio.value.currentTime = percent * audio.value.duration
}
</script>

<template>
  <div v-if="src" class="flex gap-4 p-0.5 rounded-sm bg-text">
    <div class="flex flex-col px-4 py-2 flex-1 justify-between">
      <div class="flex items-center gap-4">
        <button
          @click="toggle"
          class="min-w-14 min-h-14 rounded-full bg-accent text-bg flex items-center justify-center text-2xl hover:opacity-90 transition"
        >
          <FontAwesomeIcon :icon="playing ? 'pause' : 'play'" />
        </button>

        <p class="text-bg line-clamp-2">
          {{ title }}
        </p>
      </div>
      <div>
        <!-- tempo -->
        <div class="mt-3 flex justify-between text-xs text-bg/80 font-medium">
          <span>{{ format(current) }}</span>
          <span>{{ format(duration) }}</span>
        </div>
        <!-- Barra -->
        <div class="mt-1 h-1.5 bg-bg/80 rounded-full cursor-pointer relative" @click="seek">
          <!-- Parte preenchida -->
          <div
            class="h-full bg-accent rounded-full"
            :style="{ width: `calc(${progress}% )` }"
          ></div>
          <!-- Bolinha -->
          <div
            class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-accent border-3 border-text"
            :style="{ left: progress + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <img
      v-if="image"
      :src="image"
      alt=""
      class="w-30 h-30 object-cover rounded-x hidden sm:inline"
    />

    <audio
      ref="audio"
      :src="src"
      preload="metadata"
      @loadedmetadata="loadMeta"
      @timeupdate="updateProgress"
      @ended="playing = false"
      class="hidden"
    />
  </div>
</template>
