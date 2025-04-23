<template>
    <div class="flex flex-col space-y-1">
    <label v-if="label" :for="id" class="text-sm font-medium text-ctext">{{ label }}</label>
    <div class="relative">
      <select
        v-model="model"
        :id="id"
        class="appearance-none p-2 border border-primary w-full rounded bg-secondary text-ctext focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
</template>
  
  <script setup>

import { computed } from 'vue';

  const model = defineModel();
  const props = defineProps({
    options: {
      type: Array,
      required: true,
    },
    label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  });
  const id = computed(() => props.id || `select-${Math.random().toString(36).substr(2, 9)}`);
  </script>