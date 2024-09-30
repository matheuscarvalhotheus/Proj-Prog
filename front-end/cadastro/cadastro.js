import {emailval,nameval,passwordval} from "./datavalidation.js"

window.cadastro = async function(){
let nome=document.getElementById("nome").value
let email=document.getElementById("email").value
let senha=document.getElementById("senha").value
let csenha=document.getElementById("csenha").value
if(tratatex(nome,email,senha,csenha)){
    const dados = JSON.stringify({name:nome,email:email,password:senha})
    const url = "http://localhost:3000/newuser";
    try {
      const request = new Request(url,  {
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: dados,
    });
      const response = await fetch(request);
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  }    
}


function tratatex(nome,email,senha,csenha){
let flag=false
if(!nome){
    let erro="Este campo é Obrigatório!"
    document.getElementById("e_nome").innerHTML=erro
    flag=true
} else if(!nameval(nome)){
    let erro="Nome Inválido!"
    document.getElementById("e_email").innerHTML=erro
    flag=true
} else{
    document.getElementById("e_nome").innerHTML=""
}
if(!email){
    let erro="Este campo é Obrigatório!"
    document.getElementById("e_email").innerHTML=erro
    flag=true
} else if(!emailval(email)){
    let erro="Email Inválido!"
    document.getElementById("e_email").innerHTML=erro
    flag=true
}else{
    document.getElementById("e_email").innerHTML=""
}
if(!senha){
    let erro="Este campo é Obrigatório!"
    document.getElementById("e_senha").innerHTML=erro
    flag=true
}else if(senha!=csenha){
    let erro="As senhas devem ser iguais!"
    document.getElementById("e_senha").innerHTML=erro  
    document.getElementById("e_senha").innerHTML=erro
    flag=true
}else if(!passwordval(senha)){
    let erro="Senha Inválida!"
    document.getElementById("e_senha").innerHTML=erro
    flag=true
} else{
    document.getElementById("e_senha").innerHTML=""
}
if(!csenha){
    let erro="Este campo é Obrigatório!"
    document.getElementById("e_csenha").innerHTML=erro
    flag=true
} else if(senha!=csenha){
    let erro="As senhas devem ser iguais!"
    document.getElementById("e_csenha").innerHTML=erro  
    document.getElementById("e_csenha").innerHTML=erro 
    flag=true  
} else{
    document.getElementById("e_csenha").innerHTML=""
}
if(flag){
return false
}
return true
}

