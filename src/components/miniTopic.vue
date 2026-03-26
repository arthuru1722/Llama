<script setup>
defineProps({
  topic: String,
})
</script>

<template>
  <div class="flex pt-1 gap-0.5">
    <div class="text-accent text-xl">
      <FontAwesomeIcon :icon="['fas', 'arrow-right-long']" />
    </div>

    <span class="px-1 sm:max-w-sm md:text-sm h-fit text-text text-sm font-semibold font-sans">
      {{ topic }}
    </span>
  </div>
</template>
