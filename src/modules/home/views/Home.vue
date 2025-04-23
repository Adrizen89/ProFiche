<script setup>
import { ref } from 'vue'
import Card from "../../../core/components/base/Card.vue";
import DayView from '../components/calendar/DayView.vue';
import WeekView from '../components/calendar/WeekView.vue';
import MonthView from '../components/calendar/MonthView.vue';
import YearView from '../components/calendar/YearView.vue';

const activeView = ref('day')
const selectedDate = ref(new Date())
const appointments = ref([
  { 
    id: 1, 
    clientName: "Jean Dupont", 
    date: new Date(2025, 2, 20),
    time: "10:00",
    address: "123 rue des Lilas",
    phone: "06 12 34 56 78",
    email: "jean@example.com",
    type: "Fenêtre"
  },
  // Autres rendez-vous...
])

// Fonction pour changer de vue
const setView = (view) => {
  activeView.value = view
}

// Gestion des sélections de date

const selectedDayIndex = ref(null);

const handleDaySelected = (date, index) => {
  selectedDate.value = date;
  selectedDayIndex.value = index;
};

const handleWeekSelected = (date) => {
  selectedDate.value = date
}

const handleMonthSelected = (date) => {
  selectedDate.value = date
}

const handleYearSelected = (date) => {
  selectedDate.value = date
}

</script>

<template>

  <section class="flex flex-col w-full rounded min-h-screen bg-white mx-auto p-10">

    <h1 class="text-ctext font-bold text-2xl text-center py-5">Accueil - Fiche Contact</h1>

    <!-- Vue général -->
    <div class="border-b border-primary pb-10">
      <h2 class="text-ctext font-bold text-lg border-t border-primary py-3">Vue général</h2>

      <!-- Bar selection date -->
       <div class="w-full rounded-2xl bg-secondary flex justify-between p-2">
          <p class="text-ctext font-medium pl-2">{{ activeView == 'day' ? 'Semaine 12' : activeView == 'week' ? 'Semaine 12' : activeView == 'month' ? 'Mars' : '2025' }}</p>
          <div class="flex gap-2">
            <button @click="setView('day')"
            :class="[
              'text-sm border rounded-full px-3 py-1 cursor-pointer',
              activeView === 'day' ? 'bg-accent text-white border-white' : 'bg-white text-ctext border-white'
            ]">Jour</button>
            <button @click="setView('week')"
            :class="[
              'text-sm border rounded-full px-3 py-1 cursor-pointer',
              activeView === 'week' ? 'bg-accent text-white border-white' : 'bg-white text-ctext border-white'
            ]">Semaine</button>
            <button @click="setView('month')"
            :class="[
              'text-sm border rounded-full px-3 py-1 cursor-pointer',
              activeView === 'month' ? 'bg-accent text-white border-white' : 'bg-white text-ctext border-white'
            ]">Mois</button>
            <button @click="setView('year')"
            :class="[
              'text-sm border rounded-full px-3 py-1 cursor-pointer',
              activeView === 'year' ? 'bg-accent text-white border-white' : 'bg-white text-ctext border-white'
            ]">Année</button>
          </div>
       </div>


        <!-- Affichage conditionnel -->
        <component 
    :is="activeView === 'day' ? DayView : 
         activeView === 'week' ? WeekView : 
         activeView === 'month' ? MonthView : YearView"
    :selected-date="selectedDate"
    :appointments="appointments"
    @day-selected="handleDaySelected"
    @week-selected="handleWeekSelected"
    @month-selected="handleMonthSelected"
    @year-selected="handleYearSelected"
  />


    </div>

  </section>
  
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
