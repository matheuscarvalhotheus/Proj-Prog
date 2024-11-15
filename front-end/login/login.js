import Auth from "../tokenhandling.js"

window.handleform = async () => {

    const email = document.getElementById('email').value;
    const password = document.getElementById('senha').value;
    const user = JSON.stringify({email: email, pass: password})
    const url = "http://localhost:3000/login"
    try{
        const response=await fetch(url, {
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: user,
            });
        const result = await response.json();
        if(result.status === 401){
            console.log("fudeu")
        } else if(result.flag){
         Auth.login(result.token);
        }
    } catch (error) {
        console.error(error.message);
      }
    
}