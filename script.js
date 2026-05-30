const API_URL = 'https://raw.githubusercontent.com/bottoz/bottoz.github.io/main/elon-net-worth.json';

let elonNetWorth = 343000000000; // fallback

function formatNumber(num) {
    return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

async function updateElonNetWorth() {
    document.getElementById('elon-net-worth').classList.add('loading');
    document.getElementById('elon-net-worth').textContent = 'Loading...';

    try {
        const response = await fetch(API_URL + '?t=' + Date.now()); // prevent cache
        const data = await response.json();
        elonNetWorth = data.netWorth || elonNetWorth;
        document.getElementById('elon-net-worth').textContent = `$${formatNumber(elonNetWorth)}`;
        document.title = `Elon Musk: $${formatNumber(elonNetWorth)} | Net Worth Comparison`;
    } catch (e) {
        console.error(e);
        document.getElementById('elon-net-worth').textContent = '$834,000,000,000 (approx)';
    } finally {
        document.getElementById('elon-net-worth').classList.remove('loading');
    }
}

// Initial load + every 60 seconds
updateElonNetWorth();
setInterval(updateElonNetWorth, 60000);

// Keep all your existing input formatting and form code below...
// (your comma input listener + submit handler stay exactly the same)
