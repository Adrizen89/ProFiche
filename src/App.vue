<script setup>
import Sidebar from "./core/layouts/Sidebar.vue";
</script>

<template>
  <div class="flex">
    <Sidebar v-if="route.meta.showSidebar !== false" />
    <div class="main-content">
      <router-view />
    </div>
    
    </div>
</template>

<style scoped>
  .main-content {
    flex: 1;
  padding: 1rem;
  overflow-x: hidden;
  transition: margin-left 0.3s ease;
  }
  
</style>
