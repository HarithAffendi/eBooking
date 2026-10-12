// *  ============================ SIDE BAR =============================
let toggle = document.getElementById("nav-toggle");
let sidenav = document.querySelector(".sidenav");

toggle.addEventListener("click", () => {
    sidenav.classList.toggle("toggle");
});


// *  ============================ PASSWORD TOGGLE =============================
let password = document.getElementById("password");
let togglePass = document.getElementById("password-toggle");

togglePass.addEventListener("click", () => {
    if(password.type == "password") {
        password.type = "text";
        togglePass.src = "../icon/view.png";
    }
    else {
        password.type = "password";
        togglePass.src = "../icon/hide.png";
    }
});

let conPass = document.getElementById("conPass");
let toggleConPass = document.getElementById("conPass-toggle");

toggleConPass.addEventListener("click", () => {
    if(conPass.type == "password") {
        conPass.type = "text";
        toggleConPass.src = "../icon/view.png";
    }
    else {
        conPass.type = "password";
        toggleConPass.src = "../icon/hide.png";
    }
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
    window.location.href = "../PHP/list_admin.php";
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
function showError(errorElement, errorMessage) {
    document.querySelector("."+errorElement).innerHTML = errorMessage;
};

function clearError() {
    let errors = document.querySelectorAll(".error");

    for(let error of errors) {
        error.innerHTML = "";
    }
};


// *  ============================ MAIN FORM =============================
const xhrForm = new XMLHttpRequest();

xhrForm.onload = () => {
    if(xhrForm.status != 200) {
        console.log(xhrForm.status);
    }

    if(xhrForm.responseText == "Admin added") {
        displayModalSuccess("New admin has been added");
    }
    else if(xhrForm.responseText == "Invalid email") {
        showError("email-error", "The email is invalid");
    }
    else if(xhrForm.responseText == "Out of kksb") {
        showError("email-error", "The email is outside our organization");
    }
    else if(xhrForm.responseText == "Invalid password") {
        showError("password-error", "The password must atleast 8 character long, have one letter, one number and one special character like :!@#$%&");
    }
    else if(xhrForm.responseText == "Passwords do not match") {
        showError("conPassword-error", "The passwords don't match");
    }
    else {
        displayModalError(xhrForm.responseText);
    }
};

const mainForm = document.getElementById("mainForm");

mainForm.addEventListener("submit", (e) => {
    e.preventDefault();

    clearError();

    let name = mainForm.name.value;
    let email = mainForm.email.value;
    let position = mainForm.position.value;
    let phone = mainForm.phone.value;
    let type = mainForm.type.value;
    let password = mainForm.password.value;
    let conPass = mainForm.conPass.value;

    if(name === "") {
        showError("name-error", "You have to enter the admin's name");
        return;
    }
    if(email === "") {
        showError("email-error", "You have to enter the admin's email");
        return;
    }
    if(position === "") {
        showError("position-error", "You have to enter the admin's position");
        return;
    }
    if(type === "") {
        showError("type-error", "You have to enter the admin's type");
        return;
    }
    if(phone === "") {
        showError("phone-error", "You have to enter the admin's phone");
        return;
    }
    if(password === "") {
        showError("password-error", "You have to enter the admin's password");
        return;
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(!email.match(emailRegex)) {
        showError("email-error", "The email is invalid");
        return;
    }

    const orgEmailRegex = /\w{1,}\@staf\.kksbs\.edu\.my/g;
    if(!email.match(orgEmailRegex)) {
        showError("email-error", "The email is outside our organization");
    }

    const phoneRegex = /^[0-9]{10,12}$/;
    if(!phone.match(phoneRegex)) { // check if phone number is invalid
        showError("phone-error", "The staff's phone number is invalid");
        return;
    }
    
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if(!password.match(passwordRegex)) { // check if password is valid
        showError("password-error", "The password must atleast 8 character long, have one letter, one number and one special character like :!@#$%&");
        return;
    }
    
    if(conPass != password) { // check if confirm password match with password
        showError("conPassword-error", "The passwords don't match");
        return;
    }

    let data = 'name='+name+
                '&email='+email+
                '&position='+position+
                '&phone='+phone+
                '&position='+position+
                '&type='+type+
                '&password='+password+
                '&conPass='+conPass;
    
    xhrForm.open("POST", "../include/add_admin.inc.php", true);
    xhrForm.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrForm.send(data);
});