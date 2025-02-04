import token from "../tokenhandling.js"

var user=''
while(true){
user= await token.displaylogin()
if(user){
break
}
}
const user_name = document.getElementById("user-name")
const user_email = document.getElementById("user-email")
const user_icon = document.getElementById("user-icon")
user_name.innerHTML=user.name
user_email.innerHTML=user.email
if(user.icon){
user_icon.src="http://localhost:5500/"+user.icon
}



const modaldisplay = document.getElementById("modal")
const overlay = document.getElementById("overlay")
const change_icon = document.getElementById("icon")

change_icon.onclick = (event) => {
    modaldisplay.innerHTML = `
    <div class="icon-int">

    <div class="icon-int-data">

    <div class="icon-int-preview">
     <h3>preview</h2>
        <img src="../assets/imagens/default/HumanFace.png" class="user-icon" id="preview"></img>
    </div> 

    <div class="icon-int-select">
        <h3>selecione o seu</h3>
        <h3>novo ícone</h3>
    <input type="file" accept="image/*" id="file" name="image">
    </div>

    </div>

    <div class="icon-int-end">
        <button id="confirm" onclick="progredir('icon')">Confirmar</button>
        <button id="cancel" onclick="fechar()">Cancelar</button>
    </div>

    </div>

    `
    modaldisplay.classList.add("open")
    overlay.classList.add("open")

    const file = document.getElementById("file")
    
    file.onchange = (event) => {
        if(file.files[0]){
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("preview").src = e.target.result
            };
            reader.readAsDataURL(file.files[0]);
        } else {
        document.getElementById("preview").src = "../assets/imagens/default/HumanFace.png"
        }
    }
}


const change_back = document.getElementById("bckgrd")

change_back.onclick = (event) => {
    modaldisplay.innerHTML = `
    <div class="icon-int">

    <div class="icon-int-data">

    <div class="icon-int-preview">
     <h3>preview</h2>
        <img src="../assets/imagens/default/dirt_fundo.png" class="user-back" id="preview"></img>
    </div>

    <div class="icon-back-select">
        <h3>selecione o seu</h3>
         <h3>novo papel de parede</h3>
    <input type="file" accept="image/*" id="file" name="image">
    </div>

    </div>

    <div class="icon-int-end">
        <button id="confirm" onclick="progredir('back')">Confirmar</button>
        <button id="cancel" onclick="fechar()">Cancelar</button>
    </div>

    </div>

    `
    modaldisplay.classList.add("open")
    overlay.classList.add("open")

    const file = document.getElementById("file")
    
    file.onchange = (event) => {
        if(file.files[0]){
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("preview").src = e.target.result
            };
            reader.readAsDataURL(file.files[0]);
        } else {
        document.getElementById("preview").src = "../assets/imagens/default/dirt_fundo.png"
        }
    }
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

window.progredir = async (type) =>{
    const file = document.getElementById("file").files
    if(file){
        if(type=="icon"){
            var url = "http://localhost:3000/newicon"
        } else if(type=="back"){
            var url = "http://localhost:3000/newbackground"
        }
        const usertoken = token.getToken()
        const sendData = new FormData();

        sendData.append('image', file[0])
            try{
                const response=await fetch(url, {
                    method:"POST",
                    headers: {'Authorization': `Bearer ${usertoken}`},
                    body: sendData,
                    });
                if(response.status == 200){
                    modaldisplay.innerHTML = `
                    <div class="icon-int">
                    <h3>sucesso!</h3>
                    </div>
                
                    <div class="icon-int-end">
                        <button id="cancel" onclick="fechar()">Cancelar</button>
                    </div>
                
                    </div>
                
                    `
                    setTimeout(() => {
                    fechar()   
                    }, 2000);
                }
            } catch (error) {
                console.error(error.message);
              }
    }
}