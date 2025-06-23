const express = require('express');
const cors = require('cors');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const app = express();
console.log('Express app created');

app.use(cors({
  origin: 'https://luckydrawgalafkcci.netlify.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

app.get('/api/healthcheck', (req, res) => {
    res.status(200).send('OK');
});

app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', 'https://luckydrawgalafkcci.netlify.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
let isInitialized = false;
let currentDraw = null;

// Liste des lots (assurez-vous que cette liste est à jour)
const lots = [
    { lotNumber: 11, sponsor: "FAIRMONT AMBASSADOR SEOUL", description: "One night stay at Fairmont Room with breakfast for 2" },
    { lotNumber: 12, sponsor: "NARU HOTEL SEOUL - MGALLERY AMBASSADOR", description: "One night at Premier River Suite with breakfast for 2" },
    { lotNumber: 13, sponsor: "THE AMBASSADOR SEOUL - A PULLMAN HOTEL", description: "One night stay at Superior Room with breakfast for 2" },
    { lotNumber: 14, sponsor: "NOVOTEL AMBASSADOR SEOUL YONGSAN", description: "1 Night at Superior room with breakfast for 2" },
    { lotNumber: 15, sponsor: "NOVOTEL AMBASSADOR SEOUL DONGDAEMUN", description: "One night at Executive Room with EFL benefits for 2" },
    { lotNumber: 16, sponsor: "NOVOTEL AMBASSADOR SUWON", description: "One night at Standard room with breakfast for 2" },
    { lotNumber: 17, sponsor: "IBIS AMBASSADOR SEOUL INSADONG", description: "One night at standard room" },
    { lotNumber: 20, sponsor: "IBIS AMBASSADOR SEOUL INSADONG", description: "Lunch Buffet for 2 persons" },
    { lotNumber: 21, sponsor: "JOSUN PALACE", description: "1 Night Stay in State Room for 2 persons, Breakfast included" },
    { lotNumber: 22, sponsor: "NEWB HOTEL SEOUL", description: "1 Night Stay at NEWV Suite for 2" },
    { lotNumber: 23, sponsor: "PERNOD RICARD", description: "Martell Chanteloup XXO" },
    { lotNumber: 24, sponsor: "FOUR SEASONS HOTEL", description: "The Market Kitchen Lunch Buffet for 2 guests" },
    { lotNumber: 25, sponsor: "Parfums de Marly", description: "GREENLEY EDP 75ml" },
    { lotNumber: 26, sponsor: "Parfums de Marly", description: "GREENLEY EDP 75ml" },
    { lotNumber: 27, sponsor: "GRAND HYATT SEOUL", description: "One Standard room night including breakfast for 2 persons" },
    { lotNumber: 28, sponsor: "CASTELBAJAC", description: "Boston bag" },
    { lotNumber: 29, sponsor: "ANDAZ SEOUL GANGNAM", description: "Andaz Weekend Long Brunch for Two Pax including a welcome glass of Champagne" },
    { lotNumber: 30, sponsor: "Parfums de Marly", description: "VALAYA EDP 30ml" },
    { lotNumber: 31, sponsor: "Parfums de Marly", description: "VALAYA EDP 30ml" },
    { lotNumber: 32, sponsor: "ANDAZ SEOUL GANGNAM", description: "Jogakbo Kitchen Modern Korean Dining Set Dinner for Two Pax including matching / pairing beverages" },
    { lotNumber: 33, sponsor: "THE SHILLA SEOUL", description: "The Parkview Buffet Gift Certificate for 2 persons" },
    { lotNumber: 34, sponsor: "PIERRE FABRE DERMO-COSMÉTIQUE", description: "Sets of Avène" },
    { lotNumber: 35, sponsor: "PIERRE FABRE DERMO-COSMÉTIQUE", description: "Sets of Avène" },
    { lotNumber: 36, sponsor: "PIERRE FABRE DERMO-COSMÉTIQUE", description: "Sets of Avène" },
    { lotNumber: 37, sponsor: "Parfums de Marly", description: "VALAYA Hair Perfume 75ml" },
    { lotNumber: 38, sponsor: "Parfums de Marly", description: "VALAYA Hair Perfume 75ml" },
    { lotNumber: 39, sponsor: "Parfums de Marly", description: "VALAYA Hair Perfume 75ml" },
    { lotNumber: 40, sponsor: "Parfums de Marly", description: "VALAYA Hair Perfume 75ml" },
    { lotNumber: 41, sponsor: "PIERRE FABRE DERMO-COSMÉTIQUE", description: "Sets of Ducray" },
    { lotNumber: 42, sponsor: "PIERRE FABRE DERMO-COSMÉTIQUE", description: "Sets of Ducray" },
    { lotNumber: 43, sponsor: "PIERRE FABRE DERMO-COSMÉTIQUE", description: "Sets of Ducray" },
    { lotNumber: 44, sponsor: "PIERRE FABRE DERMO-COSMÉTIQUE", description: "Sets of Ducray" },
    { lotNumber: 45, sponsor: "GRAND HYATT SEOUL", description: "2 Restaurant credit voucher" },
    { lotNumber: 46, sponsor: "GRAND HYATT SEOUL", description: "2 Restaurant credit voucher" },
    { lotNumber: 47, sponsor: "PIERRE FABRE DERMO-COSMÉTIQUE", description: "Sets of Klorane" },
    { lotNumber: 48, sponsor: "PIERRE FABRE DERMO-COSMÉTIQUE", description: "Sets of Klorane" },
    { lotNumber: 49, sponsor: "PIERRE FABRE DERMO-COSMÉTIQUE", description: "Sets of Klorane" },
    { lotNumber: 50, sponsor: "MAISON SASSY", description: "SASSY Gift box" },
    { lotNumber: 51, sponsor: "MAISON SASSY", description: "SASSY Gift box" },
    { lotNumber: 52, sponsor: "TRACKMAN", description: "2 VOUCHERS OF 60 MINUTES TRACKMAN" },
    { lotNumber: 53, sponsor: "TRACKMAN", description: "2 VOUCHERS OF 60 MINUTES TRACKMAN" },
    { lotNumber: 54, sponsor: "TRACKMAN", description: "2 VOUCHERS OF 60 MINUTES TRACKMAN" },
    { lotNumber: 55, sponsor: "TRACKMAN", description: "2 VOUCHERS OF 60 MINUTES TRACKMAN" },
    { lotNumber: 56, sponsor: "TRACKMAN", description: "2 VOUCHERS OF 60 MINUTES TRACKMAN" },
    { lotNumber: 57, sponsor: "CAFES RICHARD", description: "CAFES RICHARD COFFEE" },
    { lotNumber: 58, sponsor: "CAFES RICHARD", description: "CAFES RICHARD COFFEE" },
    { lotNumber: 59, sponsor: "CAFES RICHARD", description: "CAFES RICHARD COFFEE" },
    { lotNumber: 60, sponsor: "CAFES RICHARD", description: "CAFES RICHARD COFFEE" },
    { lotNumber: 61, sponsor: "CAFES RICHARD", description: "CAFES RICHARD COFFEE" },
    { lotNumber: 62, sponsor: "CAFES RICHARD", description: "CAFES RICHARD COFFEE" },
    { lotNumber: 63, sponsor: "CAFES RICHARD", description: "CAFES RICHARD COFFEE" },
    { lotNumber: 64, sponsor: "CAFES RICHARD", description: "CAFES RICHARD COFFEE" },
    { lotNumber: 65, sponsor: "CAFES RICHARD", description: "CAFES RICHARD COFFEE" },
    { lotNumber: 66, sponsor: "CAFES RICHARD", description: "CAFES RICHARD COFFEE" },
    { lotNumber: 67, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 68, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 69, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 70, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 71, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 72, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 73, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 74, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 75, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 76, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 77, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 78, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 79, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 80, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 81, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 82, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 83, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 84, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 85, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 86, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 87, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 88, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 89, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 90, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 91, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 92, sponsor: "BOKSOONDOGA", description: "Boksoondoga Ceramic Cup" },
    { lotNumber: 93, sponsor: "BOKSOONDOGA", description: "Boksoondoga Ceramic Cup" },
    { lotNumber: 94, sponsor: "BOKSOONDOGA", description: "Boksoondoga Ceramic Cup" },
    { lotNumber: 95, sponsor: "BOKSOONDOGA", description: "Boksoondoga Facial Treatment Mask" },
    { lotNumber: 96, sponsor: "BOKSOONDOGA", description: "Boksoondoga Facial Treatment Mask" },
    { lotNumber: 97, sponsor: "BOKSOONDOGA", description: "Boksoondoga Facial Treatment Mask" },
    { lotNumber: 98, sponsor: "BOKSOONDOGA", description: "Boksoondoga Facial Treatment Mask" },
    { lotNumber: 99, sponsor: "BOKSOONDOGA", description: "Boksoondoga Facial Treatment Mask" },
    { lotNumber: 100, sponsor: "BOKSOONDOGA", description: "Boksoondoga Facial Treatment Mask" },
    { lotNumber: 101, sponsor: "BOKSOONDOGA", description: "Boksoondoga Facial Treatment Mask" },
    { lotNumber: 102, sponsor: "BOKSOONDOGA", description: "Boksoondoga Facial Treatment Mask" },
    { lotNumber: 103, sponsor: "BOKSOONDOGA", description: "Boksoondoga Facial Treatment Mask" },
    { lotNumber: 104, sponsor: "BOKSOONDOGA", description: "Boksoondoga Facial Treatment Mask" },
    { lotNumber: 105, sponsor: "LAITA", description: "Paysan Breton Gift Set" }
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
  res.header('Access-Control-Allow-Origin', 'https://luckydrawgala2024.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (!isInitialized) await initializeGoogleSheets();

   if (!currentDraw) {
    const resultSheet = doc.sheetsByTitle["Résultat"];
    await resultSheet.loadCells();
    currentDraw = {};
    for (let i = 1; i < resultSheet.rowCount; i++) {
      const ticket = resultSheet.getCell(i, 0).value;
      if (ticket) {
        const lotNumber = resultSheet.getCell(i, 1).value;
        const lot = lots.find(l => l.lotNumber === lotNumber);
        currentDraw[ticket] = {
          lotNumber: lotNumber,
          sponsor: resultSheet.getCell(i, 2).value,
          description: resultSheet.getCell(i, 3).value,
          imageUrl: lot ? lot.imageUrl : null,
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

async function startServer() {
  try {
    await initializeGoogleSheets();
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
console.error("Erreur lors de l'initialisation du serveur:", error);
  }
}

startServer();

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
