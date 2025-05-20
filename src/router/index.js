import { createRouter, createWebHistory } from "vue-router";
import Home from "../modules/home/views/Home.vue"

import FicheInProgressDetails from "../modules/fiches/components/FicheInProgressDetails.vue";
import CreateFiche from "../modules/fiches/views/CreateFiche.vue";
import FicheInProgress from "../modules/fiches/views/FicheInProgress.vue";
import HistoriqueFiche from "../modules/fiches/views/HistoriqueFiche.vue";
import FicheDetails from "../modules/fiches/components/FicheDetails.vue";
import NotFound from "../core/layouts/NotFound.vue";
import Restricted from "../core/layouts/Restricted.vue";


const routes = [
  { path: "/fbfichecontact", name: "PrivateHome", component: Home },

  { path: "/fiche-in-progress", component: FicheInProgress },
  { path: "/create-fiche", component: CreateFiche },
  { path: "/fiche-in-progress/:id", name: "ficheInProgressDetails", component: FicheInProgressDetails },
  { path: "/fiche/:id", name: "ficheDetails", component: FicheDetails },
  { path: "/historique", component: HistoriqueFiche },
  { path: '/', name: 'Restricted', component: Restricted },

  // 🚫 404 pour tout le reste
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
