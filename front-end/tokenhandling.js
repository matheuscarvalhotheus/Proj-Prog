async function displaylogin(){
    if(getToken()){
        const token = "Bearer "+getToken()
        var username = ''
        if(!localStorage.getItem("userdata")){
            const response = await fetch("http://localhost:3000/me",{method:"GET",headers:{"Authorization" : token}})
            const json = await response.json()
            console.log(json)
            username = json.name
            localStorage.setItem("userdata",JSON.stringify(json))
        } else {
            username = JSON.parse(localStorage.getItem("userdata")).name;
        }
        document.getElementsByClassName("entrar")[0].innerHTML=`
        <div>
        <p id="username">${username}</p>
        <p id="exit" onclick="logout()">sair</p>  
        </div>
        <img src="/front-end/assets/imagens/default/HumanFace.png" id="steve">
        `
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

export default { login, logout, getToken, displaylogin }