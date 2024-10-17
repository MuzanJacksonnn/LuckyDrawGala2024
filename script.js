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
  } catch (error) {
    console.error('Erreur:', error);
    alert('Impossible de récupérer le tirage actuel. Veuillez réessayer plus tard.');
  }
}

async function checkTicket() {
  if (!currentDraw) {
    await fetchCurrentDraw();
  }

  const ticketNumber = document.getElementById('ticket-number').value;
  const resultDiv = document.getElementById('result');

  if (currentDraw[ticketNumber]) {
    const lot = currentDraw[ticketNumber];
    resultDiv.innerHTML = `
     <p>Congratulations! You have won prize ${lot.lotNumber} : ${lot.sponsor} - ${lot.description}</p>
      ${lot.imageUrl ? `<img src="${lot.imageUrl}" alt="Image du lot ${lot.lotNumber}" style="max-width: 400px; max-height: 400px; width: auto; height: auto;">` : ''}
    `;
  } else {
    resultDiv.innerHTML = '<p>Sorry, you did not win. Better luck next time!</p>';
  }
  resultDiv.style.display = 'block';
}

window.secureResetDraw = async function() {
  const password = prompt("Enter the password to reset the draw:");
  try {
    const response = await fetch(`${BACKEND_URL}/api/reset-draw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      throw new Error('Reset failed');
    }

    const data = await response.json();
    alert(data.message);
    currentDraw = null; // Forcer le rechargement du tirage
  } catch (error) {
    console.error('Error during reset:', error);
    alert('Error resetting the draw');
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
