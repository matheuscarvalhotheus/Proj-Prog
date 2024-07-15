//cria um numero aleatorio e manda ele para uma variavel global, puxa os dados do mob.json e dps usa os dois para carregar as imagens e texto dos mobs
var naleatorio=Math.floor(Math.random() * 10);
window.nal=naleatorio;
const response = await fetch('mob.json');
const mob = await response.json();
var listanomes = jsonparray(mob.mobs);
var opcoes = listanomes;
document.getElementById("mob").src = mob.mobs[naleatorio].img;
var foco = false;
var erros = [];
var deletados = [];
var primeiro = "";
var virgula = ",";

function jsonparray(jason_a){
  var lista=[];
  for(let i = 0; i<jason_a.length; i++){
  lista[i]=Object.values(jason_a[i])[0];
  }
  return lista;
}

function lista_p_li_pes(lista){
 for(let i=0;i<lista.length;i++){
  lista[i] = "<li onclick=\"escolher(\'"+lista[i]+"\')\" class=\"listapesquisa\">" + lista[i] + "</li>";
 }
 let texhtml = lista.toString();
 texhtml = texhtml.replace(/,+/g,"\n");
 return texhtml;
}

window.autopes = () => {
  var entrada=document.getElementById("barra").value;
  if(entrada) {
    var resultado=opcoes.filter((nome)=>{
     if(nome.startsWith(tratatex(entrada)) && !erros.includes(nome) ){
      return true;
     } 
    return false;
        })
    if(resultado[0]){
    primeiro=resultado[0];
    } else {
    primeiro=""
    }
    document.getElementById("listavalores").innerHTML = lista_p_li_pes(resultado);
  } else {
    document.getElementById("listavalores").innerHTML = "";
}
}
window.validafecha = () => {
foco = true;
}
window.fecharpesquisa = () => {
  if(foco){
    foco=false;
  } else{
    document.getElementById("listavalores").innerHTML = "";
  }
}
window.escolher = (num) => {
  document.getElementById("barra").value = num;
  document.getElementById("listavalores").innerHTML = "";
}
// filtra detecção de tecla para enter
window.entermob = function (e){
  
  if( e.which == 13 ){
    document.getElementById("barra").value = primeiro;
    advinha_mob(nal);
    document.getElementById("listavalores").innerHTML = "";
  } else {
    autopes();
  }

}
//trata o texto
window.tratatex = (tex) => {
  tex = tex.toLowerCase();
  tex = tex.replace(/\s+/g,' ').trim();
  return tex;
}
//alerta acertou quando você acerta a resposta e errou quando erra, cria um novo numero aleatorio e recarrega a variavel global junto da imagem e texto dos mobs
window.advinha_mob = function (){
  var r_barra = document.getElementById("barra").value;
  if(r_barra.length > 0){
  r_barra = tratatex(r_barra);
  if (r_barra == listanomes[nal]) {
  erros.push(r_barra);
  let invertido=[];
  for(let i=0;i<erros.length;i++){
    invertido[i]=erros[i];
  }
  document.getElementById("listatentativas").innerHTML = lista_p_li_erro(invertido,true);
  setTimeout(()=>{ 
    document.getElementById("listatentativas").innerHTML = "";
  }, 500);
  window.nal=Math.floor(Math.random() * 10);
  document.getElementById("mob").src = mob.mobs[nal].img;
  erros=[];
}
  else {
    erros.push(r_barra);
    let invertido = [];
    for(let i=0;i<erros.length;i++){
      invertido[i]=erros[i];
    }
    document.getElementById("listatentativas").innerHTML = lista_p_li_erro(invertido,false);
  }
  document.getElementById("barra").value = "";
  }
}


function lista_p_li_erro(invertido,flag){
  invertido = invertido.filter((elemento)=>{
    if(deletados.includes(elemento)){
    return false;
    }
    return true;
  });

  invertido.reverse();
  var i=0
  if(flag){
    invertido[i] = "<li id=\"a_"+i+"\">    <div class=\"listaerro\">    <img src=\"imagens/oveia.png\" class=\"listaerroimgmob\">     <div>     <img src=\"imagens/acertou.png\" class=\"listaerroimgacertou\">   <p class=\"listerroacertop\">   era um: " + invertido[i] + "</p>  </div>   <div>  <p class=\"listaerrosair\" onclick=\"fechar(" + i+invertido[i]+ ")\">     X   </p>   </div>   </div>    </li>";
    i++;
  }
  for(;i<invertido.length;i++){
    invertido[i] = "<li id=\"a_"+i+"\">   <div class=\"listaerro\">     <img src=\"imagens/oveia.png\" class=\"listaerroimgmob\">     <div>     <img src=\"imagens/errou.png\" class=\"listaerroimgerrou\">  <p class=\"listaerroerroup\">   não é um: " + invertido[i] + "   </p>   </div>   <div>   <p class=\"listaerrosair\" onclick=\"fechar(\'" + i+invertido[i]+ "\')\">    X    </p>  </div>   </div>    </li>";
   }
   let texhtml = invertido.toString();
   texhtml = texhtml.replace(/,+/g,"\n");
   return texhtml;
  }

window.fechar = (valor) => {
  let indice = valor.charAt(0);
  let nome = valor.replace(valor.charAt(0),"");
  let ide="a_"+indice;
  document.getElementById(ide).innerHTML="";
  document.getElementById(ide).remove();
  deletados.push(nome);
}