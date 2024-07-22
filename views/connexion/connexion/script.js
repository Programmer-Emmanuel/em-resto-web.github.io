const boutton = document.getElementById("boutton")
const email = document.getElementById("email")
const password = document.getElementById("password")
const mot_password = document.getElementById("mot_password")
const mot_email = document.getElementById("moy_email")


boutton.addEventListener("click", (event)=>{
    if(password.value.length < 8){
        mot_password.textContent = "Le mot de passe est incorrect ou fait moins de 8 caractères."
        mot_password.style.display = "block"
        event.preventDefault()
        password.style.borderColor = "red"
    }
    else{
        mot_email.textContent = ""
        mot_password.textContent = ""
        password.style.borderColor = "grey"
    }
})

