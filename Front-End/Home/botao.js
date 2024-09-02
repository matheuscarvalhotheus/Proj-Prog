
var selecionar = "";

window.validar = function(indice){
if(indice==0){
    document.getElementById("caminho").href = "";
    document.getElementById("modo1").style.border = "";
    document.getElementById("modo2").style.border = "";
    document.getElementById("modo3").style.border = "";
    document.getElementById("modo4").style.border = "";
    document.getElementById("modo5").style.border = "";
}else if(indice==1){
    selecionar = "../mobs/mobs.html";
    document.getElementById("caminho").href = selecionar;
    document.getElementById("modo1").style.border = "inset 4px";
    document.getElementById("modo2").style.border = "";
    document.getElementById("modo3").style.border = "";
    document.getElementById("modo4").style.border = "";
    document.getElementById("modo5").style.border = "";
} else if(indice==2){
    selecionar = "";
    document.getElementById("caminho").href = selecionar;
    document.getElementById("modo2").style.border = "inset 4px";
    document.getElementById("modo1").style.border = "";
    document.getElementById("modo3").style.border = "";
    document.getElementById("modo4").style.border = "";
    document.getElementById("modo5").style.border = "";
}else if(indice==3){
    selecionar = "";
    document.getElementById("caminho").href = selecionar;
    document.getElementById("modo3").style.border = "inset 4px";
    document.getElementById("modo2").style.border = "";
    document.getElementById("modo1").style.border = "";
    document.getElementById("modo4").style.border = "";
    document.getElementById("modo5").style.border = "";
}else if(indice==4){
    selecionar = "";
    document.getElementById("caminho").href = selecionar;
    document.getElementById("modo4").style.border = "inset 4px";
    document.getElementById("modo2").style.border = "";
    document.getElementById("modo3").style.border = "";
    document.getElementById("modo1").style.border = "";
    document.getElementById("modo5").style.border = "";
}else if(indice==5){
    selecionar = "";
    document.getElementById("caminho").href = selecionar;
    document.getElementById("modo5").style.border = "inset 4px";
    document.getElementById("modo2").style.border = "";
    document.getElementById("modo3").style.border = "";
    document.getElementById("modo4").style.border = "";
    document.getElementById("modo1").style.border = "";
};

}

window.enviar = async function(){
     localStorage.setItem("mjogo","valor")
     localStorage.setItem("dificuldade","valor")
};
