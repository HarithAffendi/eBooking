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


// *  ============================ QOH =============================
const xhrQOH = new XMLHttpRequest()

xhrQOH.onload = () => {
    if(xhrQOH.status != 200) {
        console.log(xhrQOH.status);
        return;
    }

    let equipments = JSON.parse(xhrQOH.responseText);
    let out = `
    <tr>
        <th style="width: 75%;">Equipment</th>
        <th>Quantity on hand</th>
    </tr>
    `;
    for(let eq of equipments) {
        out += `
        <tr>
            <td>${eq.ii_name}</td>
            <td>${eq.ii_qoh}</td>
        </tr>
        `;
    }

    document.querySelector(".qoh").innerHTML = out;
}

xhrQOH.open("GET", "../include/get_equipment.inc.php", true);
xhrQOH.send();