<template>
  <span
    class="py-1 px-3 inline-block rounded-4xl font-semibold"
    :class="variantClass"
  >
    {{ text }}
  </span>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  text: {
    type: String,
    default: 'Text',
  },
  variant: {
    type: String,
    default: 'primary', // 'primary', 'success', 'warning', 'danger', etc.
  },
});

const variantClass = computed(() => {
  const variants = {
    primary: 'bg-primary text-ctext',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-black',
    danger: 'bg-red-500 text-white',
    secondary: 'bg-gray-200 text-black',
  };

  return variants[props.variant] || variants.primary;
});
</script>
