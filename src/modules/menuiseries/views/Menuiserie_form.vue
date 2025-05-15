<template>
  <div>
    <div class="flex border-b border-primary rounded-t-lg overflow-hidden items-center" ref="tabsContainerRef">
      <button 
        v-if="filteredTabs.length > visibleTabsCount"
        @click="scrollTabsLeft" 
        :disabled="!canScrollLeft"
        class="px-2 focus:outline-none transition-colors duration-200 flex-shrink-0"
        :class="canScrollLeft ? 'text-gray-700 hover:text-gray-900' : 'text-gray-300'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>

      <div class="flex flex-grow overflow-hidden gap-2">
  <div
    v-for="(tab, localIndex) in visibleTabs"
    :key="startTabIndex + localIndex"
    class="relative"
  >
    <!-- Onglet principal -->
    <button
      @click="setActiveTab(startTabIndex + localIndex)"
      :class="[
        'py-3 text-sm font-medium focus:outline-none transition-colors duration-200 whitespace-nowrap text-center flex-shrink-0',
        activeTab === startTabIndex + localIndex 
          ? 'bg-primary text-ctext border-t-2 border-l-2 border-r-2 border-primary inset-shadow-2xs rounded-t-lg -mb-px'
          : 'text-gray-500 hover:text-gray-700'
      ]"
      :style="`width: ${tabWidth}px;`"
    >
      {{ tab.label }}
    </button>

    <!-- Bouton poubelle -->
    <button
      @click.stop="deleteTab(tab.key)"
      class="absolute -top-2 -right-2 bg-white text-red-500 hover:text-red-700 p-1 rounded-full shadow"
      title="Supprimer l'onglet"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
           viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</div>


      <button 
        v-if="filteredTabs.length > visibleTabsCount"
        @click="scrollTabsRight" 
        :disabled="!canScrollRight"
        class="px-2 focus:outline-none transition-colors duration-200 flex-shrink-0"
        :class="canScrollRight ? 'text-gray-700 hover:text-gray-900' : 'text-gray-300'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>

      <button 
        @click="toggleAdd" 
        class="text-xl text-primary bg-white font-bold px-3 hover:text-secondary"
      >
        +
      </button>
    </div>

    <div v-if="showAdd" class="flex items-center justify-start gap-3 px-3 py-4 text-ctext border border-primary mt-2 rounded-lg">
      <select v-model="selectedNewMenuiserie" class="border p-2 rounded w-64">
        <option value="">-- Sélectionner une menuiserie --</option>
        <option 
          v-for="menuiserie in menuiseriesDispo" 
          :key="menuiserie" 
          :value="menuiserie"
        >
          {{ formatLabel(menuiserie) }}
        </option>
      </select>

      <button @click="addMenuiserie" class="bg-accent text-white px-4 py-2 rounded cursor-pointer transition">Ajouter</button>
      <button @click="toggleAdd" class="text-red-500 text-lg font-bold cursor-pointer hover:text-red-700">✖</button>
    </div>

    <!-- Contenu de l'onglet sélectionné -->
    <div class="bg-white p-4 rounded-lg">
      <div class="flex justify-start items-center gap-5">
        <label class="text-ctext">Nombre :</label>
        <BaseInput
        type="number"
        class="w-1/4"
        v-model="menuiserieCounts[visibleTabs[activeTab - startTabIndex]?.key]"
        :min="1"
        placeholder="0"
      />
  </div>

  <div
  v-for="(item, index) in menuiserieData[activeKey] || []"
  :key="`${item.type}-${item.id}`"
  class="relative"
>
  <div class="absolute right-0 top-0">
    <BaseButton
      variant="danger"
      size="sm"
      @click="confirmDeleteForm(item.type, index)"
    >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
         viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"/>
    </svg>
    </BaseButton>
  </div>

  <component
    :is="visibleTabs[activeTab - startTabIndex]?.component"
    v-model="menuiserieData[activeKey][index]"
  />
</div>


<!-- Bouton d'ajout d'un nouveau formulaire -->
<BaseButton 
  class="mt-5" 
  variant="secondary" 
  @click="addForm(activeKey)"
>
  + Ajouter un(e) {{ formatLabel(activeKey) }}
</BaseButton>

