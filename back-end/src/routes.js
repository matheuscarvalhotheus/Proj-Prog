import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import minedle from './modos/minedle.js';
import register from '../middleware/registerauth/register.js'
import validatoken from '../middleware/validatoken.js'

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

  router.get('/me', validatoken, async (req, res) => {
  try {
    const userdata = await minedle.search_user(req.useremail);
    if (!userdata) {
      return res.status(404).json({ message: 'usuário não encontrado' });
    }
  
    const { password, ...safeuser } = userdata;

    return res.status(200).json(safeuser);
  } catch (err) {
    console.error(err);
    return res.status(500).json();
  }})

  // Rota para cadastra novo usuário
    router.post('/newuser', async (req, res) => {
    if(req.body){
    const newUser = req.body;
    const resultado=await register(newUser)
    return res.status(resultado[0]).json(resultado[1])
    }
    return res.status(400).json({fail:"nenhum dado enviado"})
    })

    router.post('/login', async (req,res) => {
      try{
        if(req.body){
        const {email, pass} = req.body;
        const {email: useremail,password: userpass} = await minedle.search_user(email)
        const valid = await bcrypt.compare(pass,userpass)
        if(valid){
        const token = jwt.sign(
          {useremail},
          process.env.DATABASE_KEY,{
            expiresIn: 3600000}
          );
        
        return res.json({flag:true,token: token})
        } 
        return res.status(401).json()
      }
        return res.status(404).json()
    }catch(err){
      return res.status(401).json()
    }
  })
  
      
    
export default router;