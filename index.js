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

async function initializeGoogleSheets() {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    await doc.loadInfo();
    isInitialized = true;
    console.log('Google Sheets initialized successfully');
  } catch (error) {
    console.error('Error initializing Google Sheets:', error);
    throw error;
  }
}

app.use(async (req, res, next) => {
  if (!isInitialized) {
    try {
      await initializeGoogleSheets();
    } catch (error) {
      return res.status(500).send('Server initialization error');
    }
  }
  next();
});

app.get('/api/sold-tickets', async (req, res) => {
  try {
    console.log('Récupération des tickets vendus...');
    const sheet = doc.sheetsByTitle["Tickets"];
    if (!sheet) {
      throw new Error("Feuille 'Tickets' non trouvée");
    }
    console.log('Feuille trouvée:', sheet.title);
    const rows = await sheet.getRows();
    console.log('Nombre de lignes récupérées:', rows.length);
    const tickets = rows.map(row => row.Ticket).filter(ticket => ticket !== null && ticket !== '' && ticket !== undefined);
    console.log('Tickets vendus récupérés:', tickets);
    res.json({ tickets });
    console.log('Tickets envoyés au frontend:', tickets);
    res.json({ tickets });
  } catch (error) {
    console.error('Erreur lors de la récupération des tickets:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/lottery-results', async (req, res) => {
  try {
    console.log('Received lottery results:', req.body);
    const results = req.body;
    console.log('Sheets available:', doc.sheetsByIndex.map(s => s.title));
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
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
