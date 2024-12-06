import {emailval,passwordval} from "./datavalidation.js"
import Auth from "../tokenhandling.js"

const erro=document.getElementsByClassName("erro")
const errormessages= ["Este campo não pode estar vazio!" ]
window.handleform = async () => {
    let flag=false
    const email = document.getElementById('email');
    const password = document.getElementById('senha');
    flag = inputcheck(email,erro[0],errormessages,emailval(email.value),flag)
    flag = inputcheck(password,erro[1],errormessages,passwordval(password.value),flag)
    if(!flag){
    const user = JSON.stringify({email: email.value, pass: password.value})
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