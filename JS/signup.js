// *  ============================ PASSWORD TOGGLE =============================
let password = document.getElementById("password");
let passIcon = document.getElementById("passIcon");

let conPass = document.getElementById("conPass");
let conPassIcon = document.getElementById("conPassIcon");

passIcon.addEventListener("click", () => {
    if(password.type == "password"){
        password.type = "text";
        passIcon.src = "../icon/view.png";
    }
    else{
        password.type = "password";
        passIcon.src = "../icon/hide.png";
    }
});

conPassIcon.addEventListener("click", () => {
    if(conPass.type == "password"){
        conPass.type = "text";
        conPassIcon.src = "../icon/view.png";
    }
    else{
        conPass.type = "password";
        conPassIcon.src = "../icon/hide.png";
    }
});


// *  ============================ MODAL =============================
modal = document.querySelector(".modal"); // create a dialog box

function displayModal(heading, p) { // display dialog box
    document.querySelector(".modal-h1").innerHTML = heading;
    document.querySelector(".modal-text").innerHTML = p;
    modal.showModal();
};

modalButton = document.getElementById("modal-button"); // button to close modal

modalButton.addEventListener("click", () => { // close dialog box
    modal.close();
    document.querySelector(".modal-h1").innerHTML = "";
    document.querySelector(".modal-text").innerHTML = "";
    window.location.href = "../PHP/login.php";
});

errorModal = document.querySelector(".modal-error"); // create an error dialog box

function displayModalError(p) {
    document.querySelector(".modal-p-error").innerHTML = p;
    errorModal.showModal();
}

errorButton = document.getElementById("error-button") // button to close error modal

errorButton.addEventListener("click", () => { // close error message
    errorModal.close();
    document.querySelector(".modal-p-error").innerHTML = "";
});


// *  ============================ ERROR SPAN =============================
function showError(errorElement, errorMessage) { // display error to user
    // document.querySelector("."+errorElement).classList.add("display-error");
    document.querySelector("."+errorElement).innerHTML = errorMessage;
};

function clearError() { // clear all error
    let errors = document.querySelectorAll(".error");

    for(let error of errors) {
        error.innerHTML = "";
    }
};


// *  ============================ AJAX REQUEST =============================
const xhr = new XMLHttpRequest(); // create XHR object

xhr.onload = () => {
    if(xhr.status !=  200) { // check if status is OK
        console.log(xhr.status); // if not, display the status
        return;
    }
    
    if(xhr.responseText == "Sign up successful\r\n") {
        displayModal("Success", "Signning up was successful");
    }
    else {
        displayModalError(xhr.responseText); // display error
    }
    
};


// *  ============================ FORM =============================
const form = document.getElementById("myForm");

form.addEventListener("submit", (event) => {
    
    event.preventDefault();
    
    clearError();
    
    if(form.name.value === "") { // check if name field is empty
        showError("name-error", "You have to enter your name");
        return;
    }
    
    if(form.email.value === "") { // check if email field is empty
        showError("email-error", "You have to enter your email");
        return;
    }
    
    if(form.position.value === "") { // check if position field is empty
        showError("position-error", "You have to enter your position");
        return;
    }
    
    if(form.phone.value === "") { // check if phone field is empty
        showError("phone-error", "You have to enter your phone number");
        return;
    }
    
    if(form.password.value === "") { // check if password field is empty
        showError("password-error", "You have to enter your password");
        return;
    }
    
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(!form.email.value.match(emailRegex)) { // check if email is outside kksb
        showError("email-error", "Your email is outside our organization");
        return;
    }
    
    const orgEmailRegex = /\w{1,}\@staf\.kksbs\.edu\.my/g;
    if(!form.email.value.match(orgEmailRegex)) { // check if email is valid
        showError("email-error", "Your email is outside our organization");
        return;
    }
    
    const phoneRegex = /^[0-9]{10,12}$/;
    if(!form.phone.value.match(phoneRegex)) { // check if phone number is invalid
        showError("phone-error", "Your phone number is invalid");
        return;
    }
    
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if(!form.password.value.match(passwordRegex)) { // check if password is valid
        showError("password-error", "Your password must atleast 8 character long, have one letter, one number and one special character like :!@#$%&");
        return;
    }
    
    if(form.conPass.value != form.password.value) { // check if confirm password match with password
        showError("conPassword-error", "Your passwords don't match");
        return;
    }

    // parameters
    let data = 'name='+form.name.value+
                '&email='+form.email.value+
                '&position='+form.position.value+
                '&phone='+form.phone.value+
                '&position='+form.position.value+
                '&password='+form.password.value+
                '&conPass='+form.conPass.value;

    
    // if data passes validation, post data
    xhr.open("POST", "../include/signup.inc.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    xhr.send(data);
});