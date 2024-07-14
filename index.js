// filtra detecção de tecla para enter
window.entermob = function (e,nal){
  if( e.which == 13 ){
    advinha_mob(nal);
  } 
}
//trata o texto
window.tratatex = (tex) => {
  tex = tex.toLowerCase();
  tex = tex.replace(/\s/g,"");
  return tex;
}
//alerta acertou quando você acerta a resposta e errou quando erra, cria um novo numero aleatorio e recarrega a variavel global junto da imagem e texto dos mobs
window.advinha_mob = function (naleatorio){
  var r_barra = document.getElementById("barra").value;
  r_barra = tratatex(r_barra);
  if (r_barra == mob.mobs[naleatorio].nome) {
  alert("acertou");
  var naleatorio=Math.floor(Math.random() * 10);
  window.nal=naleatorio;
  document.getElementById("mob").src = mob.mobs[naleatorio].img;
  document.getElementById("nome").innerHTML = mob.mobs[naleatorio].nome;
}
  else {
  alert("tente novamente");
  }
  document.getElementById("barra").value = "";
}
//cria um numero aleatorio e manda ele para uma variavel global, puxa os dados do mob.json e dps usa os dois para carregar as imagens e texto dos mobs
var naleatorio=Math.floor(Math.random() * 10);
window.nal=naleatorio;
const response = await fetch('mob.json');
const mob = await response.json();
document.getElementById("mob").src = mob.mobs[naleatorio].img;
document.getElementById("nome").innerHTML = mob.mobs[naleatorio].nome;

