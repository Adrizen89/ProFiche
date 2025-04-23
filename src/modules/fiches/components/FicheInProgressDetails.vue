<template>
  <section class="flex flex-col gap-10 w-full rounded min-h-screen bg-white border border-white mx-auto">
    <!-- Résumé fiche sélectionnée -->
    <article class="flex flex-col border border-primary rounded-lg shadow-lg w-2/3 items-center gap-5 mx-auto py-10 px-8 bg-white">
      <p class="text-2xl font-bold text-ctext">{{ contact.firstname }} {{ contact.lastname }}</p>
      <p class="text-ctext-secondary">📞 {{ contact.telephone }} — 📍 {{ contact.address }}, {{ contact.city }}</p>
    </article>

    <!-- Formulaire dynamique -->
    <MenuiserieForm v-if="plannedWorks.length" :plannedWorks="plannedWorks" />
    <p v-else class="text-center text-gray-500 text-sm mt-5">
      Aucun travail planifié pour cette fiche.
    </p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getFicheById } from '../../../services/ficheService';
import MenuiserieForm from '../../menuiseries/views/Menuiserie_form.vue'

const route = useRoute();
const contact = ref({});
const plannedWorks = ref([]);

onMounted(async () => {
  const id = route.params.id;
  if (id) {
    try {
      const fiche = await getFicheById(id);
      console.log("Fiche récupérée :", fiche);
      contact.value = fiche;

      if (Array.isArray(fiche.planned_works)) {
        plannedWorks.value = fiche.planned_works
          .filter(w => typeof w === 'string')
          .map(w => w.toLowerCase().replace(/\s/g, '_'));
      } else {
        plannedWorks.value = [];
      }
    } catch (err) {
      console.error("Erreur lors de la récupération de la fiche :", err);
    }
  }
});
</script>