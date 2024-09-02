//cria um numero aleatorio e manda ele para uma variavel global, puxa os dados do mob.json e dps usa os dois para carregar as imagens e texto dos mobs
var naleatorio=Math.floor(Math.random() * 10);
window.nal=naleatorio;
var recebe = await dados("/mobs/assets")
var mob = JSON.parse(recebe.dados.replace("\\n"," "));
mob = mob.mobs;
var mjogo = localStorage.getItem("mjogo");
var dificuldade = localStorage.getItem("dificuldade");
var tentativas = set_dificuldade(mjogo,dificuldade);
var mjogo = localStorage.getItem("mjogo");
var listanomes = jsonparray(mob);
var opcoes = listanomes;
document.getElementById("mob").src = mob[naleatorio].img;
var foco = false;
var erros = [];
var deletados = [];
var primeiro = "";
var virgula = ",";

function set_dificuldade(mjogo,dificuldade){
if(mjogo){
  if(mjogo=="criativo"){
   return 999;
  } else if(mjogo=="survival"){
    if(dificuldade=="fácil"){
      return 10;
    } else if(dificuldade=="normal"){
      return 5;
  } else if(dificuldade=="difícil"){
    return 3;
  }
} else if(mjogo=="hardcore"){
  return 3;
}
} else {
  localStorage.setItem("mjogo","criativo")
  return 999;
}
}

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
  if(mjogo=="hardcore" || mjogo=="criativo"){


  if(r_barra.length > 0 && erros.length<tentativas){
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
  document.getElementById("mob").src = mob[nal].img;
  erros=[];
}
  else {
    erros.push(r_barra);
    if(erros.length==tentativas){
    document.getElementById("excedido").innerHTML="<p> Tentativas Excedidas </p>"
    let invertido = [];
    for(let i=0;i<erros.length;i++){
      invertido[i]=erros[i];
    }
    document.getElementById("listatentativas").innerHTML = lista_p_li_erro(invertido,false);
  }}
  document.getElementById("barra").value = "";
  } else if(r_barra.length > 0){
    document.getElementById("excedido").innerHTML="<p> Tentativas Excedidas </p>"
  }


} else if(mjogo=="survival"){


  if(r_barra.length > 0 && erros.length<tentativas){
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
    document.getElementById("mob").src = mob[nal].img;
    erros=[];
  }
    else {
      erros.push(r_barra);
      if(erros.length==tentativas){
        let invertido=[];
        for(let i=0;i<erros.length;i++){
          invertido[i]=erros[i];
        }
        document.getElementById("excedido").innerHTML="<p> Tentativas Excedidas </p>"
        document.getElementById("listatentativas").innerHTML = lista_p_li_erro(invertido,true);
        setTimeout(()=>{ 
          document.getElementById("listatentativas").innerHTML = "";
          document.getElementById("excedido").innerHTML="";
        }, 500);
        window.nal=Math.floor(Math.random() * 10);
        document.getElementById("mob").src = mob[nal].img;
        erros=[];
      } else {
      let invertido = [];
      for(let i=0;i<erros.length;i++){
        invertido[i]=erros[i];
      }
      document.getElementById("listatentativas").innerHTML = lista_p_li_erro(invertido,false);
    }}
    document.getElementById("barra").value = "";
    }

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
    invertido[i] = "<li id=\"a_"+i+"\">    <div class=\"listaerro\">    <img src=\"../assets/imagens/mobs/oveia.png\" class=\"listaerroimgmob\">     <div>     <img src=\"../assets/imagens/mobs/acertou.png\" class=\"listaerroimgacertou\">   <p class=\"listerroacertop\">   era um: " + invertido[i] + "</p>  </div>   <div>  <p class=\"listaerrosair\" onclick=\"fechar(" +invertido[i]+i+ ")\">     X   </p>   </div>   </div>    </li>";
    i++;
  }
  for(;i<invertido.length;i++){
    invertido[i] = "<li id=\"a_"+i+"\">   <div class=\"listaerro\">     <img src=\"../assets/imagens/mobs/oveia.png\" class=\"listaerroimgmob\">     <div>     <img src=\"../assets/imagens/mobs/errou.png\" class=\"listaerroimgerrou\">  <p class=\"listaerroerroup\">   não é um: " + invertido[i] + "   </p>   </div>   <div>   <p class=\"listaerrosair\" onclick=\"fechar(\'" + invertido[i]+i+ "\')\">    X    </p>  </div>   </div>    </li>";
   }
   let texhtml = invertido.toString();
   texhtml = texhtml.replace(/,+/g,"\n");
   return texhtml;
  }

window.fechar = (valor) => {
  let indice = valor.charAt(valor.length-1);
  let nome = valor.replace(valor.charAt(valor.length-1),"");
  let ide="a_"+indice;
  document.getElementById(ide).innerHTML="";
  document.getElementById(ide).remove();
  deletados.push(nome);
}
