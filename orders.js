const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET: Listar todos os pedidos com informações do cliente
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT o.*, c.name as client_name, c.email as client_email
            FROM orders o
            JOIN clients c ON o.client_id = c.client_id
            ORDER BY o.created_at DESC`;
        const orders = await pool.query(query);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST: Criar um novo pedido
router.post('/', async (req, res) => {
    const { client_id, order_date, total_amount, status } = req.body;
    if (!client_id || !order_date || !total_amount) {
        return res.status(400).json({ error: 'client_id, order_date e total_amount são obrigatórios' });
    }
    try {
        const result = await pool.query(
            'INSERT INTO orders (client_id, order_date, total_amount, status) VALUES (?, ?, ?, ?)',
            [client_id, order_date, total_amount, status || 'pending']
        );
        // CORREÇÃO APLICADA AQUI
        res.status(201).json({ order_id: Number(result.insertId), message: 'Pedido criado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
