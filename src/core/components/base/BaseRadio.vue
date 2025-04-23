<template>
    <label class="flex items-center space-x-2 p-2 cursor-pointer rounded-md hover:bg-primary">
      <input 
        type="radio" 
        :value="value"
        v-model="model"
        class="hidden peer"
      />
      <div class="w-5 h-5 border-2 border-secondary rounded-full flex items-center justify-center peer-checked:bg-accent">
        <div class="w-3 h-3 bg-accent rounded-full peer-checked:block hidden"></div>
      </div>
      <span class="text-ctext-secondary text-sm">{{ label }}</span>
    </label>
  </template>
  
  <script setup>
  const model = defineModel();
  defineProps({ label: String, value: String });
  </script>
  