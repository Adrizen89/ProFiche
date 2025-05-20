<script setup>
import Sidebar from "./core/layouts/Sidebar.vue";
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="flex">
    <!-- Ne montre la sidebar que si showSidebar est vrai ou non défini -->
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
