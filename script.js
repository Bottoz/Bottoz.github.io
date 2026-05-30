// ==================== CONFIG ====================
const API_URL = 'https://elon-net-worth-scraper.onrender.com/elon-net-worth-forbes';
let elonNetWorth = 343000000000;   // fallback

function formatNumber(num) {
    return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ==================== UPDATE ELON'S NET WORTH ====================
async function updateElonNetWorth() {
    const elonSpan = document.getElementById('elon-net-worth');
    elonSpan.classList.add('loading');
    elonSpan.textContent = 'Loading...';

    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        elonNetWorth = data.netWorth || elonNetWorth;
        elonSpan.textContent = `$${formatNumber(elonNetWorth)}`;
    } catch (e) {
        console.error(e);
        elonSpan.textContent = '$834,000,000,000 (approx)';
    } finally {
        elonSpan.classList.remove('loading');
    }
}

// ==================== INPUT WITH COMMAS ====================
const netWorthInput = document.getElementById('user-net-worth');
netWorthInput.addEventListener('input', function () {
    let val = this.value.replace(/[^0-9.]/g, '');
    if (val) {
        const parts = val.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.value = parts.join('.');
    }
});

// ==================== COMPARE BUTTON ====================
document.getElementById('net-worth-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const rawValue = netWorthInput.value.replace(/,/g, '');
    const userNetWorth = parseFloat(rawValue);
    const userAge = parseInt(document.getElementById('user-age').value);

    if (isNaN(userNetWorth) || isNaN(userAge)) {
        alert("Please enter valid numbers");
        return;
    }

    const comparison = elonNetWorth / userNetWorth;
    const daysAlive = userAge * 365.25;
    const dailyNeeded = elonNetWorth / daysAlive;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Your net worth is <span class="bold-number">$${formatNumber(userNetWorth)}</span>.</p>
        <p>Elon Musk's net worth is <span class="bold-number">${formatNumber(comparison)}</span> times yours.</p>
        <p>To match Elon Musk's net worth, you would need to have earned <span class="bold-number">$${formatNumber(dailyNeeded)}</span> per day since birth.</p>
    `;
});

// ==================== START EVERYTHING ====================
document.getElementById('elon-net-worth').classList.add('loading');
document.getElementById('elon-net-worth').textContent = 'Loading...';

updateElonNetWorth();
setInterval(updateElonNetWorth, 60000);   // refresh every minute
