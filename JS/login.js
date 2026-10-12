// *  ============================ PASSWORD TOGGLE =============================
let eyeicon = document.getElementById("eyeicon");
let password = document.getElementById("password");

eyeicon.addEventListener("click", () => {
    if(password.type == "password"){
        password.type = "text";
        eyeicon.src = "../icon/view.png";

    }
    else{
        password.type = "password";
        eyeicon.src = "../icon/hide.png";
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
    window.location.href = "../include/redirect.inc.php";
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
    
    if(xhr.responseText == "Login successful") {
        displayModal("Success", "Login was successful");
    }
    else if(xhr.responseText == "Wrong email address") {
        showError("email-error", xhr.responseText);
    }
    else if(xhr.responseText == "Wrong password") {
        showError("password-error", xhr.responseText);
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

    email_user = form.email.value;
    password_user = form.password.value;
    let test = true;

    if(email_user === "") { // check if email is empty
        showError("email-error", "You have to enter your email");
        test = false;
        // return;
    }

    if(password_user === "") { // check if password is empty
        showError("password-error", "You have to enter your password");
        test = false;
        // return;
    }

    if(test == false) {
        return;
    }

    let url = "";
    if(form.type.value == "staff") {
        url = "../include/login.inc.php";
    }
    else {
        url = "../include/admin_login.inc.php";
    }

    let data = "email="+email_user+
                "&password="+password_user;

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    xhr.send(data);
});