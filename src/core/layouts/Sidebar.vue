<script setup>
import { ref } from "vue";

// État pour ouvrir/fermer la sidebar
const isOpen = ref(true);
</script>

<template>
  <div class="flex">
    <!-- Sidebar -->
    <div
      :class="{
        'w-1/5': isOpen,
        'w-20': !isOpen
      }"
      class="h-screen bg-white text-ctext fixed top-0 left-0 flex flex-col transition-all duration-300 shadow-md"
    >


      <!-- Logo -->
      <div v-if="isOpen" class="p-5 text-xl font-bold flex items-center">
        <span>📂 Fiches Contacts</span>
      </div>

      <!-- Navigation -->
      <nav class="flex flex-col p-4 gap-5">
        <router-link
          to="/"
          class="nav-link py-2 px-5 flex gap-2"
          active-class="bg-primary font-bold rounded px-5"
        >
          <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  <polyline points="9 22 9 12 15 12 15 22" />
</svg></span>
          <span v-if="isOpen">Accueil</span>
        </router-link>

        <router-link
          to="/create-fiche"
          class="nav-link py-2 px-5 flex gap-2"
          active-class="bg-primary font-bold rounded px-5"
        >
          <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
  <polyline points="14 2 14 8 20 8" />
  <line x1="12" y1="18" x2="12" y2="12" />
  <line x1="9" y1="15" x2="15" y2="15" />
</svg></span>
          <span v-if="isOpen">Créer Fiche</span>
        </router-link>

        <router-link
          to="/fiche-in-progress"
          class="nav-link py-2 px-5 flex gap-2"
          active-class="bg-primary font-bold rounded px-5"
        >
          <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
  <polyline points="14 2 14 8 20 8" />
  <line x1="8" y1="13" x2="16" y2="13" />
  <line x1="8" y1="17" x2="16" y2="17" />
  <circle cx="19" cy="19" r="4" fill="none" stroke="#4CAF50" />
  <path d="M19 17v4" stroke="#4CAF50" />
  <path d="M17 19h4" stroke="#4CAF50" />
</svg></span>
          <span v-if="isOpen">Fiches en cours</span>
        </router-link>

        <router-link
          to="/historique"
          class="nav-link py-2 px-5 flex gap-2"
          active-class="bg-primary font-bold rounded px-5"
        >
          <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10" />
  <polyline points="12 6 12 12 16 14" />
  <path d="M12 22V18" />
  <path d="M18 22l-3-3" />
  <path d="M6 22l3-3" />
</svg></span>
          <span v-if="isOpen">Historique</span>
        </router-link>
      </nav>
    </div>

    <!-- Contenu principal -->
    <div
      :class="{
        'ml-64': isOpen,
        'ml-20': !isOpen
      }"
      class="transition-all duration-300 w-full p-5"
    >
      <slot />
    </div>
  </div>
</template>


