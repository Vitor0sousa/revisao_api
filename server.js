// server.js
const express = require('express');
const app = express();

// Middleware para o Express entender JSON no corpo das requisições
app.use(express.json());

// Importando as rotas
const clientRoutes = require('./routes/clients');
const orderRoutes = require('./routes/orders');

// Definindo os prefixos das rotas
app.use('/api/clients', clientRoutes);
app.use('/api/orders', orderRoutes);

// Rota raiz para teste
app.get('/', (req, res) => {
    res.json({
        message: 'API rodando!',
        timestamp: new Date().toISOString()
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}` );
});

module.exports = app;
