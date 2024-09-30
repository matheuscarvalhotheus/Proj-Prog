import bcrypt from "bcrypt"
import { emailval, passwordval, nameval } from "./datavalidation.js"
import minedle from "../../src/modos/minedle.js"

async function register(newUser){
    try{
        const newName=newUser.name
        const newEmail=newUser.email
        const newPass=newUser.password
            if(((emailval(newEmail))&&(passwordval(newPass)))&&(nameval(newName))){
                const db = await minedle.search_user(newEmail)
                if(!db){
                const hash = await bcrypt.hash(newPass,10)
                const user={ email:newEmail,name:newName,password:hash,typeId:2}
                const resultado = await minedle.insert_into_table("user",user)
                const{password, ...validnewUser} = resultado
                return [200,validnewUser]
                }
                return [400,{fail : "usuário já existe"}]
            }
            return [400,{fail : "nome, senha ou email inválidos"}]
    }catch(error){
        console.log(error)
        return [500,{ error: "um erro ocorreu durante o registro" }]
    }
}
export default register