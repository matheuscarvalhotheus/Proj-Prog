import express from "express";
import {z} from "zod";
import { datacheck } from "../middleware/validate.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import minedle from './modos/minedle.js';
import register from '../middleware/auth/registerauth/register.js'
import validatoken from '../middleware/auth/validatoken.js'
import GetUserScore from "./modos/getuserscore.js";

const validateschema =  z.object({
  headers: z.object({
    authorization: z.string().optional()
  })
})


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
      obj["multiplier"]=each.multiplier
      valores.push(obj)
    }
    return res.json(valores)
});
  //newhighscore validation DONE
  router.post('/newhighscore',  
  datacheck(validateschema)
  , validatoken,
     datacheck( z.object({
      body: z.object({
        mini: z.string(),
        mode: z.string(),
        highscore: z.number().max(10000)
      })
    }))
    , async (req,res) => {
    try{
    if(req.body&&req.body.highscore){
    const mininame = req.body.mini
    const modename = req.body.mode

    if(mininame&&modename){
    const [miniid,modeid] = await minedle.minimodevalidation(mininame,modename)
    
    if(miniid&&modeid){
    const result = await minedle.create_newhighscore(req.useremail,miniid.id,modeid.id,req.body.highscore)
    return res.status(result[0]).json(result[1])
    }
    return res.status(409).json()
    }
    return res.status(409).json()
    }
    return res.status(400).json()
     }catch(err){
    console.log(err)
    return res.status(500).json()
    }
  })
  //
  
  //GET score DONE
  router.get("/score/:mini/:mode"
    , datacheck(validateschema)
    , validatoken
    , datacheck(z.object({
      params: z.object({
        mini: z.string(),
        mode: z.string()
      })
    }
    ))
    , async(req, res)=>{
    const mini = req.params.mini;
    const mode = req.params.mode;
    if(mini&&mode){
      const [miniid,modeid] = await minedle.minimodevalidation(mini,mode)
    //Assumindo que você estão pegando o email dele quando verificam a autenticação;
    const email = req.useremail
 
    const playerData = await GetUserScore.get_user_score(email, miniid.id, modeid.id)
 
   return res.status(playerData[0]).json(playerData[1]);
    }
    return res.status(400).json()
 })
  //  

  //DONE
  router.get('/me'
  , datacheck(validateschema)
  , validatoken
  , async (req, res) => {
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
  //

  //New user DONE
  // Rota para cadastra novo usuário
    router.post('/newuser'
    , datacheck(z.object({
      body: z.object({
        name: z.string(),
        email: z.string(),
        password: z.string()
      })
    }))  
    , async (req, res) => {
    if(req.body){
    const newUser = req.body;
    const resultado=await register(newUser)
    return res.status(resultado[0]).json(resultado[1])
    }
    return res.status(400).json({fail:"nenhum dado enviado"})
    })
    //

    //DONE
    router.post('/login'
      , datacheck( z.object({
        body: z.object({
          email: z.string(), 
          pass: z.string()
        })
      }))
      , async (req,res) => {
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
  //
      
    
export default router;