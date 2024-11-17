//Setup do jogo e suas configurações

//pega as possíveis respostas do banco
const dominio = "http://localhost:3000"
var path = "/mobs/solutions"
const resmobs = await fetch(dominio+path)
const mobjson = await resmobs.json();
console.log(mobjson)

//organiza em listas apenas com as informmações necessárias
var listamobs = []
var listaimagens = []
for(let i=0; i<mobjson.length; i++){
    listamobs[i]=mobjson[i]["answer"]
    listaimagens[i]=mobjson[i]["img"]
}
//escolhe a resposta
var nal = aleatorio(mobjson.length);

function aleatorio(tamanho){
    let escolhido = Math.floor(Math.random()*tamanho);
    return escolhido;
}
//pega as possiveis dificuldades e tentativas referentes do banco
path = "/mobs/gameSettings"
const resdif = await fetch(dominio+path)
const difjson = await resdif.json()
console.log(difjson)

//pega qual foi selecionada
const query = window.location.search
const urlParams =  new URLSearchParams(query)
var modo = urlParams.get("modo")
var dificuldade = urlParams.get("dificuldade")

if(!modo||!dificuldade){
    modo = localStorage.getItem("mjogo");
    dificuldade = localStorage.getItem("dificuldade");
    console.log("url inválido, carregando configurações do ultimo jogo")
}
//pega quantidade de tentativas do selecionado
var[tentativas,modo,dificuldade,multiplier] = triesidentifier(modo,dificuldade,difjson)
const triesreset = tentativas
function triesidentifier(modo,dificuldade,json){
    if(!modo||!dificuldade){
        modo = "creative"
        dificuldade="nenhum"
    }
    for(let i=0; i<json.length; i++){
        if(json[i]["valores"][0]["dif_opcoes"][0]!="nenhum"||modo!="creative"){
            if(modo==json[i]["valores"][0]["nome"]&&dificuldade==json[i]["valores"][0]["dif_opcoes"][0]){
                return [json[i]["tries"],modo,dificuldade,json[i]["multiplier"]]
        } 
        } else{
            console.log("nenhuma configuração encontrada, carregando padrão")
            return [json[i]["tries"],modo,dificuldade,["multiplier"]]
        }
    }
    modo = "creative"
    dificuldade="nenhum"
    console.log("url válido sem sentido, carregando padrão")
    for(let i=0; i<json.length; i++){
        if(modo==json[i]["valores"][0]["nome"]&&dificuldade==json[i]["valores"][0]["dif_opcoes"][0]){
            return [json[i]["tries"],modo,dificuldade,["multiplier"]]
    } 
    }
}


//Inicio do jogo
//preparamento das variáveis necessários para rodar o jogo
const forms = document.getElementById("formulario")
const display = document.getElementById("mob")
const input = document.getElementById("barra")
const searchlist = document.getElementById("listavalores")
const notificationlist = document.getElementById("listatentativas")
const pointsdisplay = document.getElementById("points")
const triesdisplay = document.getElementById("tries")
const modaldisplay = document.getElementById("modal")
const overlaydisplay = document.getElementById("overlay")
var reseting = false
var processing = false
var removednotifications = []
var falhas = []
var autoselect = ''
var points=0
//carregar imagem do mob inicial
display.src = listaimagens[nal]
triesdisplay.innerHTML = `${tentativas} tentativas`
//tratamento da entrada
function tratatex(texto){
    texto = texto.toLowerCase();
    texto = texto.trim();
    return texto
}

//modulo de pesquisa onfocus and oninput
function search(conteudo){
    if(conteudo){
        var resultado = listamobs.filter((nome)=>{
         if(nome.startsWith(tratatex(conteudo))&&!falhas.includes(nome)){
            return true;
         }
         return false;
        })
        if(resultado[0]){
        let temporario = resultado[0]
        for(let i=0;i<resultado.length;i++){
            resultado[i] = `<li onclick="select('${resultado[i]}')" class="searchelement">
            ${resultado[i]}
            </li>`
        }
        let html = resultado.join('\n');
        searchlist.innerHTML = html;
        return temporario;
        } 
    }
    searchlist.innerHTML = '';
    return '';
}

//modulo de seleção de elementos da lista de search
window.select = (val) => {
    input.value = val
    searchlist.innerHTML = ''
}

