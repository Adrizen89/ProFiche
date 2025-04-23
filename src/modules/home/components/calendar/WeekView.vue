<script setup>
import { ref, computed, watch, onMounted } from 'vue';

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

// Configuration d'affichage
const visibleWeeks = ref(3);
const startWeekOffset = ref(0);
const selectedWeekIndex = ref(null);

// Noms des jours
const dayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const dayNamesShort = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

// Obtenir le lundi d'une semaine
const getMondayOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

// Semaines à afficher
const weeksToShow = computed(() => {
  const result = [];
  const baseMonday = getMondayOfWeek(new Date());
  
  for (let i = 0; i < visibleWeeks.value; i++) {
    const weekStart = new Date(baseMonday);
    weekStart.setDate(weekStart.getDate() + (i + startWeekOffset.value) * 7);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    // Compter les rendez-vous
    const weekAppointments = props.appointments.filter(appt => {
      const apptDate = new Date(appt.date);
      return apptDate >= weekStart && apptDate <= weekEnd;
    });
    
    // Déterminer si sélectionnée
    const isSelected = selectedWeekIndex.value === i || 
                      (selectedWeekIndex.value === null && 
                       getMondayOfWeek(props.selectedDate).toDateString() === weekStart.toDateString());
    
    result.push({
      start: weekStart,
      end: weekEnd,
      weekNumber: getWeekNumber(weekStart),
      appointmentsCount: weekAppointments.length,
      isSelected
    });
  }
  
  return result;
});

// Obtenir le numéro de semaine
function getWeekNumber(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

// Navigation
const previousWeeks = () => {
  startWeekOffset.value -= visibleWeeks.value;
  selectedWeekIndex.value = null;
};

const nextWeeks = () => {
  startWeekOffset.value += visibleWeeks.value;
  selectedWeekIndex.value = null;
};

// Sélection d'une semaine
const emit = defineEmits(['week-selected', 'day-selected']);
const selectWeek = (week, index) => {
  selectedWeekIndex.value = index;
  emit('week-selected', week.start);
};

// Jours de la semaine sélectionnée
const weekDays = computed(() => {
  const days = [];
  const monday = getMondayOfWeek(props.selectedDate);
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(date.getDate() + i);
    
    // Compter les rendez-vous pour ce jour
    const appointmentsCount = getAppointmentsForDay(date).length;
    
    // Vérifier si c'est aujourd'hui
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    days.push({
      date,
      dayName: dayNames[i],
      dayShort: dayNamesShort[i],
      dayNumber: date.getDate(),
      monthName: date.toLocaleString('fr', { month: 'short' }),
      appointmentsCount,
      isToday
    });
  }
  
  return days;
});

// Obtenir les rendez-vous pour un jour
const getAppointmentsForDay = (date) => {
  return props.appointments.filter(appt => {
    const apptDate = new Date(appt.date);
    return apptDate.toDateString() === date.toDateString();
  });
};

// Sélectionner un jour spécifique
const selectDay = (day) => {
  emit('day-selected', day.date);
};
</script>

<template>
  <div>
    <!-- Slider des semaines -->
    <div class="w-full mt-5 flex gap-3">
      <div 
        v-for="(week, index) in weeksToShow" 
        :key="`week-${index}`"
        :class="[
          'w-1/3 shadow-sm rounded-lg flex flex-col justify-center items-center py-5 cursor-pointer',
          week.isSelected ? 'bg-white border border-ctext' : 'bg-secondary'
        ]"
        @click="selectWeek(week, index)"
      >
        <p class="text-ctext text-sm font-semibold">Semaine {{ week.weekNumber }}</p>
        <p class="text-ctext font-bold text-xl">
          {{ week.start.getDate() }} {{ week.start.toLocaleString('fr', { month: 'short' }) }} - 
          {{ week.end.getDate() }} {{ week.end.toLocaleString('fr', { month: 'short' }) }}
        </p>
        <div class="mt-2 text-sm text-gray-600">
          {{ week.appointmentsCount }} rendez-vous
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex flex-col justify-between">
        <button 
          class="h-2/5 py-1 px-4 bg-secondary rounded-lg text-ctext cursor-pointer"
          @click="previousWeeks"
        >
          &lt;
        </button>
        <button 
          class="h-2/5 py-1 px-4 bg-secondary rounded-lg text-ctext cursor-pointer"
          @click="nextWeeks"
        >
          &gt;
        </button>
      </div>
    </div>

    <!-- Calendrier de la semaine sélectionnée -->
    <div class="mt-8 text-ctext">
      <h3 class="text-lg font-semibold mb-4">
        Semaine {{ getWeekNumber(getMondayOfWeek(props.selectedDate)) }}
        ({{ getMondayOfWeek(props.selectedDate).getDate() }} 
        {{ getMondayOfWeek(props.selectedDate).toLocaleString('fr', { month: 'short' }) }} - 
        {{ new Date(getMondayOfWeek(props.selectedDate).getTime() + 6 * 24 * 60 * 60 * 1000).getDate() }}
        {{ new Date(getMondayOfWeek(props.selectedDate).getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleString('fr', { month: 'short' }) }})
      </h3>
      
      <!-- Grille des jours de la semaine -->
      <div class="grid grid-cols-7 gap-1">
        <!-- En-têtes des jours -->
        <div v-for="day in weekDays" 
             :key="day.date.toISOString()" 
             class="text-center font-medium py-2 border border-primary shadow-xs">
             
          <div>{{ day.dayShort }}</div>
          <div class="font-bold" :class="{ 'text-accent': day.isToday }">
            {{ day.dayNumber }}
          </div>
        </div>
        
        <!-- Contenu des jours -->
        <div v-for="day in weekDays" 
             :key="`content-${day.date.toISOString()}`"
             class="h-32 p-2 border border-primary text-sm cursor-pointer overflow-auto"
             @click="selectDay(day)">
          
          <!-- Indicateur de nombre de rendez-vous -->
          <div v-if="day.appointmentsCount > 0" class="flex justify-end">
            <span class="h-5 w-5 rounded-full bg-accent text-white flex items-center justify-center text-xs">
              {{ day.appointmentsCount }}
            </span>
          </div>
          
          <!-- Aperçu des rendez-vous -->
          <div v-if="day.appointmentsCount > 0" class="mt-1 space-y-1">
            <div v-for="(appt, index) in getAppointmentsForDay(day.date).slice(0, 3)" 
                :key="index"
                class="bg-primary text-xs p-1 rounded truncate text-ctext">
              {{ appt.clientName || 'RDV' }}
              <span class="text-gray-100">{{ appt.time || '' }}</span>
            </div>
            <div v-if="day.appointmentsCount > 3" class="text-xs text-gray-500">
              +{{ day.appointmentsCount - 3 }} autres
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>