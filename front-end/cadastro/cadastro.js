import {emailval,nameval,passwordval} from "./datavalidation.js"

const errormessages = ["Este campo não pode estar vazio!",]
const erro = document.getElementsByClassName("erro")
var lastinvalidemail= ""

function inputcheck(input,error,errorlist,valresult,flag){
  if(!input.value){
      error.innerHTML=errorlist[0]
      return true
  }
  if(valresult){
  error.innerHTML=valresult
  return true
  }
  error.innerHTML=""
  return flag
}

const envio = document.getElementById("envio")

envio.onsubmit = (event) => {
event.preventDefault();
}

window.cadastro = async function(event){
let flag=false
let nome=document.getElementById("nome")
flag = inputcheck(nome,erro[0],errormessages,nameval(nome.value),flag)
let email=document.getElementById("email")
flag = inputcheck(email,erro[1],errormessages,emailval(email.value),flag)
let senha=document.getElementById("senha")
flag = inputcheck(senha,erro[2],errormessages,passwordval(senha.value),flag)
let csenha=document.getElementById("csenha").value
if(csenha&&csenha!=senha.value){
    erro[3].innerHTML = "As senhas devem ser iguais!"
    flag=true
} else if(!csenha){
    erro[3].innerHTML = errormessages[0]
    flag=true
} else {
    erro[3].innerHTML = ""
}

if(!flag){
    const dados = JSON.stringify({name:nome.value,email:email.value,password:senha.value})
    const url = "http://localhost:3000/newuser";
    try {
      const request = new Request(url,  {
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: dados,
    });
      const response = await fetch(request);
      if(response.status == 409){
        erro[1].innerHTML = "E-mail indisponível!"
        lastinvalidemail=email.value
        flag=true
      } else if(response.status==200){
        console.log("usuário criado")
            window.location.href = ".././login/login.html"
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

function elementhighlight(element,highlight,timer){
  element.classList.add(highlight)
  setTimeout(() => {
      element.classList.remove(highlight)
      }
      , timer)
  }