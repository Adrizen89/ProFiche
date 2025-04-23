<template>
    <section class="flex flex-col w-full rounded min-h-screen bg-white mx-auto gap-10">
      <h2 class="text-ctext font-bold text-2xl text-center py-5">Historique</h2>
  
      <!-- Filtres -->
      <FilterBar @filter-change="applyFilters" />
  
      <!-- Affichage des fiches -->
      <table class="w-11/12 mx-auto border-collapse text-ctext">
        <thead>
          <tr class="text-sm bg-primary w-full">
            <th class="w-1/11 p-4 rounded-l-lg">Client</th>
            <th class="w-1/11">Date du rdv</th>
            <th class="w-1/11">Heure du rdv</th>
            <th class="w-2/11">Adresse</th>
            <th class="w-1/11">Téléphone</th>
            <th class="w-2/11">Email</th>
            <th class="w-1/11">État</th>
            <th class="w-2/11 rounded-r-lg">Travaux envisagés</th>
          </tr>
        </thead>
  
        <tbody class="text-xs text-center">
          <tr
            v-for="fiche in filteredItems"
            :key="fiche.id"
            class="border-b border-primary cursor-pointer hover:bg-secondary rounded-lg"
            @click="goToFiche(fiche.id)"
          >
            <td class="p-3 font-semibold">{{ fiche.firstname }} {{ fiche.lastname }}</td>
            <td>{{ fiche.date_rdv || '—' }}</td>
            <td>{{ fiche.hour_rdv || '—' }}</td>
            <td>{{ fiche.address }}</td>
            <td>{{ fiche.telephone }}</td>
            <td>{{ fiche.email }}</td>
            <td><BaseTag
                  :text="getStatusLabel(fiche.status)"
                  :variant="getStatusVariant(fiche.status)"
                />
</td>
            <td class="flex flex-wrap gap-1 m-2 justify-center items-center">
              <BaseTag
                v-for="travaux in fiche.planned_works"
                :key="travaux"
                :text="formatLabel(travaux)"
                variant="primary"
              />
            </td>
            
          </tr>
        </tbody>
      </table>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  import BaseTag from '../../../core/components/base/BaseTag.vue';
  import FilterBar from '../../filters/components/FilterBar.vue';
  import { getAllFiches } from '../../../services/ficheService';
  
  const router = useRouter();
  const items = ref([]);
  const filteredItems = ref([]);
  
  const fetchAllFiches = async () => {
    try {
      const fiches = await getAllFiches();
      items.value = fiches;
      filteredItems.value = fiches;
    } catch (error) {
      console.error('Erreur lors de la récupération de toutes les fiches', error);
    }
  };
  
  const applyFilters = (filters) => {
    filteredItems.value = items.value.filter((item) => {
      if (filters.address && !item.address.includes(filters.address)) return false;
      if (filters.date && item.date_rdv !== filters.date) return false;
      if (filters.workType && !item.planned_works.includes(filters.workType)) return false;
      return true;
    });
  };
  
  const goToFiche = (id) => {
    router.push({ name: 'ficheDetails', params: { id } });
  };

  const getStatusLabel = (status) => {
  switch (status) {
    case 'In Progress': return 'En cours';
    case 'Completed': return 'Validée';
    default: return status;
  }
};

const getStatusVariant = (status) => {
  switch (status) {
    case 'In Progress': return 'secondary';
    case 'Completed': return 'success';
    default: return 'default';
  }
};

const formatLabel = (key) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

  
  onMounted(fetchAllFiches);
  </script>
  