<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function home() {
  router.push(`/`)
}
</script>

<template>
  <header class="relative flex items-center justify-center p-4 bg-bg shadow-xl">
    <!-- Esquerda -->
    <div class="relative flex items-center px-4 w-full sm:w-6xl">
      <div class="flex items-center gap-4">
        <button class="text-2xl text-text hover:text-accent">
          <FontAwesomeIcon icon="bars" />
        </button>
        <button class="text-2xl text-black hover:text-accent hidden sm:inline">
          <FontAwesomeIcon icon="search" />
        </button>
      </div>

      <!-- Centro -->
      <div
        @click="home"
        class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 font-bold text-xl cursor-pointer"
      >
        <span class="hidden text-text xs:inline">Llama</span>
        <img src="@/assets/logo.svg" alt="Logo" class="w-8 h-auto hidden xs:inline" />
        <img src="@/assets/bigLogo.svg" alt="Logo" class="w-8 h-auto xs:hidden" />
        <span class="scale-x-[-1] hidden text-text xs:inline">Llama</span>
      </div>

      <!-- Direita -->
      <div class="ml-auto flex items-center gap-4">
        <button class="text-2xl text-text hover:text-accent">
          <FontAwesomeIcon icon="user" />
        </button>
      </div>
    </div>
  </header>

  <RouterView />
</template>
