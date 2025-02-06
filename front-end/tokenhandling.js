async function displaylogin(){
    if(getToken()){
        const token = "Bearer "+getToken()
        var username = ''
        var icon = ''
        const response = await fetch("http://localhost:3000/me",{method:"GET",headers:{"Authorization" : token}})
        const json = await response.json()
        console.log(json)
        username = json.name
        icon =  json.icon
        localStorage.setItem("userdata",JSON.stringify(json))

        if(icon){
            document.getElementsByClassName("entrar")[0].innerHTML=`
            <div class="usermenu">
            <div>
            <p id="username">${username}</p>
            <p id="exit" onclick="logout()">sair</p>  
            </div>
            <a href="/front-end/user/user.html"><img src="${"http://localhost:5500/"+icon}" id="steve"></a>
            </div>
            `
    
        } else {
        document.getElementsByClassName("entrar")[0].innerHTML=`
        <div class="usermenu">
        <div>
        <p id="username">${username}</p>
        <p id="exit" onclick="logout()">sair</p>  
        </div>
        <a href="/front-end/user/user.html"><img src="/front-end/assets/imagens/default/HumanFace.png" id="steve"></a>
        </div>
        `
        }
        if(json.background_img){
        document.documentElement.style.backgroundImage = `url(${"http://localhost:5500/"+json.background_img})`;
        } 
        return json
    }
}

function getUserData(){
    if(getToken()){
        return JSON.parse(localStorage.getItem("userdata"))
    }
}

function login(token){
localStorage.setItem("token", token)
window.location.href = "/front-end/home/home.html"
}

window.logout = function logout(){
localStorage.removeItem("token")
localStorage.removeItem("userdata")
window.location.href = "/front-end/login/login.html"
}

function getToken(){
return localStorage.getItem("token")
}

export default { getUserData, login, logout, getToken, displaylogin }