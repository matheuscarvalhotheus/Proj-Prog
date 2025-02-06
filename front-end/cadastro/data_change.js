import token from "../tokenhandling.js"
import {passwordval} from "./datavalidation.js"

token.displaylogin();

const query = window.location.search
const urlParams = new URLSearchParams(query)
var validate = urlParams.get("validar")

const erro=document.getElementsByClassName("erro")
window.handleform = async () => {
    let flag=false
    const senha = document.getElementById('senha');
    const csenha = document.getElementById('c_senha');
    flag = inputcheck(senha,erro[0],passwordval(senha.value),flag)
    if(csenha.value&&csenha.value!=senha.value){
        erro[1].innerHTML = "As senhas devem ser iguais!"
        flag=true
    } else if(!csenha.value){
        erro[1].innerHTML = "Este campo não pode estar vazio!"
        flag=true
    } else {
        erro[1].innerHTML = ""
    }
    
    if(!flag){
    const user = JSON.stringify({newpass: senha.value, passcode:`${validate}`})
    const usertoken = token.getToken()
    const url = "http://localhost:3000/pass-change"
    try{
        const response=await fetch(url, {
            method:"POST",
            headers: {'Content-Type': 'application/json',  "Authorization" : `Bearer ${usertoken}`},
            body: user,
            });
        if(response.status === 401){
           for(let i=0; i<erro.length; i++){
            erro[i].innerHTML = "Houve um erro!"
           }
           flag=true
        } else if(response.status === 403){
            for(let i=0; i<erro.length; i++){
             erro[i].innerHTML = "Adquira um token válido para a troca de senha!"
            }
            flag=true
         } else {
        const result = await response.json();
        if(result.status===200){
        document.getElementById("notification").innerHTML = "Senha Trocada!" 
        document.querySelector(".notification").classList.add("open")
        window.location.href = "/front-end/home/home.html"
        }
    }
    } catch (error) {
        console.error(error.message);
      }
      
}
    if(flag){
        classhighlight(erro,"highlight",250)
}
}

function classhighlight(classElements,highlight,timer){
    for(let i=0; i<classElements.length; i++){
        classElements[i].classList.add(highlight)
        }
        setTimeout(() => {
            for(let i=0; i<classElements.length; i++){
                classElements[i].classList.remove(highlight)
            }}
            , timer)
    }

function inputcheck(input,error,valresult,flag){
    if(!input.value){
        error.innerHTML= "Este campo não pode estar vazio!"
        return true
    }
    if(valresult){
        error.innerHTML=valresult
        return true
    }
        error.innerHTML=""
        return flag
    }