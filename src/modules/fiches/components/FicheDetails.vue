<template>

    <section class="flex flex-col gap-10 w-full rounded min-h-screen mx-auto">
    
        <!-- Affichage Card de la fiche sélectionnée -->
        <article class="flex flex-col bg-white border border-primary pt-10 pb-10 mt-10 text-ctext rounded-lg shadow-lg w-2/3 items-center gap-10 mx-auto justify-evenly">
    
            <div class="flex gap-10 w-5/6 items-center">
                <p class="p-3 text-5xl bg-primary rounded-md">📁</p>
    
                <div class="card-content flex flex-col gap-1">
                    <p class="text-ctext font-bold text-lg">{{ contact.firstname }} {{ contact.lastname }}</p>
                    <p class="text-sm text-ctext-secondary font-light">Maison, Propriétaire</p>
                </div>

                <div class="w-2/4 flex gap-3 justify-end">
                    <button class="border border-primary rounded-full p-2 bg-primary text-ctext text-sm shadow-sm cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <!-- Flèche sortante -->
                        <path d="M12 5l-3 3m3-3l3 3m-3-3v9" />
                        <!-- Document/boîte -->
                        <rect x="5" y="14" width="14" height="5" rx="1" />
                        </svg>
                    </button>
                    <button class="border border-primary rounded-full p-2 bg-primary text-ctext text-sm shadow-sm cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <!-- Crayon -->
                        <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="flex flex-col gap-10 w-5/6">
                
                <!-- Origin contact div -->
                <div class="flex items-center gap-10 border-b border-primary pb-5">
                    <p class="text-ctext-secondary text-sm">Origine du contact :</p>
                    <p class="font-semibold text-ctext text-md">{{ contact.origin_contact }}</p>
                </div>

                <!-- Tel et Adresse div -->
                <div class="flex justify-between border-b border-primary pb-5">
                    <div class="w-1/2 flex flex-col gap-2">
                        <p class="text-ctext-secondary text-sm">📞 Téléphone :</p>
                        <p class="font-semibold text-ctext text-md">{{ contact.telephone }}</p>
                    </div>

                    <div class="w-1/2 flex flex-col gap-2">
                        <p class="text-ctext-secondary text-sm">🏠 Adresse :</p>
                        <p class="font-semibold text-ctext text-md">{{ contact.address }} - {{ contact.codePostal }}, {{ contact.city }}</p>
                    </div>
                </div>

                <!-- Date et Heure div -->
                <div class="flex justify-between border-b border-primary pb-5">

                    <div class="w-1/2 flex flex-col gap-2">
                        <p class="text-ctext-secondary text-sm">📅 Date du rendez-vous :</p>
                        <p class="font-semibold text-ctext text-md">01/01/2025</p>
                    </div>
                    <div class="w-1/2 flex flex-col gap-2">
                        <p class="text-ctext-secondary text-sm">⏰ Heure du rendez-vous :</p>
                        <p class="font-semibold text-ctext text-md">10:00</p>
                    </div>
                </div>

                <!-- Travaux prévus div -->
                <div class="flex flex-col gap-5">
                    <p class="text-ctext-secondary text-sm">🎯 Travaux prévus :</p>
                    <div class="flex gap-10 border-b border-primary pb-5">
                        <p class="font-semibold text-ctext text-md w-1/6 text-center">2</p>
                        <p class="font-semibold text-ctext text-md w-1/6">Fenêtres</p>
                        <p class="font-semibold text-ctext text-md w-1/6">PVC</p>
                    </div>
                    <div class="flex gap-10 border-b border-primary pb-5">
                        <p class="font-semibold text-ctext text-md w-1/6 text-center">21</p>
                        <p class="font-semibold text-ctext text-md w-1/6">Portes</p>
                        <p class="font-semibold text-ctext text-md w-1/6">PVC</p>
                    </div>
                    <div class="flex gap-10 border-b border-primary pb-5">
                        <p class="font-semibold text-ctext text-md w-1/6 text-center">1</p>
                        <p class="font-semibold text-ctext text-md w-1/6">Clôture</p>
                        <p class="font-semibold text-ctext text-md w-1/6">PVC</p>
                    </div>
                </div>

                <!-- Détails des travaux -->
                <div class="w-full rounded-lg bg-white border border-primary p-5 shadow-xs">

                    <BaseDetailsCard />

                </div>

            </div>
           
    
        </article>

    
    </section>
    
    </template>
    
    <script setup>
        import BaseDetailsCard from '../../../core/components/base/BaseDetailsCard.vue';
        import { getFicheById } from '../../../services/ficheService';
        import { useRoute } from 'vue-router';
        import { ref, onMounted } from 'vue';

        const route = useRoute();
        const contact = ref({});

        onMounted(async () => {
        const id = route.params.id;
        if (id) {
            const fiche = await getFicheById(id);
            contact.value = fiche;
        }
        });
    </script>