<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const isOpen = ref(true);
const isMobile = ref(window.innerWidth < 1024);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const handleResize = () => {
  isMobile.value = window.innerWidth < 1024;
  isOpen.value = !isMobile.value ? true : false;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="flex">
    <!-- Sidebar -->
    <div
      :class="[
        'h-screen bg-white text-ctext fixed top-0 left-0 flex flex-col shadow-md transition-all duration-300 z-50',
        isOpen ? 'w-64' : 'w-16'
      ]"
    >
      <!-- Logo + Toggle -->
      <div class="p-4 flex items-center justify-between">
        <span v-if="isOpen" class="text-xl font-bold">📂 Fiches Contacts</span>
        <button
          class="lg:hidden p-1 rounded hover:bg-secondary"
          @click="toggleSidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex flex-col p-4 gap-5">
        <router-link
          to="/"
          class="nav-link py-2 px-3 flex items-center gap-2"
          active-class="bg-primary font-bold rounded"
        >
          <img src="/home.svg" alt="Accueil" width="24" height="24" />
          <span v-if="isOpen">Accueil</span>
        </router-link>

        <router-link
          to="/create-fiche"
          class="nav-link py-2 px-3 flex items-center gap-2"
          active-class="bg-primary font-bold rounded"
        >
          <img src="/create.svg" alt="Créer" width="24" height="24" />
          <span v-if="isOpen">Créer Fiche</span>
        </router-link>

        <router-link
          to="/fiche-in-progress"
          class="nav-link py-2 px-3 flex items-center gap-2"
          active-class="bg-primary font-bold rounded"
        >
          <img src="/in-progress.svg" alt="En cours" width="24" height="24" />
          <span v-if="isOpen">Fiches en cours</span>
        </router-link>

        <router-link
          to="/historique"
          class="nav-link py-2 px-3 flex items-center gap-2"
          active-class="bg-primary font-bold rounded"
        >
          <img src="/historique.svg" alt="Historique" width="24" height="24" />
          <span v-if="isOpen">Historique</span>
        </router-link>
      </nav>
    </div>

    <!-- Contenu -->
    <div
      :class="[
        'transition-all duration-300 w-full',
        isOpen ? 'ml-64' : 'ml-16'
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 1023px) {
  .nav-link {
    justify-content: center;
  }
}
</style>
