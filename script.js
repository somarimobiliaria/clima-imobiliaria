// Chave da API e URL da Climatempo
const apiKey = "0220be233357c16ece1bbcfa7d6b8933";
const cityId = "380"; // ID de Joaçaba
const url = `https://apiadvisor.climatempo.com.br/api/v1/weather/locale/${cityId}/current?token=${apiKey}`;

// Elementos do DOM
const localizacao = document.getElementById("localizacao");
const iconeClima = document.getElementById("icone-clima");
const descricaoClima = document.getElementById("descricao-clima");
const temperatura = document.getElementById("temperatura");
const umidade = document.getElementById("umidade");
const sensacao = document.getElementById("sensacao");
const pressao = document.getElementById("pressao");
const vento = document.getElementById("vento");

// Mapeamento de ícones da Climatempo para Weather Icons
const weatherIcons = {
    "1": "wi-day-sunny",
    "2": "wi-day-cloudy",
    "3": "wi-cloudy",
    "4": "wi-showers",
    "5": "wi-rain",
    "6": "wi-thunderstorm",
    "7": "wi-snow",
    "8": "wi-fog"
};

// Função para buscar e exibir os dados do clima
async function carregarClima() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Atualiza os elementos da página
        localizacao.textContent = `${data.name}, ${data.state}`;
        descricaoClima.textContent = data.data.condition;
        temperatura.textContent = `Temperatura: ${data.data.temperature}°C`;
        umidade.textContent = `Umidade: ${data.data.humidity}%`;
        sensacao.textContent = `Sensação Térmica: ${data.data.sensation}°C`;
        pressao.textContent = `Pressão: ${data.data.pressure} hPa`;
        vento.textContent = `Vento: ${data.data.wind_velocity} km/h (${data.data.wind_direction})`;

        // Define o ícone do clima
        const iconCode = data.data.icon;
        iconeClima.className = `wi ${weatherIcons[iconCode] || "wi-na"}`;
    } catch (error) {
        console.error("Erro ao buscar os dados do clima:", error);
        localizacao.textContent = "Erro ao carregar dados";
    }
}

// Chama a função ao carregar a página
carregarClima();
