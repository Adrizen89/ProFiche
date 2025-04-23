<!-- FilterBar.vue -->
<template>
    <div class="w-11/12 py-5 rounded mx-auto bg-white border border-primary shadow flex items-center justify-between px-5">

        <div class="w-2/8 text-ctext">
          <div class="relative">
            <input placeholder="Rechercher..." type="text" 
                   class="p-2 border border-primary w-full rounded bg-secondary text-sm" />
          </div>
        </div>

        <!-- Filtre adresse avec saisie libre et options -->
        <AdressFilter v-model="filters.address" :options="addressOptions" class="w-1/5" />
        
        <!-- Filtre date -->
        <DateFilter v-model="filters.date" :options="dateOptions" class="w-1/5" />
        
        <!-- Filtre type de travaux -->
        <WorksFilter v-model="filters.workType" :options="workOptions" class="w-1/5" />
        
        <!-- Bouton reset -->
        <BaseButton @click="resetFilters" variant="secondary" class="h-1/2 my-auto text-sm">
            Réinitialiser
            </BaseButton>
    </div>
  </template>
  
  <script setup>
    import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
    import BaseButton from '../../../core/components/base/BaseButton.vue';
    import DateFilter from './DateFilter.vue';
    import WorksFilter from './WorksFilter.vue';
    import AdressFilter from './AdressFilter.vue';
  
  const props = defineProps({
    initialFilters: { type: Object, default: () => ({}) }
  });
  const emit = defineEmits(['filter-change']);
  
  // Données des filtres
  const filters = ref({
    address: props.initialFilters.address || '',
    date: props.initialFilters.date || '',
    workType: props.initialFilters.workType || ''
  });
  
  // Options (normalement récupérées depuis une API)
  const dateOptions = [
    { label: 'Date', value: '' },
    { label: 'Cette semaine', value: 'this_week' },
    { label: 'Ce mois', value: 'this_month' }
  ];
  const workOptions = [
    { label: 'Travaux prévus', value: '' },
    { label: 'Fenêtres', value: 'windows' },
    { label: 'Portes', value: 'doors' }
  ];
  const addressOptions = [
    { label: 'Ville', value: '' },
    { label: 'Paris', value: 'paris' },
    { label: 'Lyon', value: 'lyon' },
    { label: 'Marseille', value: 'marseille' },
    { label: 'Bordeaux', value: 'bordeaux' }
  ];
  
  // État UI
  const addressOpen = ref(false);
  
  // Fermer la liste d'adresses sur clic extérieur
  const handleClickOutside = (e) => {
    if (!e.target.closest('.address-filter')) addressOpen.value = false;
  };
  onMounted(() => document.addEventListener('click', handleClickOutside));
  onUnmounted(() => document.removeEventListener('click', handleClickOutside));
  
  // Adresses filtrées selon la saisie
  const filteredAddresses = computed(() => {
    if (!filters.value.address) return addresses;
    return addresses.filter(a => a.toLowerCase().includes(filters.value.address.toLowerCase()));
  });
  
  // Sélectionner une adresse et fermer la liste
  const selectAddress = (address) => {
    filters.value.address = address;
    addressOpen.value = false;
  };
  
  // Réinitialiser les filtres
  const resetFilters = () => {
    filters.value = { address: '', date: '', workType: '' };
  };
  
  // Émettre les changements
  watch(filters, (newFilters) => {
    emit('filter-change', { ...newFilters });
  }, { deep: true });
  </script>