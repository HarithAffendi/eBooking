// *  ============================ SIDE BAR =============================
let toggle = document.getElementById("nav-toggle");
let sidenav = document.querySelector(".sidenav");

toggle.addEventListener("click", () => {
    sidenav.classList.toggle("toggle");
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


// *  ============================ ADMIN DETAILS =============================
const xhrDetail = new XMLHttpRequest();

xhrDetail.onload = () => {
    if(xhrDetail.status != 200) {
        console.log(xhrDetail.status);
        return;
    }

    let user = JSON.parse(xhrDetail.responseText);

    document.getElementById("name").value = user.a_name;
    document.getElementById("email").value = user.a_email;
    document.getElementById("position").value = user.a_position;
    document.getElementById("phone").value = user.a_phone;
}

xhrDetail.open("GET", "../include/f_admin_info.inc.php", true);
xhrDetail.send();


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
    // window.location.href = "../PHP/homepage.php";
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
        return;
    }

    if(xhrForm.responseText == "Profile updated") {
        displayModal("Update successful", "Your Profile has been updated");
    }
    else if(xhrForm.responseText == "Invalid email") {
        showError("email-error", xhrForm.responseText);
    }
    else if(xhrForm.responseText == "Invalid phone number") {
        showError("phone-error", xhrForm.responseText);
    }
    else {
        displayModalError(xhrForm.responseText);
    }
};

const mainForm = document.getElementById("mainForm");

mainForm.addEventListener("reset", (e) => {
    e.preventDefault();

    xhrDetail.open("GET", "../include/f_admin_info.inc.php", true);
    xhrDetail.send();
})

mainForm.addEventListener("submit", (e) => {
    e.preventDefault();

    clearError();

    let name = mainForm.name;
    let email = mainForm.email;
    let position = mainForm.position;
    let phone = mainForm.phone;

    let canSubmit = true;

    if(name.value === "") {
        showError("name-error", "You have to enter your name");
        canSubmit = false;
    }

    if(email.value === "") {
        showError("email-error", "You have to enter your email");
        canSubmit = false;
    }

    if(position.value === "") {
        showError("position-error", "You have to enter your position");
        canSubmit = false;
    }

    if(phone.value === "") {
        showError("phone-error", "You have to enter your phone number");
        canSubmit = false;
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(!email.value.match(emailRegex)) { // check if email is outside kksb
        showError("email-error", "Your email is outside our organization");
        canSubmit = false;
    }
    
    const orgEmailRegex = /\w{1,}\@staf\.kksbs\.edu\.my/g;
    if(!email.value.match(orgEmailRegex)) { // check if email is valid
        showError("email-error", "Your email is invalid");
        canSubmit = false;
    }
    
    const phoneRegex = /^[0-9]{10,12}$/;
    if(!phone.value.match(phoneRegex)) { // check if phone number is invalid
        showError("phone-error", "Your phone number is invalid");
        canSubmit = false;
    }

    if(canSubmit == false) {
        return;
    }

    // data for API
    let data = 'name='+name.value+
                '&email='+email.value+
                '&position='+position.value+
                '&phone='+phone.value;

    xhrForm.open("POST", "../include/edit_admin_profile.inc.php", true);
    xhrForm.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhrForm.send(data);
});


// *  ============================ PASSWORD FORM =============================
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

let conPassToggle = document.getElementById("conPass-toggle");
let conPass = document.getElementById("conPass");

conPassToggle.addEventListener("click", () => {
    if(conPass.type == "password") {
        conPass.type = "text";
        conPassToggle.src = "../icon/view.png";
    }
    else {
        conPass.type = "password";
        conPassToggle.src = "../icon/hide.png";
    }
});

const xhrPassword = new XMLHttpRequest();

xhrPassword.onload = () => {
    if(xhrPassword.status != 200){
        console.log(xhrDetail.status);
        return;
    }

    if(xhrPassword.responseText == "Update successful") {
        displayModal("Password update", "Your password has been updated");
    }
    else if(xhrPassword.responseText == "Empty field") {
        showError("password-error", "You have to enter your new password")
    }
    else if(xhrPassword.responseText == "Invalid password") {
        showError("password-error", "Your password must atleast 8 character long, have one letter, one number and one special character like :!@#$%&");
    }
    else if(xhrPassword.responseText == "Password do not match") {
        showError("conPass-error", "Your passwords do not match");
    }
};

let editPassword = document.getElementById("edit-password");
let passwordDialog = document.querySelector(".password-pop-up");
let cancelEditPassword = document.getElementById("password-cancel");

editPassword.addEventListener("click", (e) => {
    e.preventDefault();

    passwordDialog.showModal();
    password.value = "";
    conPass.value = "";
});

cancelEditPassword.addEventListener("click", () => {
    passwordDialog.close();
});

const formPassword = document.getElementById("password-form");

formPassword.addEventListener("submit", (e) => {
    e.preventDefault();

    clearError();

    if(password.value === ""){
        showError("password-error", "You have to enter you new password");
        return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if(!password.value.match(passwordRegex)) {
        showError("password-error", "Your password must atleast 8 character long, have one letter, one number and one special character like :!@#$%&");
        return;
    }

    if(password.value != conPass.value) {
        showError("conPass-error", "Your passwords do not match");
        return;
    }

    let data = 'password='+password.value+
                '&conPass='+conPass.value;

    xhrPassword.open("POST", "../include/edit_admin_password.inc.php", true);

    xhrPassword.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrPassword.send(data);

    passwordDialog.close();
});