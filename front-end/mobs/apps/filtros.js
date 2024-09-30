function mobnomes(jason_a){
    var lista=[];
    for(let i = 0; i<jason_a.length; i++){
    lista[i]=jason_a[i]["answer"];
    }
    return lista;
  }

  export default {mobnomes};