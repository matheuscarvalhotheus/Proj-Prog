import express from "express"


const app = express();
const PORT = 3000;


app.use(express.json());

// Array para armazenar dados temporários
let dadosTemporarios = [];

// Rota para obter todos os dados
app.get('/dados', (req, res) => {
 return res.send(index.html); 
});

// Rota para adicionar novos dados
app.post('/dados', (req, res) => {
  const novoDado = req.body;
  dadosTemporarios.push(novoDado);
  res.status(201).json(novoDado);
});

// Rota para limpar todos os dados
app.delete('/dados', (req, res) => {
  dadosTemporarios = [];
  res.status(204).end();
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor está rodando em http://localhost:3000`);
});