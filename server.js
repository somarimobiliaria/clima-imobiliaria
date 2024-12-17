const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware para adicionar o cabeçalho CORS manualmente
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Permite todas as origens
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get('/api/v1/weather/locale/:id/current', async (req, res) => {
    const { id } = req.params;
    const token = '0220be233357c16ece1bbcfa7d6b8933'; // Seu token da API
    const apiUrl = `https://apiadvisor.climatempo.com.br/api/v1/weather/locale/${id}/current?token=${token}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).json({ error: 'Erro ao buscar os dados do clima' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy rodando na porta ${PORT}`);
});
