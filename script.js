// Configuration de l'API Google Sheets
const SPREADSHEET_ID = '1gDVc7UdH0P6TKq1cBtYV_D3i0RhVmarPCssWX_bR8gQ';
const API_URL = 'http://localhost:3000';
const RANGE = 'Tickets!A:A';
const API_KEY = 'AIzaSyB7khzSFUMiGDzPsa04Mq3TVdDfDGOwg70';
const BACKEND_URL = 'https://luckydrawgala2024result-33e0820293b5.herokuapp.com';

// Liste des lots avec sponsor et description
const lots = [
    { lotNumber: 13, sponsor: "MICHELIN KOREA", description: "1 Set of 4 Tires" },
    { lotNumber: 14, sponsor: "JOSUN PALACE", description: "1 Night Stay in State Room for 2 persons, Breakfast included" },
    { lotNumber: 15, sponsor: "LA VALLEE VILLAGE", description: "Luxury Shopping Tour at La Vallée Village and 500 euros Gift Card" },
    { lotNumber: 16, sponsor: "LA VALLEE VILLAGE", description: "Luxury Shopping Tour at La Vallée Village and 500 euros Gift Card" },
    { lotNumber: 17, sponsor: "NOVOTEL AMBASSADOR SEOUL DONGDAEMUN", description: "Room voucher : Premier Suite Room with Breakfast included breakfast for 2pax" },
    { lotNumber: 18, sponsor: "MERCURE AMBASSADOR SEOUL HONGDAE", description: "Room voucher: 1 night stay at Junior Suite(King or Twin) w/ BF for 2" },
    { lotNumber: 19, sponsor: "NOVOTEL AMBASSADOR SEOUL GANGNAM", description: "Room Voucher : 1 Superior Room including breakfast buffet for 2 persons" },
    { lotNumber: 20, sponsor: "PERNOD RICARD", description: "Martell Chanteloup XXO" },
    { lotNumber: 21, sponsor: "SEOUL DRAGON CITY - 4 YONGSAN HOTELS", description: "Room voucher : Superior Room including breakfast for 2 pax" },
    { lotNumber: 22, sponsor: "IBIS STYLE AMBASSADOR INCHEON AIRPORT", description: "Room Voucher : 1 Night for Superior Suite Double Room with Breakfast for 2 pax" },
    { lotNumber: 23, sponsor: "GRAND HYATT SEOUL", description: "One standard room night including breakfast for 2 persons" },
    { lotNumber: 24, sponsor: "NOVOTEL AMBASSADOR SUWON", description: "Room voucher: Superior Room for 1 Night Breakfast for 2 persons included" },
    { lotNumber: 25, sponsor: "IBIS AMBASSADOR BUSAN CITY CENTER", description: "Room voucher: Superior Room for 1 Night Breakfast for 2 persons included" },
    { lotNumber: 26, sponsor: "IBIS AMBASSADOR SEOUL INSADONG", description: "Room voucher : a one-night stay voucher including 2 breakfast" },
    { lotNumber: 27, sponsor: "IBIS AMBASSADOR SEOUL MYEONGDONG", description: "Room voucher : a one-night stay voucher including 2 breakfast" },
    { lotNumber: 28, sponsor: "BLUEBELL", description: "1 PARFUMS de MARLY Delina EDP 75ml" },
    { lotNumber: 29, sponsor: "BLUEBELL", description: "1 PARFUMS de MARLY Layton EDP 125ml" },
    { lotNumber: 30, sponsor: "BLUEBELL", description: "1 Xerjoff Nio 50ml" },
    { lotNumber: 31, sponsor: "IBIS STYLE AMBASSADOR SEOUL GANGNAM", description: "Room voucher: Superior Room for 1 Night Breakfast for 2 persons included" },
    { lotNumber: 32, sponsor: "FOUR SEASONS HOTEL", description: "The Market Kitchen Lunch Buffet for 2 guests" },
    { lotNumber: 33, sponsor: "NOTREDAME DE PARIS", description: "VIP Tickets" },
    { lotNumber: 34, sponsor: "NOTREDAME DE PARIS", description: "VIP Tickets" },
    { lotNumber: 35, sponsor: "KL LIMITED (ERIC BOMBARD)", description: "Cashmere petit scarf" },
    { lotNumber: 36, sponsor: "KL LIMITED (ERIC BOMBARD)", description: "Cashmere petit scarf" },
    { lotNumber: 37, sponsor: "KL LIMITED (ERIC BOMBARD)", description: "Cashmere petit scarf" },
    { lotNumber: 38, sponsor: "KL LIMITED (ERIC BOMBARD)", description: "Cashmere petit scarf" },
    { lotNumber: 39, sponsor: "KL LIMITED (ERIC BOMBARD)", description: "Cashmere muffler : Purple color" },
    { lotNumber: 40, sponsor: "KL LIMITED (ERIC BOMBARD)", description: "Cashmere muffler : Purple color" },
    { lotNumber: 41, sponsor: "FAIRMONT AMBASSADOR SEOUL", description: "F&B voucher : Buffet Vouchers for 2pax at Spectrum" },
    { lotNumber: 42, sponsor: "FAIRMONT AMBASSADOR SEOUL", description: "F&B voucher : Buffet Vouchers for 2pax at Spectrum" },
    { lotNumber: 43, sponsor: "THE AMBASSADOR SEOUL - A PULLMAN HOTEL", description: "F&B voucher : The King's Buffet Voucher for 2 pax" },
    { lotNumber: 44, sponsor: "SOFITEL AMBASSADOR SEOUL HOTEL & SERVICED RESIDENCES", description: "F&B voucher: 'Le Bon Marche' Weekend Buffet for 2 persons" },
    { lotNumber: 45, sponsor: "SOFITEL AMBASSADOR SEOUL HOTEL & SERVICED RESIDENCES", description: "F&B voucher: 'Le Bon Marche' Weekend Buffet for 2 persons" },
    { lotNumber: 46, sponsor: "SEOUL WINES & SPIRITS", description: "Château LaTour-Martillac White & Red set" },
    { lotNumber: 47, sponsor: "SEOUL DRAGON CITY - 4 YONGSAN HOTELS", description: "F&B voucher : Food Exchange Buffet for 2 pax" },
    { lotNumber: 48, sponsor: "NOVOTEL AMBASSADOR SEOUL GANGNAM", description: "F&B voucher :  Buffet at The Square for 2 pax" },
    { lotNumber: 49, sponsor: "THE SHILLA SEOUL", description: "The Parkview Buffet Gift Certificate for 2 persons" },
    { lotNumber: 50, sponsor: "BLUEBELL", description: "1 Miller Harris Rose Silence EDP 50ml" },
    { lotNumber: 51, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 52, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 53, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 54, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 55, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 56, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 57, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 58, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 59, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 60, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 61, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 62, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 63, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 64, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 65, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 66, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 67, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 68, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 69, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 70, sponsor: "NAOS", description: "Institut Esthederm Voucher" },
    { lotNumber: 71, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 72, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 73, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 74, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 75, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 76, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 77, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 78, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 79, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 80, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 81, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 82, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 83, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 84, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 85, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 86, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 87, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 88, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 89, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 90, sponsor: "NAOS", description: "Esthederm Age Proteom Serum" },
    { lotNumber: 91, sponsor: "BLUEBELL", description: "1 Casamorati Lira 30ml" },
    { lotNumber: 92, sponsor: "IBIS STYLE AMBASSADOR SEOUL MYEONG-DONG", description: "F&B Voucher : Le Styles Restaurant Voucher for 120,000 KRW" },
    { lotNumber: 93, sponsor: "SEOUL WINES & SPIRITS", description: "Edouard Delaunay Bourgogne Septembre Chardonnay & Pinot Noir set" },
    { lotNumber: 94, sponsor: "GRAND HYATT SEOUL", description: "2 Restaurant credit vouchers" },
    { lotNumber: 95, sponsor: "PIERRE-FABRE", description: "Sets of Pierre Fabre Dermo Cosmétique Products / 3 AVENE" },
    { lotNumber: 96, sponsor: "PIERRE-FABRE", description: "Sets of Pierre Fabre Dermo Cosmétique Products / 3 AVENE" },
    { lotNumber: 97, sponsor: "PIERRE-FABRE", description: "Sets of Pierre Fabre Dermo Cosmétique Products / 3 AVENE" },
    { lotNumber: 98, sponsor: "PIERRE-FABRE", description: "Sets of Pierre Fabre Dermo Cosmétique Products / 4 DUCRAY" },
    { lotNumber: 99, sponsor: "PIERRE-FABRE", description: "Sets of Pierre Fabre Dermo Cosmétique Products / 4 DUCRAY" },
    { lotNumber: 100, sponsor: "PIERRE-FABRE", description: "Sets of Pierre Fabre Dermo Cosmétique Products / 4 DUCRAY" },
    { lotNumber: 101, sponsor: "PIERRE-FABRE", description: "Sets of Pierre Fabre Dermo Cosmétique Products / 4 DUCRAY" },
    { lotNumber: 102, sponsor: "SMIL", description: "15 L'oulibo 2023 Olive set (2023 Green Olive and Olive Oil)" },
    { lotNumber: 103, sponsor: "SMIL", description: "15 L'oulibo 2023 Olive set (2023 Green Olive and Olive Oil)" },
    { lotNumber: 104, sponsor: "SMIL", description: "15 L'oulibo 2023 Olive set (2023 Green Olive and Olive Oil)" },
    { lotNumber: 105, sponsor: "SMIL", description: "15 L'oulibo 2023 Olive set (2023 Green Olive and Olive Oil)" },
    { lotNumber: 106, sponsor: "SMIL", description: "15 L'oulibo 2023 Olive set (2023 Green Olive and Olive Oil)" },
    { lotNumber: 107, sponsor: "SMIL", description: "15 L'oulibo 2023 Olive set (2023 Green Olive and Olive Oil)" },
    { lotNumber: 108, sponsor: "SMIL", description: "15 L'oulibo 2023 Olive set (2023 Green Olive and Olive Oil)" },
    { lotNumber: 109, sponsor: "SMIL", description: "15 L'oulibo 2023 Olive set (2023 Green Olive and Olive Oil)" },
    { lotNumber: 110, sponsor: "SMIL", description: "15 L'oulibo 2023 Olive set (2023 Green Olive and Olive Oil)" },
    { lotNumber: 111, sponsor: "SMIL", description: "15 L'oulibo 2023 Olive set (2023 Green Olive and Olive Oil)" },
    { lotNumber: 112, sponsor: "SMIL", description: "15 L'oulibo 2023 Olive set (2023 Green Olive and Olive Oil)" },
    { lotNumber: 113, sponsor: "SMIL", description: "15 L'oulibo 2023 Olive set (2023 Green Olive and Olive Oil)" },
    { lotNumber: 114, sponsor: "SMIL", description: "15 L'oulibo 2023 Olive set (2023 Green Olive and Olive Oil)" },
    { lotNumber: 115, sponsor: "SMIL", description: "15 L'oulibo 2023 Olive set (2023 Green Olive and Olive Oil)" },
    { lotNumber: 116, sponsor: "SMIL", description: "15 L'oulibo 2023 Olive set (2023 Green Olive and Olive Oil)" },
    { lotNumber: 117, sponsor: "PIERRE-FABRE", description: "Sets of Pierre Fabre Dermo Cosmétique Products / 3 KLORANE" },
    { lotNumber: 118, sponsor: "PIERRE-FABRE", description: "Sets of Pierre Fabre Dermo Cosmétique Products / 3 KLORANE" },
    { lotNumber: 119, sponsor: "PIERRE-FABRE", description: "Sets of Pierre Fabre Dermo Cosmétique Products / 3 KLORANE" },
    { lotNumber: 120, sponsor: "TASTEBUD (Sassy)", description: "SASSY Gift box" },
    { lotNumber: 121, sponsor: "TASTEBUD (Sassy)", description: "SASSY Gift box" },
    { lotNumber: 122, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 123, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 124, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 125, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 126, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 127, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 128, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 129, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 130, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 131, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 132, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 133, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 134, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 135, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 136, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 137, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 138, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 139, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 140, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 141, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 142, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 143, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 144, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 145, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 146, sponsor: "TMONET", description: "Sets of Tickets for Théâtre des Lumières" },
    { lotNumber: 147, sponsor: "NATIXIS", description: "Phryges" },
    { lotNumber: 148, sponsor: "NATIXIS", description: "Phryges" },
    { lotNumber: 149, sponsor: "NATIXIS", description: "Phryges" },
    { lotNumber: 150, sponsor: "NATIXIS", description: "Phryges" },
    { lotNumber: 151, sponsor: "NATIXIS", description: "Phryges" },
    { lotNumber: 152, sponsor: "NATIXIS", description: "Phryges" },
    { lotNumber: 153, sponsor: "NATIXIS", description: "Phryges" },
    { lotNumber: 154, sponsor: "NATIXIS", description: "Phryges" },
    { lotNumber: 155, sponsor: "BLUEBELL", description: "3 Miller Harris Rose Silence Handcream 75ml" },
    { lotNumber: 156, sponsor: "BLUEBELL", description: "3 Miller Harris Rose Silence Handcream 75ml" },
    { lotNumber: 157, sponsor: "BLUEBELL", description: "3 Miller Harris Rose Silence Handcream 75ml" },
    { lotNumber: 158, sponsor: "LA CORVETTE", description: "Sets of Savons de Noël" },
    { lotNumber: 159, sponsor: "LA CORVETTE", description: "Sets of Savons de Noël" },
    { lotNumber: 160, sponsor: "PARIS 2024 OLYMPIC AND PARALYMPIC GAMES", description: "Tickets for the Canoe Competition and Urban Parc" },
    { lotNumber: 161, sponsor: "PARIS 2024 OLYMPIC AND PARALYMPIC GAMES", description: "Tickets for the Canoe Competition and Urban Parc" },
    { lotNumber: 162, sponsor: "PARIS 2024 OLYMPIC AND PARALYMPIC GAMES", description: "Tickets for the Canoe Competition and Urban Parc" },
    { lotNumber: 163, sponsor: "PARIS 2024 OLYMPIC AND PARALYMPIC GAMES", description: "Tickets for the Canoe Competition and Urban Parc" },
    { lotNumber: 164, sponsor: "CHATEAU D'ISSAN", description: "Magnum Bottle of Chateau d'Issan 2018 Grand Cru Classé from Margaux" }
  // ... Ajoutez le reste des lots ici
];

