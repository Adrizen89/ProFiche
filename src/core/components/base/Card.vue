<template>
    <article
      class="w-full bg-white rounded-lg flex lg:flex-row flex-col items-start lg:items-center gap-4 shadow-lg border border-primary cursor-pointer hover:bg-secondary transition-all duration-300 transform hover:scale-105 p-4"
      @click="goToContact"
    >
      <!-- Icône 📁 -->
      <div class="bg-secondary text-3xl text-center rounded p-3 flex-shrink-0">
        📁
      </div>
  
      <!-- Contenu texte -->
      <div class="card-content flex flex-col gap-1 w-full">
        <p class="text-ctext font-bold text-lg leading-tight">
          {{ contact.firstname }} {{ contact.lastname }}
        </p>
        <p class="text-ctext-secondary text-sm sm:text-base">📞 {{ contact.telephone }}</p>
        <p class="text-ctext-secondary text-sm sm:text-base">
          🏠 {{ contact.address }} - {{ contact.code_postal }}, {{ contact.city }}
        </p>
        <p class="text-ctext-secondary text-sm sm:text-base">
          📅 {{ contact.date_rdv }} - ⏰ {{ contact.heure_rdv }}
        </p>
  
        <!-- Tags -->
        <div class="tags flex flex-wrap gap-2 mt-2">
          <p
            v-for="(tag, index) in sampleTags"
            :key="index"
            class="bg-primary text-ctext rounded-2xl text-xs font-semibold py-1 px-2"
          >
            {{ tag }}
          </p>
        </div>
      </div>
    </article>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const props = defineProps({ contact: Object });
  
  // 🏷️ Exemple de tags – tu peux remplacer ça par une prop dynamique
  const sampleTags = ['Fenêtres', 'Porte de garage'];
  
  const goToContact = () => {
    if (!props.contact?.id) return;
    router.push({ name: 'ficheInProgressDetails', params: { id: props.contact.id } });
  };
  </script>
  