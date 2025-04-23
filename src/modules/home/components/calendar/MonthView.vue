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
const currentYear = ref(props.selectedDate.getFullYear());
const visibleMonths = ref(6);
const startMonthOffset = ref(0);

// Noms des mois
const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

// Calcul des mois à afficher
const monthsToShow = computed(() => {
  const result = [];
  
  for (let i = 0; i < visibleMonths.value; i++) {
    const monthIndex = (i + startMonthOffset.value) % 12;
    const yearOffset = Math.floor((i + startMonthOffset.value) / 12);
    const year = currentYear.value + yearOffset;
    
    // Créer une date pour le 1er du mois
    const monthDate = new Date(year, monthIndex, 1);
    
    // Compter les rendez-vous pour ce mois
    const appointmentsCount = props.appointments.filter(appt => {
      const apptDate = new Date(appt.date);
      return apptDate.getMonth() === monthIndex && apptDate.getFullYear() === year;
    }).length;
    
    result.push({
      date: monthDate,
      name: monthNames[monthIndex],
      year: year,
      appointmentsCount,
      isSelected: monthIndex === props.selectedDate.getMonth() && year === props.selectedDate.getFullYear()
    });
  }
  
  return result;
});

// Navigation entre les mois
const previousMonths = () => {
  startMonthOffset.value = Math.max(0, startMonthOffset.value - visibleMonths.value);
};

const nextMonths = () => {
  startMonthOffset.value += visibleMonths.value;
};

// Sélection d'un mois
const emit = defineEmits(['month-selected']);
const selectMonth = (month) => {
  emit('month-selected', month.date);
};

// Générer les jours du mois sélectionné
const calendarDays = computed(() => {
  const year = props.selectedDate.getFullYear();
  const month = props.selectedDate.getMonth();
  
  // Premier jour du mois
  const firstDay = new Date(year, month, 1);
  // Dernier jour du mois
  const lastDay = new Date(year, month + 1, 0);
  
  // Jour de la semaine du premier jour (0 = dimanche, 1 = lundi, etc.)
  let firstDayOfWeek = firstDay.getDay();
  // Convertir en format lundi=0, dimanche=6
  firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  
  const days = [];
  
  // Jours du mois précédent pour compléter la première semaine
  const prevMonth = new Date(year, month, 0);
  const prevMonthDays = prevMonth.getDate();
  
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({
      date: new Date(year, month - 1, prevMonthDays - firstDayOfWeek + i + 1),
      isCurrentMonth: false,
      isToday: false
    });
  }
  
  // Jours du mois actuel
  const today = new Date();
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i);
    days.push({
      date,
      isCurrentMonth: true,
      isToday: date.toDateString() === today.toDateString(),
      appointmentsCount: getAppointmentsForDay(date).length
    });
  }
  
  // Jours du mois suivant pour compléter la dernière semaine
  const remainingDays = 7 - (days.length % 7);
  if (remainingDays < 7) {
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isToday: false
      });
    }
  }
  
  return days;
});

// Obtenir les rendez-vous pour un jour spécifique
const getAppointmentsForDay = (date) => {
  return props.appointments.filter(appt => {
    const apptDate = new Date(appt.date);
    return apptDate.toDateString() === date.toDateString();
  });
};

// Sélectionner un jour spécifique
const selectDay = (day) => {
  if (day.isCurrentMonth) {
    emit('day-selected', day.date);
  }
};
</script>

<template>
    <div>
      <!-- Slider des mois -->
      <div class="w-full mt-5 flex gap-3">
        <div 
          v-for="month in monthsToShow" 
          :key="`${month.year}-${month.date.getMonth()}`"
          :class="[
            'w-1/6 shadow-sm rounded-lg flex flex-col justify-center items-center py-5 cursor-pointer',
            month.isSelected ? 'bg-white border border-ctext' : 'bg-secondary'
          ]"
          @click="selectMonth(month)"
        >
          <p class="text-ctext text-sm font-semibold">{{ month.name }}</p>
          <p class="text-ctext font-bold text-xl">{{ month.year }}</p>
          <div class="mt-2 text-sm text-gray-600">
            {{ month.appointmentsCount }} rendez-vous
          </div>
        </div>
  
        <!-- Boutons de navigation -->
        <div class="flex flex-col justify-between">
          <button 
            class="h-2/5 py-1 px-4 bg-secondary rounded-lg text-ctext cursor-pointer"
            @click="previousMonths"
            :disabled="startMonthOffset === 0"
          >
            &lt;
          </button>
          <button 
            class="h-2/5 py-1 px-4 bg-secondary rounded-lg text-ctext cursor-pointer"
            @click="nextMonths"
          >
            &gt;
          </button>
        </div>
      </div>
  
      <!-- Calendrier du mois sélectionné -->
      <div class="mt-8 text-ctext">
        <h3 class="text-lg font-semibold mb-4">
          {{ monthNames[props.selectedDate.getMonth()] }} {{ props.selectedDate.getFullYear() }}
        </h3>
        
         <!-- Grille du calendrier -->
  <div class="grid grid-cols-7 gap-1">
    <!-- Jours de la semaine -->
    <div v-for="day in ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']" 
         :key="day" 
         class="text-center font-medium py-2 border border-primary shadow-xs">
      {{ day }}
    </div>
    
    <!-- Jours du mois -->
    <div 
      v-for="day in calendarDays" 
      :key="day.date.toISOString()"
      :class="[
        'h-24 p-2 border text-sm cursor-pointer',
        day.isCurrentMonth ? 'bg-secondary' : 'bg-gray-100 text-gray-400',
        day.isToday ? 'border-accent border-2' : 'border-primary',
      ]"
      @click="selectDay(day)"
    >
      <div class="flex justify-between">
        <span>{{ day.date.getDate() }}</span>
        <span v-if="day.appointmentsCount > 0" class="h-5 w-5 rounded-full bg-accent text-white flex items-center justify-center text-xs">
          {{ day.appointmentsCount }}
        </span>
      </div>
      
      <!-- Aperçu des rendez-vous (optionnel) -->
      <div v-if="day.isCurrentMonth && day.appointmentsCount > 0" class="mt-1 space-y-1 overflow-hidden">
        <div v-for="(appt, index) in getAppointmentsForDay(day.date).slice(0, 2)" 
             :key="index"
             class="bg-primary text-xs p-1 rounded truncate">
          {{ appt.clientName || 'RDV' }}
        </div>
        <div v-if="day.appointmentsCount > 2" class="text-xs text-gray-500">
          +{{ day.appointmentsCount - 2 }} autres
        </div>
      </div>
</div>
</div>
</div>
    </div>
  </template>