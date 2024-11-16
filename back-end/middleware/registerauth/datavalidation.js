export function emailval(userEmail){
    if(userEmail.length>=3&&userEmail.length<=254){
    const resultado=userEmail.match(/^.+@.+$/g)
    if(resultado){
      return true
    }
    }
    return false
}
export function nameval(userName){
  if(userName.length>=3&&userName.length<=24){
    const resultado=userName.match(/^[^\s]+(.+[^\s]+)*$/g)
    if(resultado){
      return true
    }
    }
    return false
}

export function passwordval(userPass){
  if(userPass.length>=4&&userPass.length<=32){
    const resultado=userPass.match(/^(?=.*[a-zA-Z])(?=.*[\d]).+$/g)
    if(resultado){
      return true
    }
    }
    return false
}