</div>

    <BaseButton class="w-1/3 flex justify-center my-10 mx-auto" variant="primary" @click.stop="saveUpdatedPlannedWorks">
      Enregistrer les modifications
    </BaseButton>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from '../../../core/components/base/BaseButton.vue';
import BaseInput from '../../../core/components/base/BaseInput.vue';
import { updateFiche, getFicheById } from '../../../services/ficheService';

// Composants formulaires
import WindowForm from '../components/window/WindowForm.vue';
import DoorForm from '../components/doors/DoorForm.vue';
import RollingShutterForm from '../components/shutters/RollingShutterForm.vue';
import SwingShutterForm from '../components/shutters/SwingShutterForm.vue';
import ExtBlindForm from '../components/blinds/ExtBlindForm.vue';
import IntBlindForm from '../components/blinds/IntBlindForm.vue';
import GarageDoor from '../components/doors/GarageDoor.vue';
import GateForm from '../components/gate/GateForm.vue';
import FenceForm from '../components/fence/FenceForm.vue';
import PergolaForm from '../components/pergola/PergolaForm.vue';

const props = defineProps({ plannedWorks: { type: Array, required: true } });
const route = useRoute();
const ficheId = ref(route.params.id);
const activeKey = computed(() => visibleTabs.value[activeTab.value - startTabIndex.value]?.key)


// Liste des onglets
const allTabs = [
  { key: 'fenetre', label: 'Fenêtre', component: WindowForm },
  { key: 'porte_d_entree', label: "Porte d'entrée", component: DoorForm },
  { key: 'volet_roulant', label: 'Volet Roulant', component: RollingShutterForm },
  { key: 'volet_battant', label: 'Volet Battant', component: SwingShutterForm },
  { key: 'store_exterieur', label: 'Store Extérieur', component: ExtBlindForm },
  { key: 'store_interieur', label: 'Store Intérieur', component: IntBlindForm },
  { key: 'porte_garage', label: 'Porte de Garage', component: GarageDoor },
  { key: 'portail', label: 'Portail', component: GateForm },
  { key: 'cloture', label: 'Clôture', component: FenceForm },
  { key: 'pergola', label: 'Pergola', component: PergolaForm },
];

// Onglets affichés
const plannedWorks = ref([...props.plannedWorks]);
const filteredTabs = computed(() => allTabs.filter(tab => plannedWorks.value.includes(tab.key)));

// Gestion onglets
const activeTab = ref(0);
const visibleTabsCount = ref(5);
const tabWidth = 140;
const startTabIndex = ref(0);
const tabsContainerRef = ref(null);

const visibleTabs = computed(() => filteredTabs.value.slice(startTabIndex.value, startTabIndex.value + visibleTabsCount.value));
const canScrollLeft = computed(() => startTabIndex.value > 0);
const canScrollRight = computed(() => startTabIndex.value + visibleTabsCount.value < filteredTabs.value.length);

const scrollTabsLeft = () => { if (canScrollLeft.value) startTabIndex.value--; };
const scrollTabsRight = () => { if (canScrollRight.value) startTabIndex.value++; };
const ensureActiveTabVisible = () => {
  if (activeTab.value < startTabIndex.value) startTabIndex.value = activeTab.value;
  else if (activeTab.value >= startTabIndex.value + visibleTabsCount.value) startTabIndex.value = activeTab.value - visibleTabsCount.value + 1;
};
const adjustVisibleTabsCount = () => {
  if (!tabsContainerRef.value) return;
  const containerWidth = tabsContainerRef.value.clientWidth;
  const buttonsWidth = 120;
  visibleTabsCount.value = Math.max(1, Math.min(filteredTabs.value.length, Math.floor((containerWidth - buttonsWidth) / tabWidth)));
  ensureActiveTabVisible();
};
const setActiveTab = (index) => { activeTab.value = index; ensureActiveTabVisible(); };

// Ajout de menuiserie
const showAdd = ref(false);
const selectedNewMenuiserie = ref('');
const allMenuiseries = allTabs.map(t => t.key);
const menuiseriesDispo = computed(() => allMenuiseries.filter(m => !plannedWorks.value.includes(m)));

const toggleAdd = () => { showAdd.value = !showAdd.value; selectedNewMenuiserie.value = ""; };

