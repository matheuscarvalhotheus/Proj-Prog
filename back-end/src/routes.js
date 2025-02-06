import express from "express";
import {z} from "zod";
import { datacheck } from "../middleware/validate.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import minedle from './modos/minedle.js';
import register from '../middleware/auth/registerauth/register.js'
import validatoken from '../middleware/auth/validatoken.js'
import GetUserScore from "./modos/getuserscore.js";
import mailConfig from "./config/mail.js";
import nodemailer from "nodemailer";
import { passwordval } from "../middleware/auth/registerauth/datavalidation.js";
import multerconfig from "./config/multer.js";
import multer from "multer";

const upload=multer(multerconfig)

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
  
    const { password,Id,passcode, ...safeuser } = userdata;

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
        const {email: useremail,password: userpass,auth: auth} = await minedle.search_user(email)
        const valid = await bcrypt.compare(pass,userpass)
        if(valid){
        const token = jwt.sign(
          {useremail},
          process.env.DATABASE_KEY,{
            expiresIn: 3600000}
          );
        if(!auth){
          return res.status(403).json("Valide o seu Email");
        }
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
  router.get('/validate-email', 
    datacheck(validateschema),
    async (req,res) => {
      const validatecode = req.headers.authorization;
      if (!validatecode) {
        return res.status(404).json({ message: 'token não encontrado' });
      }

      const [, emailtoken] = validatecode.split(' ');
      const [token,email] = emailtoken.split('#%$%#');

      const {Id: userid,auth:auth} = await minedle.search_user(email)
      if(!auth){
      const valid = await bcrypt.compare(userid,token)

      if(valid){
        minedle.validateuser(userid)
        return res.status(200).json();
      }
      }
      return res.status(401).json();
  })

  router.get('/pass-change-init', 
    datacheck(validateschema), 
    validatoken, 
    async (req, res) => {
      try{
      const {Id: userid,auth: auth} = await minedle.search_user(req.useremail)
      if(auth){
      const validatecode = await bcrypt.hash(userid,10)
      const e = await minedle.pass_change_init(userid,validatecode)

      const config = await mailConfig()
      const emissor = nodemailer.createTransport(config)
      const info = await emissor.sendMail({
          from: config.auth.user,
          to: req.useremail,
          subject:"Trocar Senha",
          text:"Aperte o botão para iniciar o processo de trocar a sua senha:",
          html:`<h2>Aperte o botão para iniciar o processo de trocar a sua senha:</h2><button><a href='http://127.0.0.1:5500/front-end/cadastro/data_change.html?validar=${validatecode}'>Validar<a></button>`,
  
        })
      } 
    }catch(err){
      return res.status(401).json()
    }
    })

    router.post('/pass-change'
      ,  datacheck(validateschema), 
      validatoken, datacheck( z.object({
        body: z.object({
          newpass: z.string(), 
          passcode: z.string()
        })
      }))
      , async (req,res) => {
      try{
        if(req.body){
        const {newpass, passcode} = req.body;
        const {Id: id,passcode: userpass,auth: auth} = await minedle.search_user(req.useremail)
        if(userpass&&passcode){
        if(passcode==userpass){
          var valid=true
        } else {
          var valid=false}
        } else {
        var valid = false
        }

        if(valid){
        if(passwordval(newpass)){

        const hash = await bcrypt.hash(newpass,10)
        const resultado = await minedle.pass_change(id,hash)
        return res.status(200).json()
        }
        return res.status(400).json()
        } 
        return res.status(403).json()
      }
        return res.status(400).json()
    }catch(err){
      return res.status(401).json({erro:err})
    }
  })

  router.post('/newicon'
    ,  datacheck(validateschema), 
    validatoken, upload.single('image')
    , async (req,res) => {
    try{
      if(req.body){
      const {Id:id} = await minedle.search_user(req.useremail)
      
      if(req.file){
        const path = `back-end/public/imgs/${req.file.filename} `
        const resultado = await minedle.upload_img(id,path,"icon")
        res.status(resultado[0])
      }
    }
  }catch(err){
    return res.status(400).json({erro:err})
  }
})

router.post('/newbackground'
  ,  datacheck(validateschema), 
  validatoken, upload.single('image')
  , async (req,res) => {
  try{
    if(req.body){
    const {Id:id} = await minedle.search_user(req.useremail)
    
    if(req.file){
      const path = `back-end/public/imgs/${req.file.filename} `
      const resultado = await minedle.upload_img(id,path,"background")
      res.status(resultado[0])
    }
  }
}catch(err){
  return res.status(400).json({erro:err})
}
})
      
    
export default router;