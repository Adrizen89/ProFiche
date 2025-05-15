<template>
  <section class="flex flex-col w-full rounded min-h-screen bg-white mx-auto gap-10 px-4 sm:px-6 lg:px-10">
    <h2 class="text-ctext font-bold text-2xl text-center py-5">Historique</h2>

    <!-- Filtres -->
    <FilterBar @filter-change="applyFilters" />

    <!-- Affichage des fiches -->
    <div class="overflow-x-auto">
      <table class="min-w-[900px] w-full border-collapse text-ctext">
        <thead>
          <tr class="text-xs sm:text-sm bg-primary w-full">
            <th class="p-3 text-left rounded-l-lg">Client</th>
            <th class="p-3 text-left">Date du rdv</th>
            <th class="p-3 text-left">Heure du rdv</th>
            <th class="p-3 text-left">Adresse</th>
            <th class="p-3 text-left">Téléphone</th>
            <th class="p-3 text-left">Email</th>
            <th class="p-3 text-left">État</th>
            <th class="p-3 text-left rounded-r-lg">Travaux envisagés</th>
          </tr>
        </thead>

        <tbody class="text-xs sm:text-sm text-center">
          <tr
            v-for="fiche in filteredItems"
            :key="fiche.id"
            class="border-b border-primary hover:bg-secondary cursor-pointer"
            @click="goToFiche(fiche.id)"
          >
            <td class="p-3 font-semibold text-left">{{ fiche.firstname }} {{ fiche.lastname }}</td>
            <td class="text-left">{{ fiche.date_rdv || '—' }}</td>
            <td class="text-left">{{ fiche.heure_rdv || '—' }}</td>
            <td class="text-left">{{ fiche.address }} - {{ fiche.code_postal }}, {{ fiche.city }}</td>
            <td class="text-left">{{ fiche.telephone }}</td>
            <td class="text-left">{{ fiche.email }}</td>
            <td class="text-left">
              <BaseTag
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
    </div>
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

const parseDate = (str) => {
  if (!str) return new Date('1900-01-01');
  const [day, month, year] = str.split('/');
  return new Date(`${year}-${month}-${day}`);
};

const applyFilters = (filters) => {
  filteredItems.value = items.value.filter((item) => {
    if (filters.address && item.city !== filters.address) return false;
    if (filters.workType && !item.planned_works.includes(filters.workType)) return false;

    if (filters.date === 'this_week') {
      const today = new Date();
      const monday = new Date(today.setDate(today.getDate() - (today.getDay() || 7) + 1));
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      const itemDate = parseDate(item.date_rdv);
      if (itemDate < monday || itemDate > sunday) return false;
    }

    if (filters.date === 'this_month') {
      const today = new Date();
      const itemDate = parseDate(item.date_rdv);
      if (itemDate.getMonth() !== today.getMonth() || itemDate.getFullYear() !== today.getFullYear()) {
        return false;
      }
    }

    if (
      filters.search &&
      !item.firstname.toLowerCase().includes(filters.search.toLowerCase()) &&
      !item.lastname.toLowerCase().includes(filters.search.toLowerCase()) &&
      !item.telephone.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

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
