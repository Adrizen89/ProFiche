<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  selectedDate: {
    type: Date,
    default: () => new Date()
  },
  appointments: {
    type: Array,
    default: () => []
  }
});

// Configuration de l'affichage
const startYearOffset = ref(0);
const visibleYears = ref(5);

// Noms des mois
const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

// Calcul des années à afficher
const yearsToShow = computed(() => {
  const result = [];
  const currentYear = new Date().getFullYear();
  
  for (let i = 0; i < visibleYears.value; i++) {
    const year = currentYear - startYearOffset.value + i;
    
    // Compter tous les rendez-vous de l'année
    const appointmentsCount = props.appointments.filter(appt => {
      const apptDate = new Date(appt.date);
      return apptDate.getFullYear() === year;
    }).length;
    
    result.push({
      year,
      appointmentsCount,
      isSelected: year === props.selectedDate.getFullYear()
    });
  }
  
  return result;
});

// Navigation entre les années
const previousYears = () => {
  startYearOffset.value += visibleYears.value;
};

const nextYears = () => {
  startYearOffset.value = Math.max(0, startYearOffset.value - visibleYears.value);
};

// Sélection d'une année
const emit = defineEmits(['year-selected']);
const selectYear = (yearData) => {
  const newDate = new Date(props.selectedDate);
  newDate.setFullYear(yearData.year);
  emit('year-selected', newDate);
};

// Statistiques mensuelles pour l'année sélectionnée
const monthlyStats = computed(() => {
  const result = [];
  const selectedYear = props.selectedDate.getFullYear();
  
  for (let month = 0; month < 12; month++) {
    const appointmentsCount = props.appointments.filter(appt => {
      const apptDate = new Date(appt.date);
      return apptDate.getMonth() === month && apptDate.getFullYear() === selectedYear;
    }).length;
    
    result.push({
      name: monthNames[month],
      month,
      appointmentsCount
    });
  }
  
  return result;
});
</script>

<template>
  <div>
    <!-- Slider des années -->
    <div class="w-full mt-5 flex gap-3">
      <div 
        v-for="yearData in yearsToShow" 
        :key="yearData.year"
        :class="[
          'w-1/5 shadow-sm rounded-lg flex flex-col justify-center items-center py-5 cursor-pointer',
          yearData.isSelected ? 'bg-white border border-ctext' : 'bg-secondary'
        ]"
        @click="selectYear(yearData)"
      >
        <p class="text-ctext font-bold text-xl">{{ yearData.year }}</p>
        <div class="mt-2 text-sm text-gray-600">
          {{ yearData.appointmentsCount }} rendez-vous
        </div>
      </div>

      <!-- Boutons de navigation -->
      <div class="flex flex-col justify-between">
        <button 
          class="h-2/5 py-1 px-4 bg-secondary rounded-lg text-ctext cursor-pointer"
          @click="previousYears"
        >
          &lt;
        </button>
        <button 
          class="h-2/5 py-1 px-4 bg-secondary rounded-lg text-ctext cursor-pointer"
          @click="nextYears"
          :disabled="startYearOffset === 0"
        >
          &gt;
        </button>
      </div>
    </div>

    <!-- Aperçu annuel -->
    <div class="mt-8">
      <h3 class="text-lg font-semibold mb-4 text-ctext-light">
        Aperçu de l'année {{ props.selectedDate.getFullYear() }}
      </h3>
      
      <!-- Grille des mois -->
      <div class="grid grid-cols-4 gap-4">
        <div 
          v-for="monthData in monthlyStats" 
          :key="monthData.month"
          class="border border-primary shadow-xs p-4 rounded-lg"
        >
          <h4 class="font-medium text-ctext">{{ monthData.name }}</h4>
          <p class="mt-2 text-md font-bold" :class="monthData.appointmentsCount > 0 ? 'text-accent' : 'text-ctext-secondary'">
            {{ monthData.appointmentsCount }} rendez-vous
          </p>
        </div>
      </div>
    </div>
  </div>
</template>