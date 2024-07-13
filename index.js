window.entermob = function (e,nal){
  if( e.which == 13 ){
    advinha_mob(nal);
  } 
}

window.advinha_mob = function (naleatorio){
  var r_barra = document.getElementById("barra").value;
  r_barra = r_barra.toLowerCase()
  r_barra = r_barra.replace(/\s/g,"")
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
var naleatorio=Math.floor(Math.random() * 10);
window.nal=naleatorio;
const response = await fetch('mob.json');
const mob = await response.json();
document.getElementById("mob").src = mob.mobs[naleatorio].img;
document.getElementById("nome").innerHTML = mob.mobs[naleatorio].nome;

