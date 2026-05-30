const JSON_URL = 'https://raw.githubusercontent.com/bottoz/bottoz.github.io/main/elon-net-worth.json';

let elonNetWorth = 834000000000;

function formatNumber(num) {
    return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

async function updateElonNetWorth() {
    const span = document.getElementById('elon-net-worth');
    const lastSpan = document.getElementById('last-updated');
    
    span.classList.add('loading');
    span.textContent = 'Loading...';

    try {
        const res = await fetch(JSON_URL + '?t=' + Date.now());
        const data = await res.json();
        
        elonNetWorth = data.netWorth;
        span.textContent = `$${formatNumber(elonNetWorth)}`;

        // Show "Last updated: X minutes ago"
        const lastTime = new Date(data.lastUpdated);
        const minutesAgo = Math.floor((Date.now() - lastTime) / 60000);
        lastSpan.textContent = minutesAgo < 1 
            ? "Last updated: just now" 
            : `Last updated: ${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
        
        document.title = `Elon Musk: $${formatNumber(elonNetWorth)} | Net Worth Comparison`;
        
    } catch (err) {
        console.error(err);
        span.textContent = '$834,000,000,000 (approx)';
        lastSpan.textContent = "Last updated: (using cached value)";
    } finally {
        span.classList.remove('loading');
    }
}

// ==================== Input commas + Compare button ====================
const netWorthInput = document.getElementById('user-net-worth');
netWorthInput.addEventListener('input', function () {
    let val = this.value.replace(/[^0-9.]/g, '');
    if (val) {
        const parts = val.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.value = parts.join('.');
    }
});

document.getElementById('net-worth-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const raw = netWorthInput.value.replace(/,/g, '');
    const userNetWorth = parseFloat(raw);
    const userAge = parseInt(document.getElementById('user-age').value || 30);

    if (isNaN(userNetWorth)) return alert("Please enter a valid net worth");

    const comparison = elonNetWorth / userNetWorth;
    const daysAlive = userAge * 365.25;
    const dailyNeeded = elonNetWorth / daysAlive;

    document.getElementById('result').innerHTML = `
        <p>Your net worth is <span class="bold-number">$${formatNumber(userNetWorth)}</span>.</p>
        <p>Elon Musk's net worth is <span class="bold-number">${formatNumber(comparison)}</span> times yours.</p>
        <p>To match Elon Musk's net worth, you would need to have earned <span class="bold-number">$${formatNumber(dailyNeeded)}</span> per day since birth.</p>
    `;
});

// Start
updateElonNetWorth();
setInterval(updateElonNetWorth, 60000);
