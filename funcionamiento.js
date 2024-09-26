// Clave de API (asegúrate de cambiarla por tu propia API key)
const apiKey = '8f2073b4eebe95b9b6f0b641beb529aa';
const apiURL = 'http://data.fixer.io/api/latest?access_key=' + apiKey;

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
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Obtener las tasas de cambio con base en EUR
                let fromRate = data.rates[fromCurrency];
                let toRate = data.rates[toCurrency];

                // Comprobar si existen las tasas de cambio para las monedas seleccionadas
                if (fromRate && toRate) {
                    // Convertir primero de la moneda base (EUR) a la moneda origen y luego a la moneda destino
                    let convertedAmount = (amount / fromRate * toRate).toFixed(2);
                    document.getElementById('result').innerHTML = 
                        `${amount} ${fromCurrency} equivale a ${convertedAmount} ${toCurrency}`;
                } else {
                    document.getElementById('result').innerHTML = 
                        'No se pudo encontrar la tasa de cambio para las monedas seleccionadas.';
                }
            } else {
                document.getElementById('result').innerHTML = 'Error al obtener los tipos de cambio.';
            }
        })
        .catch(error => {
            console.error('Error al conectar con la API:', error);
            document.getElementById('result').innerHTML = 'No se pudo realizar la conversión.';
        });
});
