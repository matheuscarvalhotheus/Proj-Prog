var selecionar = "";

var game_configs = await dados("/modos")
var modos = []
var dificuldades = []
for(let i of game_configs){
    modos.push(i.nome);
    dificuldades.push(eval(i.dif_opcoes))
}
var g_atual=0;
var d_atual=0;
if(dificuldades[g_atual].length == 1){
    var unico=true;
} else {
    var unico=false;
}
if(unico){
    document.getElementById("difbt").style.color = "red";
} else {
    document.getElementById("difbt").style.color = "black";
}
document.getElementById("modobt").innerHTML = `Modo de Jogo: ${modos[g_atual]}`
document.getElementById("difbt").innerHTML = `Dificuldade: ${dificuldades[g_atual][d_atual]}`

window.validar = function(indice){
if(indice=="cancelar"){
    selecionar = ""
    document.getElementById("caminho").href = selecionar;
    document.getElementById("modo1").style.border = "";
    document.getElementById("modo2").style.border = "";
    document.getElementById("modo3").style.border = "";
    document.getElementById("modo4").style.border = "";
    document.getElementById("modo5").style.border = "";
}else if(indice=="mobs"){
    selecionar = "../mobs/mobs.html";
    document.getElementById("caminho").href = selecionar;
    document.getElementById("modo1").style.border = "inset 4px";
    document.getElementById("modo2").style.border = "";
    document.getElementById("modo3").style.border = "";
    document.getElementById("modo4").style.border = "";
    document.getElementById("modo5").style.border = "";
} else if(indice=="pocao"){
    selecionar = "";
    document.getElementById("caminho").href = selecionar;
    document.getElementById("modo2").style.border = "inset 4px";
    document.getElementById("modo1").style.border = "";
    document.getElementById("modo3").style.border = "";
    document.getElementById("modo4").style.border = "";
    document.getElementById("modo5").style.border = "";
}else if(indice=="bloco"){
    selecionar = "";
    document.getElementById("caminho").href = selecionar;
    document.getElementById("modo3").style.border = "inset 4px";
    document.getElementById("modo2").style.border = "";
    document.getElementById("modo1").style.border = "";
    document.getElementById("modo4").style.border = "";
    document.getElementById("modo5").style.border = "";
}else if(indice=="quebra-cabeca"){
    selecionar = "";
    document.getElementById("caminho").href = selecionar;
    document.getElementById("modo4").style.border = "inset 4px";
    document.getElementById("modo2").style.border = "";
    document.getElementById("modo3").style.border = "";
    document.getElementById("modo1").style.border = "";
    document.getElementById("modo5").style.border = "";
}else if(indice=="quiz"){
    selecionar = "";
    document.getElementById("caminho").href = selecionar;
    document.getElementById("modo5").style.border = "inset 4px";
    document.getElementById("modo2").style.border = "";
    document.getElementById("modo3").style.border = "";
    document.getElementById("modo4").style.border = "";
    document.getElementById("modo1").style.border = "";
};

}

window.gamemode = async function(){
    g_atual+=1;
    if(g_atual == modos.length){
        g_atual=0;
    }

    if(dificuldades[g_atual].length == 1){
        unico=true;
    } else {
        unico=false;
    }

    if(unico){
        document.getElementById("difbt").style.color = "red";
    } else{
        document.getElementById("difbt").style.color = "black";
    }

    document.getElementById("modobt").innerHTML = `Modo de Jogo: ${modos[g_atual]}`
    d_atual=0;
    document.getElementById("difbt").innerHTML = `Dificuldade: ${dificuldades[g_atual][d_atual]}`

}

window.dificulty = async function(){
    d_atual+=1;
    if(d_atual == dificuldades[g_atual].length){
        d_atual=0;
    }
    document.getElementById("difbt").innerHTML = `Dificuldade: ${dificuldades[g_atual][d_atual]}`
}

window.enviar =  function(){
    if(selecionar == ""){
        document.getElementById("caminho").href = "javascript:void(0);";
    }else{
     localStorage.setItem("mjogo",`${modos[g_atual]}`)
     localStorage.setItem("dificuldade",`${dificuldades[g_atual][d_atual]}`)
}};

async function dados(local) {
    const dominio = "http://localhost:3000";
    const url = dominio+local
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error(error.message);
    }
  }