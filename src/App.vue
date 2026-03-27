<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import FooterComp from './components/FooterComp.vue'

const router = useRouter()

const scrolled = ref(false)
const searchOpen = ref(false)

function handleScroll() {
  scrolled.value = window.scrollY > 0
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

function home() {
  router.push(`/`)
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header
      class="sticky top-0 z-50 flex items-center justify-center bg-bg transition-all duration-300 ease-out"
      :class="scrolled ? 'shadow-md p-2' : 'p-4'"
    >
      <div class="relative flex items-center px-4 w-full sm:w-6xl">
        <!-- ESQUERDA -->
        <div class="flex items-center gap-4">
          <button class="text-xl xs:text-lg text-text hover:text-accent">
            <FontAwesomeIcon icon="bars" />
          </button>

          <button
            @click="searchOpen = true"
            class="text-xl xs:text-lg text-text hover:text-accent hidden sm:inline"
          >
            <FontAwesomeIcon icon="search" />
          </button>
        </div>

        <!-- CENTRO -->
        <div
          v-if="!searchOpen"
          @click="home"
          class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 font-bold text-xl cursor-pointer"
        >
          <span class="hidden text-text xs:inline">Llama</span>

          <img
            src="@/assets/logo.svg"
            alt="Logo"
            class="h-auto hidden xs:inline transition-all duration-300 ease-out"
            :class="scrolled ? 'w-6' : 'w-8'"
          />

          <img
            src="@/assets/bigLogo.svg"
            alt="Logo"
            class="h-auto xs:hidden transition-all duration-300 ease-out"
            :class="scrolled ? 'w-6' : 'w-8'"
          />

          <span class="scale-x-[-1] hidden text-text xs:inline">Llama</span>
        </div>

        <!-- DIREITA -->
        <div class="ml-auto flex items-center gap-4">
          <button class="text-xl xs:text-lg text-text hover:text-accent">
            <FontAwesomeIcon icon="user" />
          </button>
        </div>

        <!-- SEARCH OVERLAY -->
        <SearchBar :open="searchOpen" @close="searchOpen = false" />
      </div>
    </header>

    <main class="flex-1">
      <RouterView />
    </main>

    <FooterComp />
  </div>
</template>
