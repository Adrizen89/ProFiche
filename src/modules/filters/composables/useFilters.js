import { ref, computed } from 'vue';

export function useFilters(initialFilters = {}) {
  const filters = ref({...initialFilters});
  
  const resetFilters = () => {
    Object.keys(filters.value).forEach(key => {
      filters.value[key] = '';
    });
  };
  
  const hasActiveFilters = computed(() => {
    return Object.values(filters.value).some(value => value !== '');
  });
  
  const filterResults = (items) => {
    // Logique de filtrage
    return items;
  };
  
  return {
    filters,
    resetFilters,
    hasActiveFilters,
    filterResults
  };
}