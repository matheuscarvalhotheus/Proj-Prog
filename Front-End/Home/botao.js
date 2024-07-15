var selecionar = "";

window.validar = function(indice){
if(indice==1){
    selecionar = "../Mobs/mobs.html"
    document.getElementById("caminho").href = selecionar
    document.getElementById("modo1").style.border = "inset 4px"
    document.getElementById("modo2").style.border = ""
    document.getElementById("modo3").style.border = ""
    document.getElementById("modo4").style.border = ""
    document.getElementById("modo5").style.border = ""
} else if(indice==2){
    selecionar = ""
    document.getElementById("caminho").href = selecionar
    document.getElementById("modo2").style.border = "inset 4px"
    document.getElementById("modo1").style.border = ""
    document.getElementById("modo3").style.border = ""
    document.getElementById("modo4").style.border = ""
    document.getElementById("modo5").style.border = ""
}else if(indice==3){
    document.getElementById("caminho").href = selecionar
    document.getElementById("modo3").style.border = "inset 4px"
    document.getElementById("modo2").style.border = ""
    document.getElementById("modo1").style.border = ""
    document.getElementById("modo4").style.border = ""
    document.getElementById("modo5").style.border = ""
}else if(indice==4){
    document.getElementById("caminho").href = selecionar
    document.getElementById("modo4").style.border = "inset 4px"
    document.getElementById("modo2").style.border = ""
    document.getElementById("modo3").style.border = ""
    document.getElementById("modo1").style.border = ""
    document.getElementById("modo5").style.border = ""
}else if(indice==5){
    document.getElementById("caminho").href = selecionar
    document.getElementById("modo5").style.border = "inset 4px"
    document.getElementById("modo2").style.border = ""
    document.getElementById("modo3").style.border = ""
    document.getElementById("modo4").style.border = ""
    document.getElementById("modo1").style.border = ""
}
}
window.enviar = async function(){
    let x = "{ valor:"+document.getElementById("barra").value+"}";
    dados("/mobs/tentativas",[x]);
    document.getElementById("barra").value="";
}

async function dados(local,carga) {
    const dominio = "http://localhost:3000";
    const url = dominio+local
      const response = await fetch(url,{
        method:"POST",
        mode: "cors",
        body: JSON.stringify(carga),
      });
      const json = await response.json();
      console.log(json);
    }