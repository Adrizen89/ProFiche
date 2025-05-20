const API_BASE_URL = 'https://api.adbdigital.fr';

export async function createFiche(fiche) {
  const response = await fetch(`${API_BASE_URL}/fiche`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fiche),
  });
  if (!response.ok) throw new Error("Erreur lors de la création de la fiche");
  return response.json();
}

export async function getFicheById(id) {
    const response = await fetch(`${API_BASE_URL}/fiche/${id}`);
    if (!response.ok) throw new Error("Fiche introuvable");
    return response.json();
  }  

export async function getFichesEnCours() {
  const response = await fetch(`${API_BASE_URL}/fiches/en-cours`);
  if (!response.ok) throw new Error("Erreur lors de la récupération des fiches en cours");
  return response.json();
}

export async function getAllFiches() {
  const response = await fetch(`${API_BASE_URL}/fiches`);
  if (!response.ok) throw new Error("Erreur lors de la récupération de toutes les fiches");
  return response.json();
}

export async function getFichesTerminees() {
  const response = await fetch(`${API_BASE_URL}/fiche`);
  if (!response.ok) throw new Error("Erreur lors de la récupération des fiches terminées");
  return response.json();
}

export async function addTravauxToFiche(id, works_planned) {
  const response = await fetch(`${API_BASE_URL}/fiche/${id}/travaux`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ works_planned }),
  });
  if (!response.ok) throw new Error("Erreur lors de l'ajout des travaux à la fiche");
  return response.json();
}

export async function updateFiche(fiche) {
  const response = await fetch(`${API_BASE_URL}/fiche/${fiche.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fiche),
  });

  if (!response.ok) {
    const errMsg = await response.text();
    throw new Error(`Erreur lors de la mise à jour de la fiche : ${errMsg}`);
  }

  return response.json();
}



export async function validerFiche(id) {
  const response = await fetch(`${API_BASE_URL}/fiche/${id}/valider`, {
    method: 'PUT',
  });
  if (!response.ok) throw new Error("Erreur lors de la validation de la fiche");
  return response.json();
}

export async function getDistinctCities() {
  const response = await fetch(`${API_BASE_URL}/fiches/villes`);
  if (!response.ok) throw new Error("Erreur lors de la récupération des villes");
  return response.json();
}

