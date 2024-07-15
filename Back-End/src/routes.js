import express from "express";
import {mobs} from './data/mobdados.js';
import {mobs_tentativas} from './data/tentativadados.js';

class HTTPError extends Error {
    constructor(message, code) {
      super(message);
      this.code = code;
    }
  }

  const router=express.Router();

  // Rota para obter todos os dados
  router.get('/mobs', (req, res) => {
    return res.send(mobs); 
  });
  
  // Rota para limpar todos os dados
  router.get('/mobs/tentativas', (req, res) => {
    if(mobs_tentativas.length>0){
    return res.send(mobs_tentativas)
  } else {
    return res.send([999])
  }
  });
      

  // Rota para adicionar novos dados
  router.post('/mobs/tentativas', (req, res) => {
    var tentativa = req.body;
    if(tentativa){
    mobs_tentativas.push(tentativa);
    res.status(201).json(tentativa);
    }
  });


export default router;