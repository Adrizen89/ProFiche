# Fiche Frontend - Vue.js

Interface utilisateur Vue.js pour interagir avec l'API REST de gestion de fiches de contact.

## 🏠 Objectif
Permettre aux utilisateurs de :
- Créer une fiche
- Visualiser les fiches existantes
- Ajouter des travaux à une fiche
- Valider une fiche complétée

## 📊 Stack
- Vue.js 3 (Composition API ou Options API)
- HTML/CSS (ou Tailwind / Bootstrap selon tes choix)
- `fetch` pour les requêtes HTTP (aucune dépendance externe)

## 🚀 Exemple de requêtes `fetch`

### Créer une fiche
```js
fetch("http://localhost:8000/fiche", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    id: "fiche-001",
    firstname: "Jean",
    lastname: "Dupont",
    telephone: "0601020304",
    email: "jean@mail.com",
    address: "10 rue de Paris",
    code_postal: "75000",
    ville: "Paris",
    origin_contact: "telephone",
    status: "en_cours",
    commentary: "Premier contact"
  })
});
```

### Ajouter des travaux à une fiche
```js
fetch("http://localhost:8000/fiche/fiche-001/travaux", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    works_planned: [
      {
        work: "fenetre",
        details: {
          largeur: 120,
          hauteur: 150,
          couleur: "blanc"
        }
      }
    ]
  })
});
```

### Récupérer les fiches en cours
```js
fetch("http://localhost:8000/fiche/en-cours")
  .then(res => res.json())
  .then(data => {
    console.log("Fiches en cours:", data);
  });
```

### Valider une fiche
```js
fetch("http://localhost:8000/fiche/fiche-001/valider", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    id: "fiche-001",
    firstname: "Jean",
    lastname: "Dupont",
    telephone: "0601020304",
    email: "jean@mail.com",
    address: "10 rue de Paris",
    code_postal: "75000",
    ville: "Paris",
    origin_contact: "telephone",
    status: "terminee",
    commentary: "Validée après rendez-vous"
  })
});
```

> Pour valider, assure-toi d'envoyer tous les champs (tu peux recharger la fiche avant via un `GET`).

## 🚫 Gestion des erreurs
Ajoute une gestion simple des erreurs :
```js
.catch(error => {
  console.error("Erreur lors de la requête:", error);
});
```

## 💡 Bonus UI à implémenter
- Input dynamique avec `v-model` pour remplir les champs
- Select pour choisir le `origin_contact`
- Composant modal ou page pour ajouter les `works_planned`
- Badge ou étiquette pour le `status`

## ⚒️ Prochaines étapes
- Passage à `axios` si besoin d'annulation ou d'interception
- Utilisation de `Pinia` pour centraliser les fiches (store global)
- Ajout d'une interface d'administration

---

Made with Vue ❤️ par Adrien

