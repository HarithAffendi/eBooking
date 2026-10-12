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
    window.location.href = "../PHP/list_vehicle.php";
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


// *  ============================ VEHICLE DETAILS =============================
const params = new URLSearchParams(document.location.search);
const v_id = params.get("id");

const xhrDetails = new XMLHttpRequest();

xhrDetails.onload = () => {
    if(xhrDetails.status != 200) {
        console.log(xhrDetails.status);
        return;
    }

    let vehicle = JSON.parse(xhrDetails.responseText);

    document.getElementById("v_id").value = v_id;
    document.getElementById("name").value = vehicle.kv_name;
    document.getElementById("plate").value = vehicle.kv_plate;
}

let dataDetail = "id="+v_id;

xhrDetails.open("POST", "../include/get_vehicle_detail.inc.php", true);
xhrDetails.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhrDetails.send(dataDetail);


// *  ============================ VEHICLE DETAILS =============================
const xhrForm = new XMLHttpRequest();

xhrForm.onload = () => {
    if(xhrForm.status != 200) {
        console.log(xhrForm.status);
        return;
    }

    if(xhrForm.responseText == "Vehicle updated") {
        displayModalSuccess("Vehicle has been updated");
    }
    else {
        displayModalError(xhrForm.responseText);
    }
}

const mainForm = document.getElementById("mainForm");

const url = mainForm.action;

mainForm.addEventListener("reset", (e) => {
    // e.preventDefault();

    xhrDetails.open("POST", "../include/get_vehicle_detail.inc.php", true);
    xhrDetails.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrDetails.send(dataDetail);
});

mainForm.addEventListener("submit", (e) => {
    e.preventDefault();

    clearError();

    let name = mainForm.name.value;
    let plate = mainForm.plate.value;

    if(name === "") {
        showError("name-error", "You have to enter the vehicle's name");
        return;
    }
    if(plate === "") {
        showError("plate-error", "You have to enter the vehicle's plate number")
    }

    let data = 'id='+v_id+
                '&name='+name+
                '&plate='+plate;

    xhrForm.open("POST", url, true);
    xhrForm.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrForm.send(data);
});


// *  ============================ DELETE =============================
const xhrDelete = new XMLHttpRequest();

xhrDelete.onload = () => {
    if(xhrDelete.status != 200) {
        console.log(xhrDelete.status);
        return;
    }

    if(xhrDelete.responseText == "Vehicle deleted") {
        displayModalSuccess("Vehicle has been deleted");
    }
    else {
        displayModalError(xhrDelete.responseText);
    }
}

conDel = document.querySelector(".delete-confirmation");

yesDel = document.getElementById("yes-delete");
yesDel.addEventListener("click", () => {
    conDel.close();
        
    xhrDelete.open("POST", "../include/delete_vehicle.inc.php", true);
    xhrDelete.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrDelete.send(dataDetail);
});

noDel = document.getElementById("no-delete");
noDel.addEventListener("click", () => {
    conDel.close();
});


let deleteStaff = document.getElementById("del");

deleteStaff.addEventListener("click", () => {
    conDel.showModal();
}); 