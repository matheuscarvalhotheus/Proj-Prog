import bcrypt from "bcrypt"
import { emailval, passwordval, nameval } from "./datavalidation.js"
import minedle from "../../../src/modos/minedle.js"
import nodemailer from 'nodemailer';
import mailConfig from "../../../src/config/mail.js"

async function register(newUser){
    try{
        const newName=newUser.name
        const newEmail=newUser.email
        const newPass=newUser.password
            if(((emailval(newEmail))&&(passwordval(newPass)))&&(nameval(newName))){
                const db = await minedle.search_user(newEmail)
                if(!db){
                const hash = await bcrypt.hash(newPass,10)
                const user={ email:newEmail,name:newName,password:hash,auth:false,typeId:2 }
                const resultado = await minedle.insert_into_table("user",user)
                const{password,Id,passcode, ...validnewUser} = resultado
                
                const validatecode = await bcrypt.hash(Id,10)
                const config = await mailConfig()
                const emissor = nodemailer.createTransport(config)
                const info = await emissor.sendMail({
                    from: config.auth.user,
                    to: user.email,
                    subject:"Validação da sua conta",
                    text:"Conta criada com sucesso.\nAperte o botão para validar a sua conta:",
                    html:`<h2>Conta criada com sucesso.</h2><p>Aperte o botão para validar a sua conta:</p><button style='#envio{background-color: #669244;color: white;border: 0px ;border-radius: 5px;padding:15px;}#envio:hover{scale:1.05;filter:brightness(1.2);}#envio:active{scale:0.9;filter:brightness(0.85);}'><a href='http://127.0.0.1:5500/front-end/login/login.html?validar=${validatecode+"&riYt7="+user.email}'>Validar<a></button>`,
                })
                
                return [200,validnewUser]
                }
                return [409,{fail : "usuário já existe"}]
            }
            return [400,{fail : "nome, senha ou email inválidos"}]
    }catch(error){
        console.log(error)
        return [500,{ error: "um erro ocorreu durante o registro" }]
    }
}
export default register