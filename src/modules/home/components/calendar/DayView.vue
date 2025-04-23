<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import Card from '../../../../core/components/base/Card.vue';

const mockAppointments = ref([
{ 
    id: 1, 
    firstname: "Jean",
    lastname: "Dupont",
    cp: "75000",
    city: "Paris",
    tel: "06 12 34 56 78",
    date: new Date(2025, 2, 20),
    date_rdv: "01/01/2025",
    hour_rdv: "10:00",
    address: "123 rue des Lilas",
    email: "jean@example.com",
    type: "Fenêtre"
  },
  { 
    id: 2, 
    firstname: "John",
    lastname: "Doe",
    cp: "75000",
    city: "Paris",
    tel: "06 12 34 56 78",
    date: new Date(2025, 2, 20),
    date_rdv: "01/01/2025",
    hour_rdv: "10:00",
    address: "123 rue des Lilas",
    email: "jean@example.com",
    type: "Fenêtre"
  },
  { 
    id: 3, 
    firstname: "Adrien",
    lastname: "Berardf",
    cp: "75000",
    city: "Paris",
    tel: "06 12 34 56 78",
    date: new Date(2025, 2, 20),
    date_rdv: "01/01/2025",
    hour_rdv: "10:00",
    address: "123 rue des Lilas",
    email: "jean@example.com",
    type: "Fenêtre"
  },
]);

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

// Paramètres d'affichage et de navigation
const visibleDays = ref(12);
const startDate = ref(new Date()); // Date de référence pour l'affichage
const selectedIndex = ref(null);

// Initialiser l'affichage au montage du composant
onMounted(() => {
  // Calculer la date de départ pour que la date sélectionnée soit visible
  const today = new Date();
  startDate.value = new Date(today);
  startDate.value.setDate(today.getDate() - 4); // Positionner pour que la date actuelle soit visible
});

// Calculer les jours à afficher
const daysToShow = computed(() => {
  const result = [];
  const baseDate = new Date(startDate.value);
  
  for (let i = 0; i < visibleDays.value; i++) {
    const day = new Date(baseDate);
    day.setDate(baseDate.getDate() + i);
    
    result.push({
      date: day,
      dayName: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'][day.getDay()],
      dayNumber: day.getDate(),
      isSelected: selectedIndex.value === i || 
                  (selectedIndex.value === null && day.toDateString() === props.selectedDate.toDateString())
    });
  }
  return result;
});

// Sélectionner un jour
const emit = defineEmits(['day-selected']);
const selectDay = (day, index) => {
  selectedIndex.value = index;
  emit('day-selected', day.date);
};

// Navigation sans impact sur la sélection
const previousDays = () => {
  const newDate = new Date(startDate.value);
  newDate.setDate(newDate.getDate() - visibleDays.value);
  startDate.value = newDate;
  selectedIndex.value = null; // Réinitialiser l'index de sélection
};

const nextDays = () => {
  const newDate = new Date(startDate.value);
  newDate.setDate(newDate.getDate() + visibleDays.value);
  startDate.value = newDate;
  selectedIndex.value = null; // Réinitialiser l'index de sélection
};

// Filtrer les RDV du jour sélectionné
const selectedDayAppointments = computed(() => {
  return mockAppointments.value.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate.toDateString() === props.selectedDate.toDateString();
  });
});
</script>

<template>
  <div>
    <!-- Slider des jours -->
    <div class="w-full mt-5 flex gap-3">
      <!-- Jours affichés -->
      <div 
        v-for="(day, index) in daysToShow" 
        :key="`day-${index}`"
        :class="[
          'w-1/12 shadow-sm rounded-lg flex flex-col justify-center items-center py-5 cursor-pointer',
          day.isSelected ? 'bg-white border border-ctext' : 'bg-secondary'
        ]"
        @click="selectDay(day, index)"
      >
        <p class="text-ctext text-sm font-semibold">{{ day.dayName }}</p>
        <p class="text-ctext font-bold text-2xl">{{ day.dayNumber }}</p>
      </div>

      <!-- Boutons de navigation -->
      <div class="flex flex-col justify-between">
        <button 
          class="h-2/5 py-1 px-4 bg-secondary rounded-lg text-ctext cursor-pointer"
          @click="previousDays"
        >
          &lt;
        </button>
        <button 
          class="h-2/5 py-1 px-4 bg-secondary rounded-lg text-ctext cursor-pointer"
          @click="nextDays"
        >
          &gt;
        </button>
      </div>
    </div>

    <!-- Aucun rendez-vous -->
    <div v-if="selectedDayAppointments.length === 0" class="text-center py-10 text-gray-500">
      Aucun rendez-vous pour cette journée
    </div>

    <!-- Liste des rendez-vous du jour -->
    <div v-else class="mt-8">
      <h3 class="text-lg font-semibold mb-4">Rendez-vous du jour</h3>
      <div class="grid grid-cols-3 gap-5 px-5 w-full">
        <Card 
          v-for="appointment in selectedDayAppointments"
            :key="appointment.id"
            :contact="appointment"
        >
          
      </Card>
    </div>
    </div>
  </div>
</template>