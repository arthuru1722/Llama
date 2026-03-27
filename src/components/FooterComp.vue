<script setup>
const participantes = ['Lara', 'Leticia', 'Arthur', 'Mirella']
</script>

<template>
  <footer class="bg-text text-bg py-8 px-4">
    <div class="flex justify-center mb-4">
      <img src="@/assets/LlamaWhite.svg" alt="Logo" class="w-16 xs:w-12" />
    </div>

    <div class="flex flex-wrap justify-center gap-4 mb-2 text-sm xs:text-xs">
      <span v-for="p in participantes" :key="p">{{ p }}</span>
    </div>

    <div class="text-center text-xs xs:text-[10px]">
      <span>Site ilustrativo • </span>
      <a
        href="https://github.com/arthuru1722/Llama"
        target="_blank"
        class="underline hover:text-accent transition"
      >
        GitHub do projeto
      </a>
    </div>
  </footer>
</template>
