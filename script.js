const SPREADSHEET_ID = '1gDVc7UdH0P6TKq1cBtYV_D3i0RhVmarPCssWX_bR8gQ';
const API_URL = 'http://localhost:3000';
const RANGE = 'Tickets!A:A';
const API_KEY = 'AIzaSyB7khzSFUMiGDzPsa04Mq3TVdDfDGOwg70';
const BACKEND_URL = 'https://luckydrawgala2024result-33e0820293b5.herokuapp.com';

// Gestionnaire de file d'attente pour les requêtes
class RequestQueue {
    constructor(maxConcurrent = 150) {
        this.queue = [];
        this.running = 0;
        this.maxConcurrent = maxConcurrent;
    }

    async add(task) {
        if (this.running >= this.maxConcurrent) {
            await new Promise(resolve => this.queue.push(resolve));
        }
        this.running++;
        try {
            return await task();
        } finally {
            this.running--;
            if (this.queue.length > 0) {
                const queue.shift()();
            }
        }
    }
}

let currentDraw = null;
const requestQueue = new RequestQueue(50);
const cache = new Map();
const CACHE_DURATION = 5000; // 5 secondes

async function fetchCurrentDraw() {
    const now = Date.now();
    const cached = cache.get('currentDraw');
    if (cached && now - cached.timestamp < CACHE_DURATION) {
        currentDraw = cached.data;
        return;
    }

    try {
        const response = await requestQueue.add(async () => {
            const res = await fetch(`${BACKEND_URL}/api/current-draw`);
            if (!res.ok) throw new Error('Erreur lors de la récupération du tirage');
            return res;
        });
        
        const data = await response.json();
        currentDraw = data;
        
        cache.set('currentDraw', {
            timestamp: now,
            data: data
        });
    } catch (error) {
        console.error('Erreur:', error);
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '<p>Service momentanément indisponible. Veuillez réessayer dans quelques instants.</p>';
        resultDiv.style.display = 'block';
    }
}

async function checkTicket() {
    const ticketNumber = document.getElementById('ticket-number').value;
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = '<div class="loader"></div>';
    resultDiv.style.display = 'block';

    if (!currentDraw) {
        await fetchCurrentDraw();
    }

    try {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 100));

        if (currentDraw[ticketNumber]) {
            const lot = currentDraw[ticketNumber];
            resultDiv.innerHTML = `
                <p>Congratulations! You have won prize ${lot.lotNumber}: ${lot.sponsor} - ${lot.description}</p>
                ${lot.imageUrl ? `<img src="${lot.imageUrl}" alt="Image of prize ${lot.lotNumber}" 
                    style="max-width: 300px; max-height: 300px; width: auto; height: auto;" 
                    loading="lazy">` : ''}
            `;
        } else {
            resultDiv.innerHTML = '<p>Sorry, you did not win. Better luck next time!</p>';
        }
    } catch (error) {
        resultDiv.innerHTML = '<p>Service is currently busy. Please try again in a few moments.</p>';
    }
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
        currentDraw = null;
        cache.clear();
    } catch (error) {
        console.error('Error during reset:', error);
        alert('Error resetting the draw');
    }
};

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.addEventListener('DOMContentLoaded', async function() {
    await fetchCurrentDraw();

    const checkTicketDebounced = debounce(checkTicket, 300);
    
    document.getElementById('check-ticket').addEventListener('click', checkTicketDebounced);
    document.getElementById('ticket-form').addEventListener('submit', function(e) {
        e.preventDefault();
        checkTicketDebounced();
    });

    document.getElementById('ticket-number').addEventListener('input', function() {
        document.getElementById('result').style.display = 'none';
    });
});
