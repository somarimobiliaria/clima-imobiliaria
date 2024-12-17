const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para habilitar CORS
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Endpoint do proxy
app.get('/api/v1/weather/locale/:id/current', async (req, res) => {
    const { id } = req.params;
    const token = '0220be233357c16ece1bbcfa7d6b8933'; // Seu token da API Climatempo
    const apiUrl = `https://apiadvisor.climatempo.com.br/api/v1/weather/locale/${id}/current?token=${token}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Erro na API externa: ${response.statusText}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
        res.status(500).json({ error: 'Erro ao buscar os dados do clima' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Proxy rodando na porta ${PORT}`);
});


app.listen(PORT, () => {
    console.log(`Proxy rodando na porta ${PORT}`);
});
