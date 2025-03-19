// Function to populate the dropdown
function populateCurrencyList() {
    const fromCurrencyDropdown = document.getElementById("fromCurrency");
    const toCurrencyDropdown = document.getElementById("toCurrency");

    fromCurrencyDropdown.innerHTML = "";
    toCurrencyDropdown.innerHTML = "";

    for (const [currencyCode, countryData] of Object.entries(countryList)) {
        const option = document.createElement("option");
        option.value = currencyCode;
        option.textContent = `${currencyCode} (${countryData.country})`;

        fromCurrencyDropdown.appendChild(option.cloneNode(true));
        toCurrencyDropdown.appendChild(option);
    }
}

// Function to swap the selected currencies
function swapCurrencies() {
    const fromCurrencyDropdown = document.getElementById("fromCurrency");
    const toCurrencyDropdown = document.getElementById("toCurrency");

    let temp = fromCurrencyDropdown.value;
    fromCurrencyDropdown.value = toCurrencyDropdown.value;
    toCurrencyDropdown.value = temp;
}

// Auto-detect user's currency
function detectUserCurrency() {
    fetch("https://ipapi.co/currency/")
        .then(response => response.text())
        .then(currency => {
            if (countryList[currency]) {
                document.getElementById("fromCurrency").value = currency;
            }
        })
        .catch(error => console.error("Currency detection failed:", error));
}

// Convert currency using API
async function convertCurrency() {
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const amount = document.getElementById("amount").value;

    if (!fromCurrency || !toCurrency) {
        alert("Please select both currencies.");
        return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    const apiKey = "72ba385accef094359368b9a"; // Replace with your API key
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === "success") {
            const fromRate = data.conversion_rates[fromCurrency];
            const toRate = data.conversion_rates[toCurrency];

            if (fromRate && toRate) {
                const convertedAmount = ((amount / fromRate) * toRate).toFixed(2);
                const fromSymbol = countryList[fromCurrency]?.symbol || "";
                const toSymbol = countryList[toCurrency]?.symbol || "";

                document.getElementById("result").textContent =
                    `${amount} ${fromSymbol} (${fromCurrency}) = ${toSymbol} ${convertedAmount} (${toCurrency})`;
            } else {
                document.getElementById("result").textContent = "Conversion rate not found.";
            }
        } else {
            document.getElementById("result").textContent = "Error fetching conversion rates.";
        }
    } catch (error) {
        console.error(error);
        document.getElementById("result").textContent = "An error occurred. Please try again later.";
    }
}

// Initialize functions on page load
window.onload = function () {
    populateCurrencyList();
    detectUserCurrency();
};
