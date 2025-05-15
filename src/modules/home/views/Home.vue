<script setup>
import { ref, onMounted } from 'vue'
import Card from "../../../core/components/base/Card.vue";
import DayView from '../components/calendar/DayView.vue';
import WeekView from '../components/calendar/WeekView.vue';
import MonthView from '../components/calendar/MonthView.vue';
import YearView from '../components/calendar/YearView.vue';
import { getAllFiches } from '../../../services/ficheService';

const activeView = ref('day')
const selectedDate = ref(new Date())
const appointments = ref([])

const setView = (view) => {
  activeView.value = view
}

const selectedDayIndex = ref(null);
const handleDaySelected = (date, index) => {
  selectedDate.value = date;
  selectedDayIndex.value = index;
};
const handleWeekSelected = (date) => selectedDate.value = date
const handleMonthSelected = (date) => selectedDate.value = date
const handleYearSelected = (date) => selectedDate.value = date

onMounted(async () => {
  try {
    const fiches = await getAllFiches();
    appointments.value = fiches
      .filter(fiche => fiche.date_rdv && fiche.heure_rdv)
      .map(fiche => {
        return {
          ...fiche,
          date: new Date(fiche.date_rdv),
          code_postal: fiche.code_postal
        };
      });
  } catch (err) {
    console.error("Erreur de chargement des rendez-vous :", err);
  }
});
</script>

<template>
  <section class="flex flex-col w-full rounded min-h-screen bg-white mx-auto px-4 sm:px-10 py-10">

    <h1 class="text-ctext font-bold text-2xl text-center py-5">Accueil - Fiche Contact</h1>

    <div class="border-b border-primary pb-10">
      <h2 class="text-ctext font-bold text-lg border-t border-primary py-3">Vue général</h2>

      <div class="w-full rounded-2xl bg-secondary flex flex-col sm:flex-row justify-between gap-2 p-2">
  <p class="text-ctext font-medium pl-2">{{ activeView === 'day' ? 'Semaine 12' : activeView === 'week' ? 'Semaine 12' : activeView === 'month' ? 'Mars' : '2025' }}</p>
  <div class="flex gap-2 flex-wrap justify-center">
    <button
      v-for="view in ['day', 'week', 'month', 'year']"
      :key="view"
      @click="setView(view)"
      :class="[
        'text-sm border rounded-full px-3 py-1 cursor-pointer',
        activeView === view ? 'bg-accent text-white border-white' : 'bg-white text-ctext border-white'
      ]"
    >{{ view.charAt(0).toUpperCase() + view.slice(1) }}</button>
  </div>
</div>


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
