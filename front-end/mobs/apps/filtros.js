function mobnomes(jason_a){
    var lista=[];
    for(let i = 0; i<jason_a.length; i++){
    lista[i]=Object.values(jason_a[i])[0];
    }
    return lista;
  }

  export default {mobnomes};