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


// *  ============================ FETCH EQUIPMENT =============================
const xhrICT =new XMLHttpRequest();

xhrICT.onload = () => {
    if(xhrICT.status != 200) {
        console.log(xhrICT.status);
        return;
    }

    let equipments = JSON.parse(xhrICT.responseText);

    let out = "";
    for(let equipment of equipments) {
        out += `
        <option value="${equipment.ii_id}">${equipment.ii_name}</option>
        `;
    }
    let select = document.querySelectorAll("select");
    for(let s of select) {
        s.innerHTML += out;
    }
}

// xhrICT.open("GET", "../tess.json", true);
xhrICT.open("GET", "../include/get_equipment.inc.php", true);
xhrICT.send();


// *  ============================ FORM =============================
const xhrForm = new XMLHttpRequest();

xhrForm.onload = () => {
    if(xhrForm.status != 200) {
        console.log(xhrForm.status);
        return;
    }

    if(xhrForm.responseText == "Passed") {
        displayModalSuccess("YAY");
    }
    else if(xhrForm.responseText == "purpose empty") {
        showError("purpose-error", "You must state the purpose of your booking");
    }
    else if(xhrForm.responseText == "place empty") {
        showError("place-error", "You must state the place of use of the equipment");
    }
    else if(xhrForm.responseText == "borDate empty") {
        showError("borDate-error", "You must enter the borrow date");
    }
    else if(xhrForm.responseText == "retDate empty") {
        showError("retDate-error", "You must state the expected return date");
    }
    else if(xhrForm.responseText == "equip empty") {
        showError("equip-error", "You must choose the equipment to borrow");
    }
    else if(xhrForm.responseText == "qty empty") {
        showError("equip-error", "You must enter the quantity of the equipment to borrow");
    }
    else if(xhrForm.responseText == "qty zero") {
        showError("equip-error", "The quantity cannot be zero");
    }
    else if(xhrForm.responseText == "additiona qty empty") {
        showError("add-error", "You must enter the quantity of the equipment to borrow");
    }
    else if(xhrForm.responseText == "additiona qty zero") {
        showError("add-error", "The quantity cannot be zero");
    }
    else {
        displayModalError(xhrForm.responseText);
    }
}

const mainForm = document.getElementById("mainForm");

mainForm.addEventListener("submit", e => {
    e.preventDefault()
    clearError();

    const url = mainForm.action;

    let purpose = mainForm.purpose.value;
    let place = mainForm.place.value;
    let borDate = mainForm.borDate.value;
    let retDate = mainForm.retDate.value;
    let equip = [mainForm.equip1.value, mainForm.equip2.value, mainForm.equip3.value];
    let qty = [mainForm.qty1.value, mainForm.qty2.value, mainForm.qty3.value];

    for(let i=0; i<equip.length; i++) {
        if(equip[i] === "") {
            equip.splice(i, 1);
            qty.splice(i, 1);
            i--;
        }
    }

    let data = "purpose="+purpose+
                "&place="+place+
                "&borDate="+borDate+
                "&retDate="+retDate+
                "&equip="+equip+
                "&qty="+qty;

    xhrForm.open("POST", url, true);
    xhrForm.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrForm.send(data);
});