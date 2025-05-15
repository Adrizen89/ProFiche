<template>
  <section class="flex flex-col w-full rounded min-h-screen bg-white mx-auto">
    <h2 class="text-ctext font-bold text-2xl text-center py-5">Fiche en cours</h2>

    <!-- Grille responsive -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4 sm:px-8 w-full">
      <Card
        v-for="contact in contacts"
        :key="contact.id"
        :contact="contact"
        @select="goToFiche"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import Card from '../../../core/components/base/Card.vue';
import { getFichesEnCours } from '../../../services/ficheService';
import { useRouter } from 'vue-router';

const router = useRouter();
const contacts = ref([]);

const fetchFichesEnCours = async () => {
  const fiches = await getFichesEnCours();
  contacts.value = fiches;
};

const goToFiche = (id) => {
  router.push({ name: 'ficheInProgressDetails', params: { id } });
};

fetchFichesEnCours();
</script>
