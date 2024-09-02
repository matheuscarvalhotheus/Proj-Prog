import express from "express";
import minedle from './modos/minedle.js';

class HTTPError extends Error {
    constructor(message, code) {
      super(message);
      this.code = code;
    }
  }

  const router=express.Router();

  // Rota para obter tabela minigames
  router.get('/minigames', async (req, res) => {
    const tabela = "minigame";
    const resultado = await minedle.read_table(tabela)
    return res.json(resultado); 
  });
  
  // Rota para obter tabela modo_jogo
  router.get('/modos', async (req, res) => {
    const tabela = "modo_jogo";
    const resultado = await minedle.read_table(tabela)
    return res.json(resultado);
  });

  // Rota para obter assets mobs
  router.get('/mobs/assets', async (req, res) => {
    const nome = "mobs"
    const tabela = "minigame";
    const resultado = await minedle.read_assets(nome,tabela)
    return res.json(resultado); 
  });
      
export default router;