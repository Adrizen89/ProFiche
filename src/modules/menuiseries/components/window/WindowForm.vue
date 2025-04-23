<template>
  <div class="flex flex-col gap-3">
    <h2 class="text-ctext font-bold text-lg">Fenêtres :</h2>

    <!-- Matériau -->
    <BaseSelect label="Choisissez un matériau" v-model="modelValue.material" :options="selectMaterials" />

    <!-- Couleur selon matériau -->
    <div v-if="modelValue.material">
      <label class="text-sm font-medium text-ctext">Couleur :</label>
      <select v-model="modelValue.color" class="appearance-none p-2 border border-primary w-full rounded bg-secondary text-ctext focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer">
        <option v-for="color in availableColors" :key="color" :value="color">
          {{ color }}
        </option>
      </select>
    </div>

    <!-- Pièce -->
    <BaseSelect label="Choisissez la pièce" v-model="modelValue.room" :options="selectPieces" />

    <!-- Type de fenêtre -->
    <BaseSelect label="Choisissez un type de fenêtre" v-model="modelValue.windowType" :options="selectTypesFenetres" />

    <!-- Type de pose -->
    <BaseSelect label="Choisissez le type de pose" v-model="modelValue.installationType" :options="selectTypesPoses" />

    <!-- Habillage Intérieur -->
    <div class="flex gap-3 items-center">
      <p class="text-ctext font-bold text-sm w-1/6">Habillage Intérieur :</p>
      <BaseRadio v-model="modelValue.intTrim" label="Oui" value="yes" />
      <BaseRadio v-model="modelValue.intTrim" label="Non" value="no" />
    </div>

    <!-- Habillage Extérieur -->
    <div class="flex gap-3 items-center">
      <p class="text-ctext font-bold text-sm w-1/6">Habillage Extérieur :</p>
      <BaseRadio v-model="modelValue.extTrim" label="Oui" value="yes" />
      <BaseRadio v-model="modelValue.extTrim" label="Non" value="no" />
    </div>

    <!-- Grille ventilation -->
    <div class="flex gap-3 items-center">
      <p class="text-ctext font-bold text-sm w-1/6">Grille ventilation :</p>
      <BaseRadio v-model="modelValue.ventilation" label="Oui" value="yes" />
      <BaseRadio v-model="modelValue.ventilation" label="Non" value="no" />
    </div>

    <!-- Dimensions -->
    <div class="flex gap-3 w-full">
      <BaseInput class="w-full" label="Hauteur" v-model="modelValue.height" type="text" placeholder="Hauteur" />
      <BaseInput class="w-full" label="Largeur" v-model="modelValue.width" type="text" placeholder="Largeur" />
      <BaseInput class="w-full" label="Profondeur" v-model="modelValue.depth" type="text" placeholder="Profondeur" />
    </div>
  </div>
</template>

<script setup>
import { defineModel, computed } from 'vue';
import BaseInput from '../../../../core/components/base/BaseInput.vue';
import BaseRadio from '../../../../core/components/base/BaseRadio.vue';
import BaseSelect from '../../../../core/components/base/BaseSelect.vue';

const modelValue = defineModel();

const selectMaterials = [
  { label: 'BOIS', value: 'wood' },
  { label: 'PVC', value: 'pvc' },
  { label: 'ALU', value: 'alu' }
];
const selectPieces = [
  { label: 'Chambre', value: 'chambre' },
  { label: 'Cuisine', value: 'cuisine' },
  { label: 'Séjour', value: 'sejour' },
  { label: 'Garage', value: 'garage' }
];
const selectTypesFenetres = [
  { label: 'Rénovation', value: 'renovation' },
  { label: 'Neuf', value: 'neuf' },
  { label: 'Feuillure', value: 'feuillure' }
];
const selectTypesPoses = [
  { label: 'Rénovation', value: 'renovation' },
  { label: 'Neuf', value: 'neuf' },
  { label: 'Feuillure', value: 'feuillure' }
];

const colorsPVC = ['Blanc', 'Beige', 'Gris'];
const colorsBOIS = ['Chêne Clair', 'Chêne Foncé', 'Gris'];
const colorsALU = ['Blanc', 'Beige', 'Gris'];

const availableColors = computed(() => {
  const value = modelValue.material;
  if (value === 'wood') return colorsBOIS;
  if (value === 'pvc') return colorsPVC;
  if (value === 'alu') return colorsALU;
  return [];
});
</script>
