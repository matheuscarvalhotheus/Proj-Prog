import token from "../tokenhandling.js"

token.displaylogin();

const user_name = document.getElementById("user-name")
const user_email = document.getElementById("user-email")
user_name.innerHTML=JSON.parse(localStorage.getItem("userdata")).name
user_email.innerHTML=JSON.parse(localStorage.getItem("userdata")).email

const modaldisplay = document.getElementById("modal")
const overlay = document.getElementById("overlay")
const change_icon = document.getElementById("icon")

change_icon.onclick = (event) => {
    modaldisplay.innerHTML = `
    <div class="icon-int">

    <div class="icon-int-data">

    <div class="icon-int-preview">
     <h3>preview</h2>
        <img src="../assets/imagens/default/HumanFace.png" class="user-icon"></img>
    </div>

    <div class="icon-int-select">
        <h3>selecione o seu novo ícone</h2>
    <input type="file" accept="image/* id="file" name="image">
    </div>

    </div>

    <div class="icon-int-end">
        <button id="confirm" onclick="confirmar()">Confirmar</button>
        <button id="cancel" onclick="fechar()">Cancelar</button>
    </div>

    </div>

    `
    modaldisplay.classList.add("open")
    overlay.classList.add("open")
}



const change_pass = document.getElementById("pass")

change_pass.onclick = async (event) => {
    modaldisplay.innerHTML = `
    <div class="pass-change">

    <p>cheque a caixa de entrada do seu e-mail</p>

    </div>

    <div class="icon-int-end">
        <button id="cancel" onclick="fechar()">Fechar</button>
    </div>

    </div>

    `
    modaldisplay.classList.add("open")
    overlay.classList.add("open")

    const usertoken = token.getToken()

    let url = "http://localhost:3000/pass-change-init"
    const answer = await fetch(url,{
        method:"GET",
        headers:{'Content-Type': 'application/json', "Authorization" : `Bearer ${usertoken}`},
        })
}

overlay.onclick = (event) => {
    modaldisplay.classList.remove("open")
    overlay.classList.remove("open")
}

window.fechar = () =>{
    modaldisplay.classList.remove("open")
    overlay.classList.remove("open")
}

window.confirmar = () =>{
    document.getElementById("file")
}