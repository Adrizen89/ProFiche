<template>
  <section class="flex flex-col w-full rounded min-h-screen bg-white mx-auto px-4 md:px-10"> 
    <h2 class="text-ctext font-bold text-2xl text-center py-5">Fiche en cours</h2>

    <form class="flex flex-col gap-10 py-10" @submit.prevent="submitForm">
  <!-- Infos & RDV -->
  <div class="flex flex-col md:flex-row gap-10 w-full max-w-6xl mx-auto">
    <!-- Infos contact -->
    <div class="flex flex-col gap-5 md:w-1/2 w-full">
      <p class="text-ctext font-semibold text-lg">Informations du contact :</p>

      <div class="flex flex-col sm:flex-row gap-3">
        <BaseInput class="w-full sm:w-1/2" label="Prénom" v-model="firstname" placeholder="John" />
        <BaseInput class="w-full sm:w-1/2" label="Nom" v-model="lastname" placeholder="Doe" />
      </div>

      <BaseInput label="Email" v-model="email" placeholder="email@example.com" />
      <BaseInput label="Téléphone" v-model="phone" placeholder="06 12 34 56 78" />
      <BaseInput label="Adresse" v-model="address" placeholder="123 rue des Lilas" />

      <div class="flex flex-col sm:flex-row gap-3">
        <BaseInput class="w-full sm:w-1/3" label="Code Postal" v-model="codePostal" placeholder="75000" />
        <BaseInput class="w-full sm:w-2/3" label="Ville" v-model="city" placeholder="Paris" />
      </div>

      <div class="flex flex-wrap gap-3 border-b border-primary pb-2">
        <BaseRadio
          v-for="option in statutOptions"
          :key="option.value"
          v-model="statut_habitation"
          :value="option.value"
          :label="option.label"
        />
      </div>

      <div class="flex flex-wrap gap-3 border-b border-primary pb-2">
        <BaseRadio
          v-for="option in logementOptions"
          :key="option.value"
          v-model="type_logement"
          :value="option.value"
          :label="option.label"
        />
      </div>
    </div>

    <!-- Origine + RDV -->
    <div class="flex flex-col gap-5 md:w-1/2 w-full">
      <p class="text-ctext font-semibold text-lg">Origine du contact :</p>
      <div class="flex flex-wrap gap-3 border-b border-primary pb-2">
        <BaseRadio
          v-for="option in originOptions"
          :key="option.value"
          v-model="originContact"
          :value="option.value"
          :label="option.label"
        />
      </div>

      <p class="text-ctext font-semibold text-lg">Rendez-vous :</p>
      <div class="flex flex-col sm:flex-row gap-3">
        <BaseInput class="w-full sm:w-1/2" v-model="dateRdv" type="date" />
        <BaseInput class="w-full sm:w-1/2" v-model="hourRdv" type="time" />
      </div>
    </div>
  </div>

  <!-- Travaux -->
  <div class="flex flex-col gap-5 w-full max-w-6xl mx-auto">
    <p class="text-ctext font-semibold text-lg">Travaux envisagés :</p>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse min-w-[600px]">
        <thead>
          <tr class="bg-secondary text-ctext">
            <th class="p-3 text-left">Type</th>
            <th class="p-3 text-center">PVC</th>
            <th class="p-3 text-center">BOIS</th>
            <th class="p-3 text-center">ALU</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="work in workTypes" :key="work.name" class="border-b">
            <td class="p-3 text-ctext">{{ work.name }}</td>
            <td class="p-3 text-center">
              <BaseCheckbox v-model="work.materials.PVC" :value="true" />
            </td>
            <td class="p-3 text-center">
              <BaseCheckbox v-model="work.materials.BOIS" :value="true" />
            </td>
            <td class="p-3 text-center">
              <BaseCheckbox v-model="work.materials.ALU" :value="true" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <BaseButton class="w-full max-w-6xl mx-auto" variant="primary" type="submit">Enregistrer</BaseButton>
  <p v-if="successMessage" class="text-green-600 text-center mt-5">{{ successMessage }}</p>
</form>

  </section>
</template>

