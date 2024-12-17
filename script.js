async function carregarClima() {
    const apiUrl = 'https://proxy-climatempo.onrender.com/api/v1/weather/locale/380/current?token=0220be233357c16ece1bbcfa7d6b8933';
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Erro ao acessar a API');

        const data = await response.json();
        const clima = document.getElementById('clima');

        const { temperature, condition, sensation, humidity, wind_velocity, icon } = data.data;

        clima.innerHTML = `
            <i class="wi wi-day-${mapearIcone(icon)}"></i>
            <p><strong>${condition}</strong></p>
            <p>Temperatura: ${temperature}°C</p>
            <p>Sensação térmica: ${sensation}°C</p>
            <p>Umidade: ${humidity}%</p>
            <p>Vento: ${wind_velocity} km/h</p>
        `;
    } catch (error) {
        console.error('Erro ao buscar os dados do clima:', error.message);
        document.getElementById('clima').innerText = 'Erro ao carregar dados do clima.';
    }
}

function mapearIcone(icon) {
    const icones = {
        '1': 'sunny',
        '2': 'cloudy',
        '3': 'rain',
        '4': 'storm-showers',
        '5': 'snow',
        '6': 'fog',
        '7': 'showers'
    };
    return icones[icon] || 'cloud';
}

carregarClima();
