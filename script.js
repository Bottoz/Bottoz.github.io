// Simulated Elon Musk net worth (in dollars) - as of March 08, 2025
let elonNetWorth = 343000000000; // $343 billion from Forbes estimate

// Function to format numbers with commas and 2 decimal places
function formatNumber(num) {
    return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Function to update Elon Musk's net worth (simulated real-time update)
function updateElonNetWorth() {
    // Placeholder: In a real implementation, fetch from an API like Bloomberg Billionaires Index
    // Example API call (commented out):
    // fetch('https://api.example.com/elon-musk-net-worth')
    //     .then(response => response.json())
    //     .then(data => {
    //         elonNetWorth = data.netWorth;
    //         document.getElementById('elon-net-worth').textContent = `$${formatNumber(elonNetWorth)}`;
    //     })
    //     .catch(error => console.error('Error fetching Elon net worth:', error));

    // For now, just display the static value
    document.getElementById('elon-net-worth').textContent = `$${formatNumber(elonNetWorth)}`;
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
        <p>Your net worth is <b>$${formatNumber(userNetWorth)}</b>.</p>
        <p>Elon Musk's net worth is <b>${formatNumber(comparisonFactor)}</b> times yours.</p>
        <p>To match Elon Musk's net worth, you would need to have earned <b>$${formatNumber(dailyEarningsNeeded)}</b> per day since birth.</p>
    `;
});

// Update Elon Musk's net worth on page load and every 60 seconds (simulated)
updateElonNetWorth();
setInterval(updateElonNetWorth, 60000); // Update every minute (for demo purposes)