import express from "express"
import {mobs} from "mob-dados.js"
import {mobs_tentativas} from "tentativa-dadosTemporarios.js"

const app = express();
const PORT = 3000;

app.use(express.json());

// Rota para obter todos os dados
app.get('/mobs', (req, res) => {
 return res.send(mobs); 
});

// Rota para adicionar novos dados
app.post('/mobs/tentativas', (req, res) => {
  var novodado = req.body;
  mobs_tentativas.push(novodado);
  res.status(201).json(novodado);
});

// Rota para limpar todos os dados
app.get('/mobs/tentativas', (req, res) => {
  res.send(mobs_tentativas)
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor está rodando em http://localhost:3000`);
});