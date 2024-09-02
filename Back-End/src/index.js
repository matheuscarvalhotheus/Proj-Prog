import express from "express";
import cors from 'cors';
import router from './routes.js';


const server = express();
const PORT = 3000;

//poder interagir com outros dominios
server.use(
  cors(
    {
  origin:'*',
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
})
);

//entradas vem como json
server.use(express.json());

//rotas
server.use(router);

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`Servidor está rodando em http://localhost:3000`);
});

