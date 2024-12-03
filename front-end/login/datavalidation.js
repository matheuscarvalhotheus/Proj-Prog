export function emailval(userEmail){
    let resultado=userEmail.match(/^(.){3,}$/g)
    if(!resultado){
    return "Email curto demais!"
    }
    resultado=userEmail.match(/^(.){0,254}$/g)
    if(!resultado){
    return "Email longo demais!"
    }
    resultado=userEmail.match(/^.+@.+$/g)
    if(!resultado){
    return "Este email possui caracteres ou formatação inválida"
    }
    return false
}


export function passwordval(userPass){
    let resultado=userPass.match(/^(.){4,}$/g)
    if(!resultado){
      return "A senha deve conter, no mínimo, 4 caracteres"
    }
    resultado = userPass.match(/^(.){0,32}$/g)
    if(!resultado){
      return "A senha deve conter, no máximo, 32 caracteres"
    }

    return false  
}
