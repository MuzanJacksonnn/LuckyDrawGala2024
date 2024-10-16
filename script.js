const SPREADSHEET_ID = '1gDVc7UdH0P6TKq1cBtYV_D3i0RhVmarPCssWX_bR8gQ';
const API_URL = 'http://localhost:3000';
const RANGE = 'Tickets!A:A';
const API_KEY = 'AIzaSyB7khzSFUMiGDzPsa04Mq3TVdDfDGOwg70';
const BACKEND_URL = 'https://luckydrawgala2024result-33e0820293b5.herokuapp.com';
 
let currentDraw = null;

async function fetchCurrentDraw() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/current-draw`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du tirage');
    }
    currentDraw = await response.json();
    console.log("Tirage récupéré :", currentDraw); // Débogage
  } catch (error) {
    console.error('Erreur:', error);
    alert('Impossible de récupérer le tirage actuel. Veuillez réessayer plus tard.');
  }

async function checkTicket() {
  if (!currentDraw) {
    await fetchCurrentDraw();
  }
  const ticketNumber = document.getElementById('ticket-number').value;
  const resultDiv = document.getElementById('result');
  if (currentDraw[ticketNumber]) {
    const lot = currentDraw[ticketNumber];
    displayResult(lot);
  } else {
    resultDiv.innerHTML = `
      <div class="lot-result">
        <h2>Désolé, vous n'avez pas gagné.</h2>
        <p>Tentez votre chance une prochaine fois !</p>
      </div>
    `;
  }
  resultDiv.style.display = 'block';
}
function displayResult(lot) {
    const resultDiv = document.getElementById('result');
    console.log("Lot reçu :", lot); // Débogage
    
    let imageHtml = '';
    if (lot.imageUrl) {
        console.log("URL de l'image :", lot.imageUrl); // Débogage
        imageHtml = `<img src="${lot.imageUrl}" alt="${lot.description}" class="lot-image" onerror="console.log('Erreur de chargement de l\'image'); this.style.display='none';">`;
    } else {
        console.log("Pas d'URL d'image pour ce lot"); // Débogage
    }

    resultDiv.innerHTML = `
        <div class="lot-result">
            <h2>Félicitations ! Vous avez gagné !</h2>
            ${imageHtml}
            <p class="lot-info">Lot numéro : ${lot.lotNumber}</p>
            <p class="lot-description"><span class="lot-sponsor">${lot.sponsor}</span> - ${lot.description}</p>
        </div>
    `;
}

window.secureResetDraw = async function() {
  const password = prompt("Entrez le mot de passe pour réinitialiser le tirage:");
  try {
    const response = await fetch(`${BACKEND_URL}/api/reset-draw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      throw new Error('Réinitialisation échouée');
    }
    const data = await response.json();
    alert(data.message);
    currentDraw = null; // Forcer le rechargement du tirage
  } catch (error) {
    console.error('Erreur lors de la réinitialisation:', error);
    alert('Erreur lors de la réinitialisation du tirage');
  }
};

document.addEventListener('DOMContentLoaded', async function() {
  await fetchCurrentDraw();
  document.getElementById('check-ticket').addEventListener('click', checkTicket);
  document.getElementById('ticket-form').addEventListener('submit', function(e) {
    e.preventDefault();
    checkTicket();
  });
});
