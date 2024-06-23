// index.js

const express = require('express');
const app = express();
const PORT = 80;

// Middleware para parsing do corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simulação de uma lista de usuários (para fins didáticos)
let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
];

// Rota para listar todos os usuários
app.get('/users', (req, res) => {
    res.json(users);
});

// Rota para obter um usuário específico por ID
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
});

// Rota para criar um novo usuário
app.post('/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send('Name is required');
    }
    const newUser = {
        id: users.length + 1,
        name: name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Rota para atualizar os dados de um usuário existente
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    user.name = name;
    res.json(user);
});

// Rota para deletar um usuário
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(user => user.id !== id);
    res.send('User deleted successfully');
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
