<template>
  <button :class="computedClass" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: { type: String, default: "primary" },
  size: { type: String, default: "md" },
});

const emit = defineEmits(["click"]);

const handleClick = (event) => {
  emit("click", event); // on passe bien l'event pour que `.stop` fonctionne
};

const computedClass = computed(() => {
  const base = "px-4 py-2 rounded transition-all duration-200 shadow-sm cursor-pointer";
  const variants = {
    primary: "bg-accent text-white hover:bg-haccent",
    secondary: "bg-secondary text-black hover:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return `${base} ${variants[props.variant] || variants.primary} ${sizes[props.size] || sizes.md}`;
});
</script>
