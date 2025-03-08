// Backend proxy endpoint for scraping Forbes Real-Time Billionaires
const API_URL = 'https://elon-net-worth-scraper.onrender.com/elon-net-worth-forbes'; // Use your Render URL

// Variable to store Elon Musk's net worth
let elonNetWorth = 343000000000; // Fallback value ($343 billion as of March 08, 2025)

// Function to format numbers with commas and 2 decimal places
function formatNumber(num) {
    return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Function to fetch Elon Musk's net worth from the Forbes scraping endpoint
async function updateElonNetWorth() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Forbes scraping API request failed');
        const data = await response.json();
        elonNetWorth = data.netWorth || elonNetWorth; // Use scraped value or fallback
        document.getElementById('elon-net-worth').textContent = `$${formatNumber(elonNetWorth)}`;
    } catch (error) {
        console.error('Error fetching Elon net worth:', error);
        document.getElementById('elon-net-worth').textContent = `$${formatNumber(elonNetWorth)} (Forbes data unavailable, using fallback)`;
    }
}

// Function to calculate days alive based on age
function calculateDaysAlive(age) {
    const daysInYear = 365.25; // Account for leap years
    return age * daysInYear;
}

// Form submission handler
document.getElementById('net-worth-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get user inputs
    const userNetWorth = parseFloat(document.getElementById('user-net-worth').value);
    const userAge = parseInt(document.getElementById('user-age').value);

    // Calculate comparison
    const comparisonFactor = elonNetWorth / userNetWorth;
    const daysAlive = calculateDaysAlive(userAge);
    const dailyEarningsNeeded = elonNetWorth / daysAlive;

    // Display result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Your net worth is $${formatNumber(userNetWorth)}.</p>
        <p>Elon Musk's net worth is ${formatNumber(comparisonFactor)} times yours.</p>
        <p>To match Elon Musk's net worth, you would need to have earned $${formatNumber(dailyEarningsNeeded)} per day since birth.</p>
    `;
});

// Initial fetch and periodic updates
updateElonNetWorth(); // Fetch on page load
setInterval(updateElonNetWorth, 60000); // Update every minute