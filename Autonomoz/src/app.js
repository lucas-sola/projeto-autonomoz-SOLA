const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json()); // Essencial para ler JSON do Postman
app.use(express.urlencoded({ extended: true })); // Suporte extra para formulários

app.use(express.static(path.join(__dirname, 'view/Jornal-SESI-Final-main')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/Jornal-SESI-Final-main/index.html'));
});

app.use('/api', routes); // Prefixo obrigatório: http://localhost:3000/api/...

module.exports = app;