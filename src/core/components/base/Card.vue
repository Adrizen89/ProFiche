<template>

    <article class="w-full h-50 bg-white rounded-lg flex flex-col justify-center items-center shadow-lg border border-primary cursor-pointer hover:bg-secondary transition-all duration-300 transform hover:scale-105" @click="goToContact">

        <div class="flex gap-3 justify-center items-center">
            <div class="bg-secondary text-3xl text-center rounded p-3">📁</div>

            <div class="card-content flex flex-col gap-1">
                <p class="text-ctext font-bold text-lg">{{ contact.firstname }} {{ contact.lastname }}</p>
                <p class="text-ctext-secondary">📞 {{ contact.telephone }}</p>
                <p class="text-ctext-secondary">🏠 {{ contact.address }} - {{ contact.codePostal }}, {{ contact.city }}</p>
                <p class="text-ctext-secondary">📅 {{ contact.date_rdv }} - ⏰ {{ contact.hour_rdv }}</p>
                <div class="tags flex gap-3 my-1">
                    <p class="bg-primary text-ctext rounded-2xl text-xs font-semibold py-1 px-2">Fenêtres</p>
                    <p class="bg-primary text-ctext rounded-2xl text-xs font-semibold py-1 px-2">Porte de garage</p>
                </div>
            </div>
            
        </div>

    </article>

</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({ contact: Object });

const goToContact = () => {
  if (!props.contact?.id) return;
  router.push({ name: 'ficheInProgressDetails', params: { id: props.contact.id } });
};
</script>
