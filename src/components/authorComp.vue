<script setup>
defineProps({
  id: Number,
  name: String,
  text: String,
  image: String,
  bio: String,
})
</script>

<template>
  <div class="flex flex-col pt-1 gap-0.5">
    <div class="flex items-center gap-2">
      <div
        class="min-h-10 min-w-10 sm:min-h-12 sm:min-w-12 rounded-full bg-cover bg-center filter grayscale"
        :style="{ backgroundImage: `url(${image})` }"
      ></div>
      <p class="text-accent font-serif font-bold text-2xl xs:text-3xl sm:text-4xl">{{ name }}</p>
    </div>
    <p class="text-text font-semibold font-serif text-sm sm:text-base">{{ bio }}</p>
  </div>
</template>
