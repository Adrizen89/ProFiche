<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import BaseButton from '../../../core/components/base/BaseButton.vue';
import DateFilter from './DateFilter.vue';
import WorksFilter from './WorksFilter.vue';
import AdressFilter from './AdressFilter.vue';
import { getDistinctCities } from '../../../services/ficheService.js';

const props = defineProps({
  initialFilters: { type: Object, default: () => ({}) }
});
const emit = defineEmits(['filter-change']);

const filters = ref({
  search: '',
  address: props.initialFilters.address || '',
  date: props.initialFilters.date || '',
  workType: props.initialFilters.workType || ''
});

const dateOptions = [
  { label: 'Date', value: '' },
  { label: 'Cette semaine', value: 'this_week' },
  { label: 'Ce mois', value: 'this_month' }
];

const workOptions = [
  { label: 'Travaux prévus', value: '' },
  { label: 'Fenêtre', value: 'fenetre' },
  { label: 'Volet roulant', value: 'volet_roulant' },
  { label: 'Volet battant', value: 'volet_battant' },
  { label: 'Store extérieur', value: 'store_exterieur' },
  { label: 'Store intérieur', value: 'store_interieur' },
  { label: 'Portail', value: 'portail' },
  { label: 'Pergola', value: 'pergola' },
  { label: "Porte de garage", value: 'porte_de_garage' },
  { label: "Clôture", value: 'cloture' },
  { label: "Porte d'entrée", value: 'porte_d_entree' }
];

const addressOptions = ref([{ label: 'Ville', value: '' }]);

onMounted(async () => {
  try {
    const cities = await getDistinctCities();
    addressOptions.value = [
      { label: 'Ville', value: '' },
      ...cities.map(city => ({ label: city, value: city }))
    ];
  } catch (err) {
    console.error("Erreur lors du chargement des villes :", err);
  }

  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => document.removeEventListener('click', handleClickOutside));

const addressOpen = ref(false);
const handleClickOutside = (e) => {
  if (!e.target.closest('.address-filter')) addressOpen.value = false;
};

const resetFilters = () => {
  filters.value = { search: '', address: '', date: '', workType: '' };
};

watch(filters, (newFilters) => {
  console.log("🔎 Filters utilisés :", newFilters);
  emit('filter-change', { ...newFilters });
}, { deep: true });
</script>

<template>
  <div class="w-11/12 py-5 rounded mx-auto bg-white border border-primary shadow px-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    
    <!-- Champ de recherche -->
    <div class="w-full md:w-2/8">
      <input
        v-model="filters.search"
        placeholder="Rechercher..."
        type="text"
        class="w-full p-2 border border-primary rounded text-ctext bg-secondary text-sm"
      />
    </div>

    <!-- Filtres -->
    <div class="w-full md:w-1/5">
      <AdressFilter v-model="filters.address" :options="addressOptions" />
    </div>

    <div class="w-full md:w-1/5">
      <DateFilter v-model="filters.date" :options="dateOptions" />
    </div>

    <div class="w-full md:w-1/5">
      <WorksFilter v-model="filters.workType" :options="workOptions" />
    </div>

    <!-- Bouton de reset -->
    <div class="w-full md:w-auto flex justify-end">
      <BaseButton @click="resetFilters" variant="secondary" class="text-sm w-full md:w-auto">
        Réinitialiser
      </BaseButton>
    </div>
  </div>
</template>

