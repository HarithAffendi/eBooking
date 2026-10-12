// *  ============================ FETCH ALL STAFF =============================
const params = new URLSearchParams(document.location.search);
const s_id = params.get("id");

const xhrDetail = new XMLHttpRequest();

xhrDetail.onload = () => {
    if(xhrDetail.status != 200) {
        console.log(xhrDetail.status);
        return;
    }
    let staff = JSON.parse(xhrDetail.responseText);

    document.getElementById("id").value = s_id;
    document.getElementById("name").value = staff.s_name;
    document.getElementById("email").value = staff.s_email;
    document.getElementById("position").value = staff.s_position;
    document.getElementById("phone").value = staff.s_phone;
};

let staffData = "id="+s_id;

xhrDetail.open("POST", "../include/get_staff.inc.php", true);
xhrDetail.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhrDetail.send(staffData);


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
    window.location.href = "../PHP/list_staff.php";
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
        displayModalSuccess("Your Profile has been updated");
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

    let staffData = "id="+s_id;

    xhrDetail.open("POST", "../include/get_staff.inc.php", true);
    xhrDetail.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrDetail.send(staffData);
});

mainForm.addEventListener("submit", (e) => {
    e.preventDefault();

    clearError();

    let name = mainForm.name.value;
    let email = mainForm.email.value;
    let position = mainForm.position.value;
    let phone = mainForm.phone.value;

    let canSubmit = true;

    if(name === "") { // check is name field empty
        showError("name-error", "You have to enter the staff's name");
        canSubmit = false;
    }
    if(email === "") { // check is email field empty
        showError("email-error", "You have to enter the staff's email");
        canSubmit = false;
    }
    if(position === "") { // check is position field empty
        showError("position-error", "You have to enter the staff's position");
        canSubmit = false;
    }
    if(phone === "") { // check is phone field empty
        showError("phone-error", "You have to enter the staff's phone number");
        canSubmit = false;
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(!email.match(emailRegex)) { // check if email is outside kksb
        showError("email-error", "The email is invalid");
        canSubmit = false;
    }
    
    const orgEmailRegex = /\w{1,}\@staf\.kksbs\.edu\.my/g;
    if(!email.match(orgEmailRegex)) { // check if email is valid
        showError("email-error", "The email is outside our organization");
        canSubmit = false;
    }
    
    const phoneRegex = /^[0-9]{10,12}$/;
    if(!phone.match(phoneRegex)) { // check if phone number is invalid
        showError("phone-error", "The phone number is invalid");
        canSubmit = false;
    }

    if(canSubmit == false) {
        return;
    }


    let data =  'id='+s_id+
                '&name='+name+
                '&email='+email+
                '&position='+position+
                '&phone='+phone;

    xhrForm.open("POST", "../include/update_staff.inc.php", true);
    xhrForm.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhrForm.send(data);
});


// *  ============================ CHANGE PASSWORD =============================
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
    if(xhrPassword.status != 200) {
        console.log(xhrPassword.status);
        return;
    }

    if(xhrPassword.responseText == "Update successful") {
        displayModalSuccess("Password has been updated");
    }
    else if(xhrPassword.responseText == "Empty field") {
        showError("password-error", "Enter the new password");
    }
    else if(xhrPassword.responseText == "Invalid password") {
        showError("password-error", "The password must atleast 8 character long, have one letter, one number and one special character like :!@#$%&");
    }
    else if(xhrPassword.responseText == "Passwords do not match") {
        showError("conPassword-error", "The passwords don't match");
    }
    else {
        displayModalError(xhrPassword.responseText);
    }
}

const formPass = document.getElementById("formPass");

let passURL = formPass.action;

formPass.addEventListener("submit", e => {
    e.preventDefault();

    clearError();

    let data = 'id='+s_id+
                '&password='+formPass.password.value+
                '&conPass='+formPass.conPass.value;

    xhrPassword.open("POST", passURL, true);
    xhrPassword.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrPassword.send(data);
})


// *  ============================ DELETE =============================
const xhrDelete = new XMLHttpRequest();

xhrDelete.onload = () => {
    if(xhrDelete.status != 200) {
        console.log(xhrDelete.status);
        return;
    }

    if(xhrDelete.responseText == "Staff deleted") {
        displayModalSuccess("Staff has been deleted");
    }
    else {
        displayModalError(xhrDelete.responseText);
    }
}

conDel = document.querySelector(".delete-confirmation");

yesDel = document.getElementById("yes-delete");
yesDel.addEventListener("click", () => {
    conDel.close();
    let data  = "id="+s_id;
        
    xhrDelete.open("POST", "../include/delete_staff.inc.php", true);
    xhrDelete.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrDelete.send(data);
});

noDel = document.getElementById("no-delete");
noDel.addEventListener("click", () => {
    conDel.close();
});


let deleteStaff = document.getElementById("del");

deleteStaff.addEventListener("click", () => {
    conDel.showModal();
});