<script setup>
import { ref } from 'vue'
import BaseCheckbox from '../../../core/components/base/BaseCheckbox.vue'
import BaseInput from '../../../core/components/base/BaseInput.vue'
import BaseRadio from '../../../core/components/base/BaseRadio.vue'
import BaseButton from '../../../core/components/base/BaseButton.vue'
import { createFiche, addTravauxToFiche } from '../../../services/ficheService'

const firstname = ref('')
const lastname = ref('')
const dateRdv = ref('')
const hourRdv = ref('')
const email = ref('')
const phone = ref('')
const address = ref('')
const codePostal = ref('')
const city = ref('')
const type_logement = ref('')
const statut_habitation = ref('')
const originContact = ref('')
const dateMeet = ref('')
const hourMeet = ref('')
const commentary = ref('')
const successMessage = ref('')

const id = ref('fiche-' + Date.now())
const status = ref('In Progress')

const originOptions = [
  { label: "Salon, Foire", value: "Salon" },
  { label: "Ancien Client", value: "Ancien client" },
  { label: "Réseaux Sociaux", value: "Réseaux sociaux" },
  { label: "Passage Magasin", value: "Affichage" },
]

const statutOptions = [
  { label: 'Propriétaire', value: 'proprietaire' },
  { label: 'Locataire', value: 'locataire' }
];

const logementOptions = [
  { label: 'Maison', value: 'maison' },
  { label: 'Appartement', value: 'appartement' }
];


const workTypes = ref([
  { name: 'Fenêtre', materials: { PVC: false, BOIS: false, ALU: false } },
  { name: "Porte d'entrée", materials: { PVC: false, BOIS: false, ALU: false } },
  { name: 'Portail', materials: { PVC: false, BOIS: false, ALU: false } },
  { name: 'Volet roulant', materials: { PVC: false, BOIS: false, ALU: false } },
  { name: 'Volet battant', materials: { PVC: false, BOIS: false, ALU: false } },
  { name: 'Porte de garage', materials: { PVC: false, BOIS: false, ALU: false } },
  { name: 'Cloture', materials: { PVC: false, BOIS: false, ALU: false } },
  { name: 'Pergola', materials: { PVC: false, BOIS: false, ALU: false } },
  { name: 'Store intérieur', materials: { PVC: false, BOIS: false, ALU: false } },
  { name: 'Store extérieur', materials: { PVC: false, BOIS: false, ALU: false } },
])

const normalize = (text) =>
  text
    .normalize("NFD") // décompose les accents
    .replace(/[\u0300-\u036f]/g, "") // enlève les accents
    .toLowerCase()
    .replace(/\s+/g, "_") // remplace les espaces par _
    .replace(/'/g, "_"); // remplace les apostrophes par _


const extractPlannedWorks = () => {
  return workTypes.value
    .filter(work => Object.values(work.materials).some(Boolean))
    .map(work => normalize(work.name));
};


const submitForm = async () => {
  const ficheData = {
    id: `fiche-${Date.now()}`,
    firstname: firstname.value,
    lastname: lastname.value,
    telephone: phone.value,
    date_rdv: dateRdv.value,
    heure_rdv: hourRdv.value,
    email: email.value,
    address: address.value,
    code_postal: codePostal.value,
    city: city.value,
    type_logement: type_logement.value,
    statut_habitation: statut_habitation.value,
    origin_contact: originContact.value,
    status: 'In Progress',
    commentary: commentary.value || '',
    planned_works: extractPlannedWorks(),
  };

  try {
    await createFiche(ficheData);
    alert("Fiche créée !");
    resetForm();
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la création de la fiche");
  }
};


const resetForm = () => {
  firstname.value = ''
  lastname.value = ''
  email.value = ''
  phone.value = ''
  address.value = ''
  codePostal.value = ''
  city.value = ''
  originContact.value = ''
  dateRdv.value = ''
  hourRdv.value = ''
  type_logement.value = ''
  statut_habitation.value = ''
  commentary.value = ''
  id.value = 'fiche-' + Date.now()

  workTypes.value.forEach(w => {
    w.materials.PVC = false
    w.materials.BOIS = false
    w.materials.ALU = false
  })
}
</script>
