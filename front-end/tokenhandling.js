function login(token){
localStorage.setItem("token", token)
window.location.href = "/front-end/home/home.html"
}

function logout(){
localStorage.removeItem("token",token)
window.location.href = "/front-end/home/home.html"
}

function getToken(){
return localStorage.getItem("token")
}

export default { login, logout, getToken, }