let winningLots = {};
let isInitialized = false;

async function fetchSoldTickets() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/sold-tickets`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Tickets récupérés:", data.tickets);
        return data.tickets;
    } catch (error) {
        console.error('Erreur lors de la récupération des tickets:', error);
        showError("Impossible de récupérer les tickets vendus. Veuillez réessayer plus tard.");
        return [];
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function generateWinningLots() {
    const soldTickets = await fetchSoldTickets();
    const shuffledTickets = shuffleArray([...soldTickets]);
    winningLots = {};

    const numberOfWinners = Math.min(shuffledTickets.length, lots.length);

    for (let i = 0; i < numberOfWinners; i++) {
        winningLots[shuffledTickets[i]] = {
            ...lots[i],
            ticketNumber: shuffledTickets[i]
        };
    }

    console.log("Lots gagnants générés:", winningLots);
    isInitialized = true;
    prepareDataForGoogleSheets();
}

function prepareDataForGoogleSheets() {
    const sheetData = [
        ['Numéro du lot', 'Sponsor', 'Description du lot', 'Numéro du ticket gagnant']
    ];

    Object.values(winningLots).forEach(lot => {
        sheetData.push([lot.lotNumber, lot.sponsor, lot.description, lot.ticketNumber]);
    });

    console.log("Données préparées pour Google Sheets:", sheetData);
    fetch(`${BACKEND_URL}/api/lottery-results`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => console.log('Résultats enregistrés avec succès:', data))
    .catch((error) => {
        console.error('Erreur:', error);
        showError("Impossible d'enregistrer les résultats. Veuillez réessayer plus tard.");
    });
}

function checkTicket() {
    if (!isInitialized) {
        showError("Le tirage n'est pas encore initialisé. Veuillez patienter.");
        return;
    }

    const ticketNumber = document.getElementById('ticket-number').value;
    const resultDiv = document.getElementById('result');

    console.log("Vérification du ticket:", ticketNumber);

    if (ticketNumber in winningLots) {
        const lot = winningLots[ticketNumber];
        resultDiv.textContent = `Félicitations ! Vous avez gagné le lot ${lot.lotNumber} : ${lot.sponsor} - ${lot.description}`;
    } else {
        resultDiv.textContent = 'Désolé, vous n\'avez pas gagné. Tentez votre chance une prochaine fois !';
    }
    resultDiv.style.display = 'block';
}

async function initializeDraw() {
    try {
        await generateWinningLots();
        console.log("Tirage au sort initialisé");
    } catch (error) {
        console.error("Erreur lors de l'initialisation du tirage:", error);
        showError("Erreur lors de l'initialisation du tirage. Veuillez recharger la page.");
    }
}

function showError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `Erreur : ${message}`;
    resultDiv.style.display = 'block';
}

window.addEventListener('load', initializeDraw);

document.getElementById('check-ticket').addEventListener('click', checkTicket);

document.getElementById('ticket-form').addEventListener('submit', function(e) {
    e.preventDefault();
    checkTicket();
});

// Fonction pour réinitialiser le tirage (accessible uniquement via la console)
window.resetDrawAdmin = async function() {
    winningLots = {};
    isInitialized = false;
    await initializeDraw();
    console.log("Tirage réinitialisé par l'administrateur");
    }
