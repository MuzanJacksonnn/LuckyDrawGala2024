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
    console.log("Tirage récupéré :", currentDraw);
  } catch (error) {
    console.error('Erreur:', error);
    alert('Impossible de récupérer le tirage actuel. Veuillez réessayer plus tard.');
  }
}

async function checkTicket(event) {
  event.preventDefault();
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
  console.log("Lot reçu :", lot);
  
  const defaultImageUrl = 'https://example.com/path/to/default-image.jpg';
  const imageUrl = lot.imageUrl || defaultImageUrl;
  
  resultDiv.innerHTML = `
    <div class="lot-result">
      <h2>Félicitations ! Vous avez gagné !</h2>
      <img src="${imageUrl}" alt="${lot.description}" class="lot-image" onerror="this.style.display='none';">
      <p class="lot-info">Lot numéro : ${lot.lotNumber}</p>
      <p class="lot-description"><span class="lot-sponsor">${lot.sponsor}</span> - ${lot.description}</p>
    </div>
  `;
  resultDiv.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', async function() {
  await fetchCurrentDraw();
  document.getElementById('ticket-form').addEventListener('submit', checkTicket);
});