const menuiserieCounts = ref({});
const menuiserieData = ref({});

const addMenuiserie = () => {
  const type = selectedNewMenuiserie.value;
  if (type && !plannedWorks.value.includes(type)) {
    plannedWorks.value.push(type);
    menuiserieCounts.value[type] = 1;
    menuiserieData.value[type] = [{ id: 1, type }];
    selectedNewMenuiserie.value = '';
    showAdd.value = false;
  }
};
const addForm = (type) => {
  if (!menuiserieData.value[type]) {
    menuiserieData.value[type] = [];
  }

  const nextId = menuiserieData.value[type].length + 1;
  menuiserieData.value[type].push({ id: nextId, type });
  menuiserieCounts.value[type] = menuiserieData.value[type].length;
};

const confirmDeleteForm = async (type, index) => {
  if (!confirm("Es-tu sûr de vouloir supprimer ce formulaire ?")) return;

  // Supprime localement
  menuiserieData.value[type].splice(index, 1);

  // Mets à jour le compteur
  menuiserieCounts.value[type] = menuiserieData.value[type].length;

  // Recalculer tous les détails à enregistrer
  const updatedDetails = Object.values(menuiserieData.value).flat();

  try {
    const fiche = await getFicheById(ficheId.value);
    fiche.works_details = updatedDetails;
    await updateFiche(fiche);
    console.log("Suppression enregistrée avec succès !");
  } catch (err) {
    console.error("Erreur API :", err);
    alert("La suppression n’a pas pu être enregistrée.");
  }
};

const deleteTab = async (tabKey) => {
  const confirmed = confirm(`Souhaitez-vous vraiment supprimer l'onglet "${formatLabel(tabKey)}" ?`);
  if (!confirmed) return;

  // Suppression côté front
  plannedWorks.value = plannedWorks.value.filter(work => work !== tabKey);
  delete menuiserieData.value[tabKey];
  delete menuiserieCounts.value[tabKey];

  // Suppression côté backend
  try {
    const fiche = await getFicheById(ficheId.value);

    fiche.planned_works = plannedWorks.value;
    fiche.works_details = (fiche.works_details || []).filter(detail => detail.type !== tabKey);

    await updateFiche(fiche);
    alert(`L'onglet "${formatLabel(tabKey)}" a bien été supprimé.`);
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la suppression de l'onglet.");
  }

  // Ajustement onglet actif
  if (activeTab.value >= filteredTabs.value.length) {
    activeTab.value = Math.max(0, filteredTabs.value.length - 1);
  }
};





// Regénération des formulaires selon count
watch(menuiserieCounts, (newCounts) => {
  for (const type in newCounts) {
    const count = Math.max(1, newCounts[type]);
    const existing = menuiserieData.value[type] || [];
    const updated = [...existing];

    while (updated.length < count) {
      updated.push({ id: updated.length + 1, type });
    }

    while (updated.length > count) {
      updated.pop();
    }

    menuiserieData.value[type] = updated;
  }
}, { deep: true });

const formatLabel = (key) => key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());

const saveUpdatedPlannedWorks = async () => {
  try {
    const fiche = await getFicheById(ficheId.value);
    fiche.planned_works = plannedWorks.value;
    fiche.works_details = Object.values(menuiserieData.value).flat();
    console.log(menuiserieData.value)
    await updateFiche(fiche);
    alert("Travaux enregistrés avec succès !");
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la mise à jour");
  }
};

onMounted(async() => {
  const fiche = await getFicheById(ficheId.value);

// Récupération des types à partir des works_details
const details = fiche.works_details || [];

details.forEach(item => {
  const type = item.type;
  if (!plannedWorks.value.includes(type)) {
    plannedWorks.value.push(type);
  }

  if (!menuiserieData.value[type]) {
    menuiserieData.value[type] = [];
  }

  menuiserieData.value[type].push(item);

// On met à jour le nombre après avoir tout ajouté
menuiserieCounts.value[type] = (menuiserieData.value[type] || []).length;

});

  window.addEventListener('resize', adjustVisibleTabsCount);
  adjustVisibleTabsCount();
});
onUnmounted(() => window.removeEventListener('resize', adjustVisibleTabsCount));
</script>



