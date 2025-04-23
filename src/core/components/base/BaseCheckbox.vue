<template>
    <label class="flex justify-center items-center space-x-2 p-2  text-ctext rounded-md cursor-pointer">
      <input
        type="checkbox"
        class="hidden peer"
        v-model="model"
        :value="value"
      />
      <div class="w-5 h-5 border-2 border-ctext rounded-md flex items-center justify-center peer-checked:border-accent">
        <svg v-if="model" class="w-4 h-4 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <span v-if="!hideLabel">{{ label }}</span>
    </label>
  </template>
  
  <script setup>
  const model = defineModel();
  defineProps({
    label: String,
    value: Boolean,
    hideLabel: Boolean, // Ajout pour masquer le texte si besoin
  });
  </script>
  