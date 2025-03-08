const API_URL = 'https://elon-net-worth-scraper.onrender.com/elon-net-worth-forbes';
let elonNetWorth = 343000000000; // Fallback value

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
    }
}

// Initial load with loading state
document.getElementById('elon-net-worth').textContent = 'Loading...';
updateElonNetWorth(); // Fetch immediately
setInterval(updateElonNetWorth, 60000); // Update every minute

function calculateDaysAlive(age) {
    const daysInYear = 365.25;
    return age * daysInYear;
}

document.getElementById('net-worth-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const userNetWorth = parseFloat(document.getElementById('user-net-worth').value);
    const userAge = parseInt(document.getElementById('user-age').value);
    const comparisonFactor = elonNetWorth / userNetWorth;
    const daysAlive = calculateDaysAlive(userAge);
    const dailyEarningsNeeded = elonNetWorth / daysAlive;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Your net worth is $${formatNumber(userNetWorth)}.</p>
        <p>Elon Musk's net worth is ${formatNumber(comparisonFactor)} times yours.</p>
        <p>To match Elon Musk's net worth, you would need to have earned $${formatNumber(dailyEarningsNeeded)} per day since birth.</p>
    `;
});