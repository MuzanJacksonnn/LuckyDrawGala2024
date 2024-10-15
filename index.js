const express = require('express');
const cors = require('cors');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const app = express();

app.use(cors({
  origin: 'https://luckydrawgala2024.netlify.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
let isInitialized = false;
let currentDraw = null;

// Liste des lots (assurez-vous que cette liste est à jour)
const lots = [
    { lotNumber: 13, sponsor: "MICHELIN KOREA", description: "1 Set of 4 Tires" },
    // ... Ajoutez tous les autres lots ici
    { lotNumber: 164, sponsor: "CHATEAU D'ISSAN", description: "Magnum Bottle of Chateau d'Issan 2018 Grand Cru Classé from Margaux" }
];

async function initializeGoogleSheets() {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    await doc.loadInfo();
    isInitialized = true;
    console.log('Google Sheets initialized successfully');
    console.log('Sheets available:', doc.sheetsByIndex.map(s => s.title));
  } catch (error) {
    console.error('Error initializing Google Sheets:', error);
    throw error;
  }
}

async function generateNewDraw() {
  const ticketSheet = doc.sheetsByTitle["Tickets"];
  await ticketSheet.loadCells('A:A');
  const tickets = [];
  for (let i = 1; i < ticketSheet.rowCount; i++) {
    const cell = ticketSheet.getCell(i, 0);
    if (cell.value) {
      tickets.push(cell.value.toString());
    }
  }

  const shuffledTickets = tickets.sort(() => 0.5 - Math.random());
  currentDraw = {};
  for (let i = 0; i < Math.min(shuffledTickets.length, lots.length); i++) {
    currentDraw[shuffledTickets[i]] = lots[i];
  }

  const resultSheet = doc.sheetsByTitle["Résultat"];
  await resultSheet.clear();
  await resultSheet.setHeaderRow(['Numéro du ticket', 'Numéro du lot', 'Sponsor', 'Description']);
  const rows = Object.entries(currentDraw).map(([ticket, lot]) => [
    ticket, lot.lotNumber, lot.sponsor, lot.description
  ]);
  await resultSheet.addRows(rows);
}

app.get('/api/sold-tickets', async (req, res) => {
  try {
    if (!isInitialized) await initializeGoogleSheets();
    
    console.log('Récupération des tickets vendus...');
    const sheet = doc.sheetsByTitle["Tickets"];
    if (!sheet) {
      throw new Error("Feuille 'Tickets' non trouvée");
    }
    console.log('Feuille trouvée:', sheet.title);
    await sheet.loadCells('A:A');
    const tickets = [];
    for (let i = 1; i < sheet.rowCount; i++) {
      const cell = sheet.getCell(i, 0);
      if (cell.value) {
        tickets.push(cell.value.toString());
      }
    }
    console.log('Nombre de tickets récupérés:', tickets.length);
    console.log('Tickets vendus récupérés:', tickets);
    res.json({ tickets });
  } catch (error) {
    console.error('Erreur lors de la récupération des tickets:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/current-draw', async (req, res) => {
  if (!isInitialized) await initializeGoogleSheets();

  if (!currentDraw) {
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

app.post('/api/reset-draw', async (req, res) => {
  if (!isInitialized) await initializeGoogleSheets();

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

app.post('/api/lottery-results', async (req, res) => {
  if (!isInitialized) await initializeGoogleSheets();

  try {
    console.log('Received lottery results:', req.body);
    const results = req.body;
    const sheet = doc.sheetsByTitle["Résultat"];
    if (!sheet) {
      throw new Error("Sheet 'Résultat' not found");
    }
    console.log('Sheet found:', sheet.title);

    const rows = await sheet.getRows();
    console.log('Current rows:', rows.length);

    if (rows.length === 0) {
      console.log('Adding headers:', results[0]);
      await sheet.setHeaderRow(results[0]);
      results.shift();
    }

    console.log('Adding rows:', results);
    await sheet.addRows(results);
    res.status(200).send('Résultats enregistrés avec succès');
  } catch (error) {
    console.error('Erreur détaillée:', error);
    res.status(500).send(`Erreur lors de l'enregistrement des résultats: ${error.message}`);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  try {
    await initializeGoogleSheets();
  } catch (error) {
    console.error('Erreur lors de l'initialisation du serveur:', error);
  }
});
