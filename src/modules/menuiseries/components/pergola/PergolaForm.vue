<template>

    <div class="flex flex-col gap-3">
        <h2 class="text-ctext font-bold text-lg">Pergola :</h2>

    <!-- Materiaux -->
    <BaseSelect label="Choisissez un matériau" v-model="modelValue.selectedMaterial" :options="selectMaterials" />

    <!-- Choix de la couleur selon matériau choisi -->
    <div v-if="selectedMaterial">
      <label class="text-sm font-medium text-ctext">Couleur :</label>
      <select v-model="modelValue.material" class="appearance-none p-2 border border-primary w-full rounded bg-secondary text-ctext focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer">
        <option v-for="color in availableColors" :key="color" :value="color">
          {{ color }}
        </option>
      </select>
    </div>

    <!-- Type de pose -->
    <BaseSelect label="Choisissez le type de pose" v-model="modelValue.selectedTypesPose" :options="selectTypesPoses" />

    <!-- Choix du tirant -->
    <BaseSelect label="Choisissez le tirant" v-model="modelValue.selectedTirant" :options="selectTirants" />

    <!-- Hauteur, Largeur, Longueur -->
     <div class="flex gap-3 w-full">
        <BaseInput class="w-full" label="Hauteur" v-model="modelValue.hauteur" type="text" placeholder="Hauteur"/>
        <BaseInput class="w-full" label="Largeur" v-model="modelValue.largeur" type="text" placeholder="Largeur"/>
        <BaseInput class="w-full" label="Longueur" v-model="modelValue.longueur" type="text" placeholder="Longueur"/>
     </div>


     <!-- Commentaires -->


    </div>
    
</template>

<script setup>
import { defineModel } from 'vue';
import { computed } from 'vue';

import BaseInput from "../../../../core/components/base/BaseInput.vue";
import BaseRadio from "../../../../core/components/base/BaseRadio.vue";
import BaseSelect from "../../../../core/components/base/BaseSelect.vue";

const modelValue = defineModel();


const selectMaterials = [
  { label: 'BOIS', value: 'wood' },
  { label: 'PVC', value: 'pvc' },
  { label: 'ALU', value: 'alu' }
];
const selectTypesPoses = [
  { label: 'Rénovation', value: 'renovation' },
  { label: 'Neuf', value: 'neuf' },
  { label: 'Feuillure', value: 'feuillure' }
];
const selectTirants = [
  { label: 'Gauche', value: 'left' },
  { label: 'Droit', value: 'right' }
];

// Couleurs matériaux
const colorsPVC = ["Blanc", "Beige", "Gris"];
const colorsBOIS = ["Chêne Clair", "Chêne Foncé", "Gris"];
const colorsALU = ["Blanc", "Beige", "Gris"];

const availableColors = computed(() => {
  const value = modelValue.material;
  if (value === 'wood') return colorsBOIS;
  if (value === 'pvc') return colorsPVC;
  if (value === 'alu') return colorsALU;
  return [];
});

</script>