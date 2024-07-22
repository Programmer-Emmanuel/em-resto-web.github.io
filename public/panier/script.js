const menu_burger = document.getElementById('menu_burger');
const close_menu = document.getElementById('close_menu');
const responsive = document.getElementById("responsive")

menu_burger.addEventListener("click", ()=>{
    close_menu.style.display="block"
    menu_burger.style.display="none"
    responsive.style.display="block"
    responsive.classList.add("navigue_add")
    responsive.classList.remove("navigue_close")
})

close_menu.addEventListener("click", ()=>{
    menu_burger.style.display="block"
    close_menu.style.display="none"
    responsive.classList.add("navigue_close")
    responsive.classList.remove("navigue_add")
})


const bouton = document.getElementById("bouton")
const carte = document.getElementById("carte")

bouton.addEventListener("click", () => {
    carte.style.display="none";
})