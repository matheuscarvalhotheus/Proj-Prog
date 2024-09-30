import express from "express";
import minedle from './modos/minedle.js';
import register from '../middleware/registerauth/register.js'
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
  
  // Rota para obter tabela os modos de jogo e dificuldades pela tabela games
  router.get('/modos', async (req, res) => {
    const resultado = await minedle.read_gamemodes()
    return res.json(resultado)
  });

  // Rota para obter as respostas de mobs
    router.get('/mobs/solutions', async (req, res) => {
    const nome = "Mobs"
    const tabela = "solutions";
    const resultado = await minedle.join_minigame(nome,tabela)
    return res.json(resultado)
});

  // Rota para obter a quantidade de tentativas referentes a cada modo de jogo e suas dificuldades de Mobs
    router.get('/mobs/gameSettings', async (req, res) => {
    const nome = "Mobs"
    const tabela = "gameSettings";
    const resultado = await minedle.join_minigame(nome,tabela)

    const valores = []
    for(let each of resultado){
      const obj = await minedle.read_gamemodes(each.gameId)
      obj["tries"] = each.tries
      valores.push(obj)
    }
    return res.json(valores)
});
  // Rota para cadastra novo usuário
    router.post('/newuser', async (req, res) => {
    const newUser = req.body;
    
    return res.json()
    })
      
export default router;