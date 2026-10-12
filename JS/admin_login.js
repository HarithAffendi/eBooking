// *  ============================ SIDE BAR =============================
let toggle = document.getElementById("nav-toggle");
let sidenav = document.querySelector(".sidenav");

toggle.addEventListener("click", () => {
    sidenav.classList.toggle("toggle");
});




// *  ============================ PASSWORD TOGGLE =============================
let passwordToggle = document.getElementById("password-toggle");
let password = document.getElementById("password");

passwordToggle.addEventListener("click", () => {
    if(password.type == "password") {
        password.type = "text";
        passwordToggle.src = "../icon/view.png";
    }
    else {
        password.type = "password";
        passwordToggle.src = "../icon/hide.png";
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
});


successModal = document.querySelector(".modal-success"); // create a success dialog box

function displayModalSuccess(p) {
    document.querySelector(".success-text").innerHTML = p;
    successModal.showModal();
};

successButton = document.getElementById("success-button"); // button to success close modal

successButton.addEventListener("click", () => {
    document.querySelector(".success-text").innerHTML = "";
    successModal.close();
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


// *  ============================ LOGOUT =============================
let logoutModal = document.querySelector(".logout-pop-up");

let logoutCancel = document.getElementById("logout-cancel");

logoutCancel.addEventListener("click", () => {
    logoutModal.close();
});

const xhrLogout = new XMLHttpRequest();

xhrLogout.onload = () => {
    if(xhrLogout.status != 200) {
        console.log(xhrLogout.status);
        return;
    }

    if(xhrLogout.responseText == "User has logout") {
        window.location.href = "../PHP/login.php";
    }
};

let logoutForm = document.getElementById("logout-form");

logoutForm.addEventListener("submit", () => {

    xhrLogout.open("POST", "../include/logout.inc.php");
    xhrLogout.send();
});

let logout = document.getElementById("logout");

logout.addEventListener("click", (e) => {
    e.preventDefault();

    logoutModal.showModal();
})


// *  ============================ ERROR SPAN =============================
function showError(errorElement, errorMessage) {
    document.querySelector("."+errorElement).innerHTML = errorMessage;
};

function clearError() {
    let errors = document.querySelectorAll(".error");

    for(let error of errors) {
        error.innerHTML = "";
    }
};


// *  ============================ FORM =============================
const xhrForm = new XMLHttpRequest();

xhrForm.onload = () => {
    if(xhrForm.status != 200) {
        console.log(xhrForm.status);
        return;        
    }

    if(xhrForm.responseText == "Login successful") {
        displayModalSuccess(xhrForm.responseText);
    }
    else if(xhrForm.responseText == "Wrong email address") {
        showError("email-error", xhrForm.responseText);
    }
    else if(xhrForm.responseText == "Wrong password") {
        showError("password-error", xhrForm.responseText);
    }
    else {
        displayModalError(xhrForm.responseText);
    }
};

const myForm = document.getElementById("myForm");

myForm.addEventListener("submit", (e) => {
    e.preventDefault();

    clearError();

    let email = myForm.email;

    let valid = true;

    if(email.value === "") {
        showError("email-error", "You have to enter your email");
        valid = false;
    }

    if(password.value === "") {
        showError("password-error", "You have to enter you password");
        valid = false;        
    }

    if(valid == false) {
        return;
    }

    let data = 'email='+email.value+
                '&password='+password.value;
    
    xhrForm.open("POST", "../include/admin_login.inc.php", true);
    xhrForm.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhrForm.send(data);
})