//modulo de componentes do jogo
//validação
function validation(input,answer){
if(input == answer){
return "correct";
}
return "wrong";
}
//Finalização
function gamereset(result){
    //ganhou o jogo
    if(result){
        modaldisplay.innerHTML=`
        <h1>Parabéns! você conseguiu adivinhar Todos os Mobs!</h1>
        <div class="modalstats">
        <p>Sobraram ${tentativas} tentativas!</p>
        <p>Você fez um total de ${points} pontos!</p>
        </div>
        <p class="highscore">A sua melhor pontuação neste modo foi ${points}!</p>
        <div class="modalbuttons">
        <button class="playagain" onclick="win(true)"><p>Jogar de Novo</p></button>
        <button class="quit" onclick="win(false)"><p>Voltar para o Menu</p></button>
        </div>
        `
        modaldisplay.classList.add("open")
        overlaydisplay.classList.add("open")
    } else {
    //perdeu o jogo
    modaldisplay.innerHTML=`
    <h1>Que Pena! Acabaram as suas tentativas!</h1>
    <div class="modalstats">
    <p>Você conseguiu adivinhar ${parseInt(points/(10*multiplier))}/${mobjson.length}!</p>
    <p>Você fez um total de ${points} pontos!</p>
    </div>
    <p class="highscore">A sua melhor pontuação neste modo foi ${points}!</p>
    <div class="modalbuttons">
    <button  class="playagain" onclick="loss(true)"><p>Jogar de Novo</p></button>
    <button class="quit" onclick="loss(false)"><p>Voltar para o Menu</p></button>
    </div>
    `        
    modaldisplay.classList.add("open")
    overlaydisplay.classList.add("open")
    }
    
    }

    window.win = (a) =>{
        if(a){
            modaldisplay.classList.remove("open")
            overlaydisplay.classList.remove("open")
            for(let i=0; i<mobjson.length; i++){
                listamobs[i]=mobjson[i]["answer"]
                listaimagens[i]=mobjson[i]["img"]
            }
            points=0
            pointsdisplay.innerHTML=`${points} pontos`
            tentativas=triesreset
            triesdisplay.innerHTML=`${tentativas} tentativas`
            nal = aleatorio(listamobs.length)
            display.src = listaimagens[nal]
            processing=false
            reseting=false
        } else {
            window.location.href="/front-end/home/home.html"
        }
    }

    window.loss = (a) =>{
        if(a){
            modaldisplay.classList.remove("open")
            overlaydisplay.classList.remove("open")
            for(let i=0; i<mobjson.length; i++){
                listamobs[i]=mobjson[i]["answer"]
                listaimagens[i]=mobjson[i]["img"]
            }
            points=0
            pointsdisplay.innerHTML=`${points} pontos`
            falhas=[]
            removednotifications=[]
            nal = aleatorio(listamobs.length)
            display.src = listaimagens[nal]
            tentativas=triesreset
            triesdisplay.innerHTML=`${tentativas} tentativas`
            notificationlist.innerHTML=''
        } else {
            window.location.href="/front-end/home/home.html"
        }
    }

//modulo de efeitos visuais
//highlight
function elementhighlight(element,highlight,timer){
    element.classList.add(highlight)
        setTimeout(() => {
        element.classList.remove(highlight)
        }, timer)

    }
    
//modulo de avisos onsubmit
//gera avisos
function notification(fails,flag){
    var properfails = [...fails]
    properfails.reverse()
    var i = 0;
    if(flag){
        properfails[i] = 
        `<li class="notifelement" id="a_${i}"> 
        <div class="notification">
        <img src="../assets/imagens/mobs/oveia.png" class="notificationsmobimg">
        <div class="notificationtext"> 
        <img src="../assets/imagens/mobs/acertou.png" class="notificationimg">
        <p class="notificationp"> era um: ${properfails[i]}</p> 
        </div> 
        <div class="notificationclose"> 
        <p  onclick="removenotification('${properfails[i]}',${i})">&times</p>
        </div>
        </div>
        </li>`
        i++;
    }
    for(;i<properfails.length;i++){
        properfails[i] = 
        `<li class="notifelement" id="a_${i}"> 
        <div class="notification">
        <img src="../assets/imagens/mobs/oveia.png" class="notificationsmobimg">
        <div class="notificationtext"> 
        <img src="../assets/imagens/mobs/errou.png" class="notificationimg">
        <p class="notificationp"> não é um: ${properfails[i]}</p> 
        </div> 
        <div class="notificationclose"> 
        <p onclick="removenotification('${properfails[i]}',${i})">&times</p>
        </div>
        </div>
        </li>`
    }
    let html = properfails.join('\n');
    return html;
}
//remove avisos
window.removenotification = (name,index) => {
let id="a_"+index;
document.getElementById(id).remove();
removednotifications.push(name)
}
//filtra avisos removidos
function filterremoved(removed,fails,flag){
if(removed[0]){
    var filtered = fails.filter((elemento)=>{
        if(removed.includes(elemento)){
            return false;
        }
            return true;
    })
    return notification(filtered,flag)
} else {
    return notification(fails,flag)
}
}

//módulo do jogo
//ativando search bar
input.oninput = (event) => {
    autoselect = search(input.value)
}
input.onfocus = (event) => {
    autoselect = search(input.value)
}

//submit do forms
forms.onsubmit = (event) => {

if(autoselect&&!processing){
console.log(processing)
var acertou=false
const result = validation(autoselect,listamobs[nal])
//acertou
if(result=="correct"){
acertou=true
if(modo=="survival"||modo=="criativo"){
    tentativas=triesreset
    triesdisplay.innerHTML=`${tentativas} tentativas`
    elementhighlight(triesdisplay,"resethighlight",380)
}

points+=10*multiplier
pointsdisplay.innerHTML=`${points} pontos`
elementhighlight(pointsdisplay,"greenhighlight",380)

falhas.push(autoselect)
notificationlist.innerHTML = filterremoved(removednotifications,falhas,acertou)

listamobs.splice(nal,1)
listaimagens.splice(nal,1)

falhas=[]
removednotifications=[]
processing=true
setTimeout(()=>{notificationlist.innerHTML=''
//ganhou o jogo
if(listamobs.length==0){
gamereset(true)
reseting=true
}

if(!reseting){
nal = aleatorio(listamobs.length)
display.src = listaimagens[nal]
processing=false

}

},1000)


//errou
} else if(result=="wrong"){

tentativas-=1
triesdisplay.innerHTML=`${tentativas} tentativas`
elementhighlight(triesdisplay,"redhighlight",380)

falhas.push(autoselect)
notificationlist.innerHTML = filterremoved(removednotifications,falhas,acertou)

//acabou tentativas
if(tentativas==0){
gamereset(false)
}

}
autoselect=''
input.value=''
searchlist.innerHTML=''
}
event.preventDefault();
};


console.log(tentativas)
console.log(modo)
console.log(dificuldade)