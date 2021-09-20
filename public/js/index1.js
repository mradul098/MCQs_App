document.getElementById("contactForm").addEventListener("submit", function (e) {
    handleLoginSubmit(e);
});


function handleLoginSubmit(event) {

    
     var element = document.getElementById("contactForm");
    var name = element.name.value;
    var email = element.email.value;
    event.preventDefault();
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email", email);
    window.location.href = "instructions.html";
}