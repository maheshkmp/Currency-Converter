document.addEventListener('DOMContentLoaded', () => {
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const amountInput = document.getElementById('amount');
    const resultParagraph = document.getElementById('result');
    const convertButton = document.getElementById('convertButton');

    const apiKey = 'YOUR_API_KEY'; // Replace with your API key from a currency exchange API
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD'; // Example API URL

    // Fetch currency data and populate dropdowns
    async function populateCurrencies() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const currencies = Object.keys(data.rates);

            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrencySelect.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrencySelect.appendChild(option2);
            });

            // Set default selected options
            fromCurrencySelect.value = 'USD';
            toCurrencySelect.value = 'EUR';
        } catch (error) {
            console.error('Error fetching currency data:', error);
            resultParagraph.textContent = 'Failed to load currency data.';
        }
    }

    // Convert currency
    async function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || amount <= 0) {
            resultParagraph.textContent = 'Please enter a valid amount.';
            return;
        }

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const rates = data.rates;

            if (!rates[fromCurrency] || !rates[toCurrency]) {
                resultParagraph.textContent = 'Invalid currency selected.';
                return;
            }

            const rate = rates[toCurrency] / rates[fromCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            resultParagraph.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        } catch (error) {
            console.error('Error converting currency:', error);
            resultParagraph.textContent = 'Failed to convert currency.';
        }
    }

    convertButton.addEventListener('click', convertCurrency);
    populateCurrencies();
});
