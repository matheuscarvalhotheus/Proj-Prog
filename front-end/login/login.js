import Auth from "../tokenhandling.js"

const erro=document.getElementsByClassName("erro")
const errormessages= ["Este campo não pode estar vazio!","Email ou senha incorretos/inválidos!" ]
window.handleform = async () => {
    let flag=false
    const email = document.getElementById('email').value;
    const password = document.getElementById('senha').value;
    if(!email){
        erro[0].innerHTML = errormessages[0]
        flag=true
    } else {
         erro[0].innerHTML = ""
    }
    if(!password){
        erro[1].innerHTML = errormessages[0]
        flag=true
    } else {
        erro[1].innerHTML = ""
    }
    if(!flag){
    const user = JSON.stringify({email: email, pass: password})
    const url = "http://localhost:3000/login"
    try{
        const response=await fetch(url, {
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: user,
            });
        if(response.status === 401){
           for(let i=0; i<erro.length; i++){
            erro[i].innerHTML = errormessages[1]
           }
           flag=true
        } else {
        const result = await response.json();
        if(result.flag){
         Auth.login(result.token);
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

