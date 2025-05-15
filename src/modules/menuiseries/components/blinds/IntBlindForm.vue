<template>

    <div class="flex flex-col gap-3">
        <h2 class="text-ctext font-bold text-lg">Stores Intérieurs :</h2>

    <!-- Type de pose -->
    <BaseSelect label="Choisissez le type de pose" v-model="modelValue.selectedTypesPose" :options="selectTypesPoses" />

    <!-- Hauteur, Largeur, Longueur -->
     <div class="flex gap-3 w-full">
        <BaseInput class="w-full" label="Avancée" v-model="modelValue.avancee" type="text" placeholder="Avancée"/>
        <BaseInput class="w-full" label="Largeur" v-model="modelValue.largeur" type="text" placeholder="Largeur"/>
        <BaseInput class="w-full" label="Allège" v-model="modelValue.allege" type="text" placeholder="Allège"/>
     </div>

    <!-- Choix de la sortie électrique -->
    <BaseSelect label="Choisissez la sortie électique" v-model="modelValue.selectedSortie" :options="selectSorties" />


     <!-- Commentaires -->


    </div>
    
</template>

<script setup>
import { defineModel } from 'vue';

import BaseInput from "../../../../core/components/base/BaseInput.vue";
import BaseSelect from "../../../../core/components/base/BaseSelect.vue";

const modelValue = defineModel();


const selectTypesPoses = [
  { label: 'Plafond', value: 'plafond' },
  { label: 'Face', value: 'face' },
];
const selectSorties = [
  { label: 'Gauche', value: 'left' },
  { label: 'Droite', value: 'right' },
];

</script>