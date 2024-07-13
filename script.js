function enviar(e){
    e.preventDefault();
}
function teste(){
 /* var resposta = document.getElementById("resposta").value;]
  
  if (resposta === mob.name) {
  alert("acertou");
}
  else {
  alert("tente novamente");
  
  */
  var naleatorio=Math.floor(Math.random() * 10);
  document.getElementById("mob").src = mob.mobs[naleatorio].img;
  document.getElementById("nome").innerHTML = mob.mobs[naleatorio].nome;
}
var naleatorio=Math.floor(Math.random() * 10);
const response = await fetch('mob.json');
const mob = await response.json();
document.getElementById("mob").src = mob.mobs[naleatorio].img;
document.getElementById("nome").innerHTML = mob.mobs[naleatorio].nome;