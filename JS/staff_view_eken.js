// *  ============================  FUNCTION =============================
function convertDate(date) {
    dateArray = date.split("-");

    let targetDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2].substr(0,2));

    let day = ("0" + targetDate.getDate()).slice(-2);
    let month = ("0" + (targetDate.getMonth() + 1)).slice(-2);
    
    let newDate = targetDate.getFullYear()+"-"+(month)+"-"+(day) ;
    
    return newDate;
}


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


// *  ============================  FETCH STAFF FORM DETAILS =============================
const params = new URLSearchParams(document.location.search);
const kf_id = params.get("id");

const xhrStaff = new XMLHttpRequest();

xhrStaff.onload = () => {
    if(xhrStaff.status != 200) {
        console.log(xhrStaff.status);
        return;
    }

    let kForm = JSON.parse(xhrStaff.responseText);

    document.getElementById("purpose").value = kForm.kf_purpose;
    document.getElementById("destination").value = kForm.kf_destination;
    document.getElementById("file").innerHTML = kForm.f_name;
    document.getElementById("file").href = "../eken/"+kForm.f_name;
    document.getElementById("numStudent").value = kForm.kf_numStudent;
    document.getElementById("numStaff").value = kForm.kf_numStaff;
    document.getElementById("depDate").value = convertDate(kForm.kf_departureDate);
    document.getElementById("depTime").value = kForm.kf_departureTime;
    document.getElementById("retDate").value = convertDate(kForm.kf_returnDate);
    document.getElementById("retTime").value = kForm.kf_returnTime;
    document.getElementById("staDate").value = convertDate(kForm.kf_startDate);
    document.getElementById("staTime").value = kForm.kf_startTime;
}

let dataDetail = "id="+kf_id;

xhrStaff.open("POST", "../include/get_staff_eken_details.inc.php", true);
xhrStaff.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhrStaff.send(dataDetail);


// *  ============================  FETCH ADMIN FORM DETAILS =============================
const xhrDriver = new XMLHttpRequest();
xhrDriver.onload = () => {
    if(xhrDriver.status != 200) {
        console.log(xhrDriver.status);
        return;
    }
    
    let dList = JSON.parse(xhrDriver.responseText);
    
    if(!dList.length) {
        return;
    }

    let dOut = "";
    for(let d of dList) {
        dOut += `
        <div class="driver">${d}</div>
        `;
    }

    document.querySelector(".driver-list").innerHTML = dOut;
}

let btnDelete = document.getElementById("del");

const xhrAdmin = new XMLHttpRequest();
xhrAdmin.onload = () => {
    if(xhrAdmin.status != 200) {
        console.log(xhrAdmin.status);
        return;
    }

    let json = JSON.parse(xhrAdmin.responseText);

    if(json.kf_available == true) {
        document.getElementById("available").checked = true;
    }
    else {
        document.getElementById("unavailable").checked = true;
    }

    let status = document.getElementById("status");
    status.innerHTML = `<b>${json.kf_status}</b>`;

    if(json.kf_status == "Approved") {
        status.style.color = "rgb(27, 194, 27)";
    }
    else if(json.kf_status == "Denied") {
        status.style.color = "rgb(218, 19, 19)";
    }
    if (json.kf_status == "Pending") {
        btnDelete.style.display = "block";
    }

    document.getElementById("name").innerHTML = json.a_name;

    xhrDriver.open("POST", "../include/get_driver.inc.php", true);
    xhrDriver.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhrDriver.send(dataDetail);
}

xhrAdmin.open("POST", "../include/get_admin_eken_details.inc.php", true);
xhrAdmin.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
xhrAdmin.send(dataDetail);



// *  ============================  FETCH VEHICLE =============================
const xhrReqChk = new XMLHttpRequest();

let requestList = [];
let recommendList = [];

xhrReqChk.onload = () => {
    if(xhrReqChk.status != 200) {
        console.log(xhrReqChk.status);
        return;
    }

    let checks = JSON.parse(xhrReqChk.responseText);

    for(let check of checks) {
        if(check.kl_type == "Request") {
            requestList.push(check.kv_id);
        }
        else {
            recommendList.push(check.kv_id);
        }
    }
}

const xhrVehicle = new XMLHttpRequest();

xhrVehicle.onload = () => {
    if(xhrVehicle.status != 200) {
        console.log(xhrVehicle.status);
        return; 
    }

    let vehicles = JSON.parse(xhrVehicle.responseText);

    let outReq = "";
    for(let vehicle of vehicles) {
        if(requestList.includes(vehicle.kv_id)) {
            outReq += `
            <tr>
                <td>
                <input type="checkbox" name="vehicleReq[]" value="${vehicle.kv_id}" onclick="return false" checked>${vehicle.kv_name} (${vehicle.kv_plate})
                </td>
            </tr>
            `;
        }
        else {
            outReq += `
            <tr>
                <td>
                <input type="checkbox" name="vehicleReq[]" value="${vehicle.kv_id}" onclick="return false">${vehicle.kv_name} (${vehicle.kv_plate})
                </td>
            </tr>
            `;
        }

    }

    document.querySelector(".req-vehicle").innerHTML = outReq;

    let outRec = "";
    for(let vehicle of vehicles) {
        if(recommendList.includes(vehicle.kv_id)) {
            outRec += `
            <tr>
                <td>
                <input type="checkbox" name="vehicleRec[]" value="${vehicle.kv_id}" onclick="return false" checked>${vehicle.kv_name} (${vehicle.kv_plate})
                </td>
            </tr>
            `;
        }
        else {
            outRec += `
            <tr>
                <td>
                <input type="checkbox" name="vehicleRec[]" value="${vehicle.kv_id}" onclick="return false">${vehicle.kv_name} (${vehicle.kv_plate})
                </td>
            </tr>
            `;
        }
    }

    document.querySelector(".rec-vehicle").innerHTML = outRec;
}

let dataReqChk = "id="+kf_id;

xhrReqChk.open("POST", "../include/eken_checked.inc.php", true);
xhrReqChk.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhrReqChk.send(dataReqChk);

xhrVehicle.open("GET", "../include/get_vehicle.inc.php", true);
xhrVehicle.send();


// *  ============================  DELETE FORM =============================
const xhrDelete = new XMLHttpRequest();

xhrDelete.onload = () => {
    if(xhrDelete.status != 200) {
        console.log(xhrDelete.status);
        return;
    }

    if(xhrDelete.responseText == "Form deleted") {
        displayModalSuccess("The form has been deleted");
    }
    else {
        displayModalError(xhrDelete.responseText);
    }
}

conDel = document.querySelector(".delete-confirmation");
yesDel = document.getElementById("yes-delete");
yesDel.addEventListener("click", () => {
    conDel.close();
        
    xhrDelete.open("POST", "../include/eken_delete.inc.php", true);
    xhrDelete.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrDelete.send(dataDetail);
});

noDel = document.getElementById("no-delete");
noDel.addEventListener("click", () => {
    conDel.close();
});


btnDelete.addEventListener("click", () => {
    conDel.showModal();
});