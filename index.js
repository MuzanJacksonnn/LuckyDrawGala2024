const express = require('express');
const cors = require('cors');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const app = express();
app.use(cors());
app.use(express.json());

const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);

let currentDraw = null;

async function initializeGoogleSheets() {
  // ... (votre code d'initialisation existant)
}

// Fonction pour générer un nouveau tirage
async function generateNewDraw() {
  const sheet = doc.sheetsByTitle["Tickets"];
  await sheet.loadCells('A:A');
  const tickets = [];
  for (let i = 1; i < sheet.rowCount; i++) {
    const cell = sheet.getCell(i, 0);
    if (cell.value) {
      tickets.push(cell.value.toString());
    }
  }

  // Votre logique de tirage au sort ici
  // Par exemple :
  const shuffledTickets = tickets.sort(() => 0.5 - Math.random());
  currentDraw = {};
  for (let i = 0; i < Math.min(shuffledTickets.length, lots.length); i++) {
    currentDraw[shuffledTickets[i]] = lots[i];
  }

  // Sauvegarder le tirage dans la feuille "Résultat"
  const resultSheet = doc.sheetsByTitle["Résultat"];
  await resultSheet.clear();
  await resultSheet.setHeaderRow(['Numéro du ticket', 'Numéro du lot', 'Sponsor', 'Description']);
  const rows = Object.entries(currentDraw).map(([ticket, lot]) => [
    ticket, lot.lotNumber, lot.sponsor, lot.description
  ]);
  await resultSheet.addRows(rows);
}

// Route pour obtenir le tirage actuel
app.get('/api/current-draw', async (req, res) => {
  if (!currentDraw) {
    // Si aucun tirage n'existe, charger depuis la feuille "Résultat"
    const resultSheet = doc.sheetsByTitle["Résultat"];
    await resultSheet.loadCells();
    currentDraw = {};
    for (let i = 1; i < resultSheet.rowCount; i++) {
      const ticket = resultSheet.getCell(i, 0).value;
      if (ticket) {
        currentDraw[ticket] = {
          lotNumber: resultSheet.getCell(i, 1).value,
          sponsor: resultSheet.getCell(i, 2).value,
          description: resultSheet.getCell(i, 3).value,
        };
      }
    }
  }
  res.json(currentDraw);
});

// Route pour réinitialiser le tirage (protégée par un mot de passe)
app.post('/api/reset-draw', async (req, res) => {
  const { password } = req.body;
  if (password !== process.env.RESET_PASSWORD) {
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  }

  try {
    await generateNewDraw();
    res.json({ message: 'Tirage réinitialisé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du tirage:', error);
    res.status(500).json({ error: 'Erreur lors de la réinitialisation du tirage' });
  }
});

// ... (le reste de votre code)

app.listen(process.env.PORT || 3000, () => {
  console.log('Serveur démarré');
  initializeGoogleSheets();
});
