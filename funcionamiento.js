// Clave de API (asegúrate de cambiarla por tu propia API key)
const apiKey = '77e05e478492307ed04440be';
const apiURL = 'https://v6.exchangerate-api.com/v6/' + apiKey + '/latest/';

// Función para manejar la conversión de divisas
document.getElementById('currency-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let amount = document.getElementById('amount').value;
    let fromCurrency = document.getElementById('from-currency').value;
    let toCurrency = document.getElementById('to-currency').value;

    if (amount === '' || isNaN(amount)) {
        alert('Por favor ingresa una cantidad válida');
        return;
    }

    // Realizar la solicitud a la API para obtener los tipos de cambio
    fetch(apiURL + fromCurrency)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                let rate = data.conversion_rates[toCurrency];
                let convertedAmount = (amount * rate).toFixed(2);
                
                document.getElementById('result').innerHTML = 
                    ${amount} ${fromCurrency} equivale a ${convertedAmount} ${toCurrency};
            } else {
                document.getElementById('result').innerHTML = 'Error al obtener los tipos de cambio.';
            }
        })
        .catch(error => {
            console.error('Error al conectar con la API:', error);
            document.getElementById('result').innerHTML = 'No se pudo realizar la conversión.';
        });
});
