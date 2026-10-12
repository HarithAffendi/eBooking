// *  ============================ SIDE BAR =============================
let toggle = document.getElementById("nav-toggle");
let sidenav = document.querySelector(".sidenav");

toggle.addEventListener("click", () => {
    sidenav.classList.toggle("toggle");
});


// *  ============================  FETCH VEHICLE =============================
const xhrVehicle = new XMLHttpRequest();
let vlist = [];

xhrVehicle.onload = () => {
    if(xhrVehicle.status != 200) {
        console.log(xhrVehicle.status);
    }

    let vehicles = JSON.parse(xhrVehicle.responseText);

    let vcount = 1;
    let out = "";
    for(let vehicle of vehicles) {
        let idname = "v"+vcount;
        out += `
        <tr>
            <td>
            <input type="checkbox" name="vehicle[]" value="${vehicle.kv_id}" id="${idname}">${vehicle.kv_name} (${vehicle.kv_plate})
            </td>
        </tr>
        `;
        vlist.push(idname);
        vcount++;
    }

    document.querySelector(".list-vehicle").innerHTML = out;
}

xhrVehicle.open("GET", "../include/get_vehicle.inc.php", true);
xhrVehicle.send();


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
    window.location.href = "../PHP/view_status.php";
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


// *  ============================ FORM =============================
const xhrForm = new XMLHttpRequest();

xhrForm.onload = () => {
    if(xhrForm.status != 200) {
        console.log(xhrForm.status);
        return;
    }

    if(xhrForm.responseText == "Form submitted") {
        displayModalSuccess("Your eKenderaan form has been submitted");
    }
    else if(xhrForm.responseText == "The number of passengers cannot add up to zero") {
        showError("passenger-eeror", xhrForm.responseText)
    }
    else if(xhrForm.responseText == "File not uploaded") {
        showError("file-error", xhrForm.responseText);
    }
    else if(xhrForm.responseText == "Only PDF file less then 2MB are allowed to upload") {
        showError("file-error", xhrForm.responseText);
    }
    else if(xhrForm.responseText == "File failed to upload") {
        showError("file-error", xhrForm.responseText);
    }
    else if(xhrForm.responseText == "This file NAME is already exists in the database") {
        showError("file-error", xhrForm.responseText);
    }
    else {
        displayModalError(xhrForm.responseText);
    }

}

const form = document.getElementById("mainForm");

let url = form.action;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    clearError();

    let purpose = form.purpose.value;
    let destination = form.destination.value;
    let vehicle = [];
    let depDate = form.depDate.value;
    let depTime = form.depTime.value;
    let retDate = form.retDate.value;
    let retTime = form.retTime.value;
    let staDate = form.staDate.value;
    let staTime = form.staTime.value;
    let file = form.file.value;
    let numStudent = form.numStudent.value;
    let numStaff = form.numStaff.value;

    for(let v of vlist) {
        if(document.getElementById(v).checked) {
            vehicle.push(document.getElementById(v).value);
        }
    }

    if(purpose === "") {
        showError("purpose-error", "You must state your purpose");
        return;
    }
    if(destination === "") {
        showError("destination-error", "You must enter the destination");
        return;
    }
    if(numStudent === "") {
        showError("passenger-error", "You must enter the number of student passenger");
        return;
    }
    if(numStaff === "") {
        showError("passenger-error", "You must enter the number of staff passenger");
        return;
    }
    if(parseInt(numStudent) + parseInt(numStaff) == 0) {
        showError("passenger-error", "The number of passengers cannot add up to zero");
        return;
    }
    if(file === "") {
        showError("file-error", "You must include a letter of instruction");
        return;
    }
    if(depDate === "" || depTime === "") {
        showError("departure-error", "You must enter the departure date and time");
        return;
    }
    if(retDate === "" || retTime === "") {
        showError("return-error", "You must enter the return date and time");
        return;
    }
    if(staDate === "" || staTime === "") {
        showError("start-error", "You must enter the start date and time");
        return;
    }
    if(!vehicle.length) {
        showError("vehicle-error", "You must choose a vehicle");
        return;
    }
    

    xhrForm.open("POST", url, true);
    xhrForm.send(new FormData(form));
});