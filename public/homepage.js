var bannerArea = document.getElementById('banner-area')
var contentArea = document.getElementById('content-area')
var LOGIN = document.getElementById('LOGIN')
var btn1 = document.getElementById('btn1')
var loginPage = document.getElementById('login-page')
var registerLink = document.getElementById("registerLink");
var loginLink = document.getElementById("loginLink");
var registerForm = (document.getElementsByClassName("register-form"))[0]
var loginForm = (document.getElementsByClassName("login-form"))[0]
var home = document.getElementById('home')

home.addEventListener('click', ()=>{
    bannerArea.style.display = "block"
    contentArea.style.display = "block"
    loginPage.style.display = "none";
})

LOGIN.addEventListener('click', ()=>{
    bannerArea.style.display = "none"
    contentArea.style.display = "none"
    loginPage.style.display = "block";
    loginForm.style.display = "block";
registerForm.style.display = "none";
    
})
btn1.addEventListener('click', ()=>{
    bannerArea.style.display = "none"
    contentArea.style.display = "none"
    loginPage.style.display = "block";
    registerForm.style.display = "block";
    loginForm.style.display = "none";

})

registerLink.addEventListener("click", function(){
registerForm.style.display = "block";
loginForm.style.display = "none";

});

loginLink.addEventListener("click", function(){
loginForm.style.display = "block";
registerForm.style.display = "none";
});