export function emailval(userEmail){
    const resultado=userEmail.match(/^[^\s]+@[^\s]+$/g)
    if(resultado){
      return true
    }
    return false
}
export function nameval(userName){
  const resultado=userName.match(/^([^\s]+(.+[^\s]+)*){2,24}$/g)
  if(resultado){
      return true
    }
    return false  
}

export function passwordval(userPass){
    const resultado=userPass.match(/^((?=.*[a-zA-Z])(?=.*[\d]).+){4,20}$/g)
    if(resultado){
        return true
      }
      return false  
}
