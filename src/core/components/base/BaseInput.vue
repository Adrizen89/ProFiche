<template>
    <div class="flex">
      <input
        :placeholder="placeholder"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="p-2 border border-primary w-full rounded bg-secondary text-ctext focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  </template>
  
  <script setup>
  defineProps({
    type: { type: String, default: "text" },
    placeholder: { type: String, default: "text"},
    modelValue: String
  });
  defineEmits(["update:modelValue"]);
  </script>
  