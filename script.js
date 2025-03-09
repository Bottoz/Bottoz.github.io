const API_URL = 'https://elon-net-worth-scraper.onrender.com/elon-net-worth-forbes';
let elonNetWorth = 343000000000;

function formatNumber(num) {
    return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

async function updateElonNetWorth() {
    try {
        console.log('Fetching from:', API_URL);
        const response = await fetch(API_URL);
        console.log('Response status:', response.status);
        if (!response.ok) throw new Error('Forbes scraping API request failed');
        const data = await response.json();
        console.log('Fetched data:', data);
        elonNetWorth = data.netWorth || elonNetWorth;
        document.getElementById('elon-net-worth').textContent = `$${formatNumber(elonNetWorth)}`;
    } catch (error) {
        console.error('Error fetching Elon net worth:', error);
        document.getElementById('elon-net-worth').textContent = elonNetWorth === 343000000000 
            ? 'Failed to load (using fallback: $343B)' 
            : `$${formatNumber(elonNetWorth)} (last known value)`;
    } finally {
        document.getElementById('elon-net-worth').classList.remove('loading');
    }
}

document.getElementById('elon-net-worth').classList.add('loading');
document.getElementById('elon-net-worth').textContent = 'Loading...';
updateElonNetWorth();
setInterval(updateElonNetWorth, 60000);

function calculateDaysAlive(age) {
    const daysInYear = 365.25;
    return age * daysInYear;
}

const netWorthInput = document.getElementById('user-net-worth');
netWorthInput.addEventListener('input', function() {
    let value = this.value.replace(/[^0-9.]/g, ''); // Remove non-numeric except decimal
    if (value) {
        const parts = value.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.value = parts.join('.');
    }
});

document.getElementById('net-worth-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get fresh values each submit
    const rawNetWorth = netWorthInput.value.replace(/,/g, ''); // Remove commas
    const userNetWorth = parseFloat(rawNetWorth);
    const userAge = parseInt(document.getElementById('user-age').value);
    
    // Validate inputs
    if (isNaN(userNetWorth) || isNaN(userAge)) {
        console.error('Invalid input:', rawNetWorth, userAge);
        return;
    }

    const comparisonFactor = elonNetWorth / userNetWorth;
    const daysAlive = calculateDaysAlive(userAge);
    const dailyEarningsNeeded = elonNetWorth / daysAlive;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results
    resultDiv.innerHTML = `
        <p>Your net worth is <span class="bold-number">$${formatNumber(userNetWorth)}</span>.</p>
        <p>Elon Musk's net worth is <span class="bold-number">${formatNumber(comparisonFactor)}</span> times yours.</p>
        <p>To match Elon Musk's net worth, you would need to have earned <span class="bold-number">$${formatNumber(dailyEarningsNeeded)}</span> per day since birth.</p>
    `;
});
