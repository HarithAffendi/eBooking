// *  ============================  FUNCTION =============================
function convertDate(date) {
    dateArray = date.split("-");

    let targetDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2].substr(0,2));

    let day = ("0" + targetDate.getDate()).slice(-2);
    let month = ("0" + (targetDate.getMonth() + 1)).slice(-2);
    
    let newDate = targetDate.getFullYear()+"-"+(month)+"-"+(day) ;
    
    return newDate;
}

let vlist = [];

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
    // window.location.href = "../PHP/list_eken_form.php";
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


// *  ============================  DYNAMIC ADD/REMOVE DRIVER =============================
const driverList = document.querySelector(".driver-list");

let addDriver = document.getElementById("add-driver");

function addDriverInput(value) {
    const driver = document.createElement("input");
    driver.type = "text";
    driver.name = "driver[]";
    driver.value = value;
    driver.placeholder = "Enter the driver's name";

    const btn = document.createElement("a");
    btn.className = "remove";
    btn.innerHTML = "x";

    btn.addEventListener("click", (e) => {
        driverList.removeChild(div);
    });

    const div = document.createElement("div");
    div.className = "driver";

    driverList.appendChild(div);
    div.appendChild(driver);
    div.appendChild(btn);
}
addDriver.addEventListener("click", () => {
    const driver = document.createElement("input");
    driver.type = "text";
    driver.name = "driver[]";
    driver.placeholder = "Enter the driver's name";

    const btn = document.createElement("a");
    btn.className = "remove";
    btn.innerHTML = "x";

    btn.addEventListener("click", (e) => {
        driverList.removeChild(div);
    });

    const div = document.createElement("div");
    div.className = "driver";

    driverList.appendChild(div);
    div.appendChild(driver);
    div.appendChild(btn);
});


// *  ============================  FETCH VEHICLE =============================
const params = new URLSearchParams(document.location.search);
const kf_id = params.get("id");

let btnPrint = document.getElementById("print");
btnPrint.href += "?id="+kf_id;

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

    let vcount = 1;
    let outRec = "";
    for(let vehicle of vehicles) {
        let idname = "v"+vcount;
        if(recommendList.includes(vehicle.kv_id)) {
            outRec += `
            <tr>
                <td>
                <input type="checkbox" name="vehicleRec[]" value="${vehicle.kv_id}" id="${idname}" checked>${vehicle.kv_name} (${vehicle.kv_plate})
                </td>
            </tr>
            `;
        }
        else {
            outRec += `
            <tr>
                <td>
                <input type="checkbox" name="vehicleRec[]" value="${vehicle.kv_id}" id="${idname}">${vehicle.kv_name} (${vehicle.kv_plate})
                </td>
            </tr>
            `;
        }
        vlist.push(idname);
        vcount++;
    }

    document.querySelector(".rec-vehicle").innerHTML = outRec;
}

let dataReqChk = "id="+kf_id;

xhrReqChk.open("POST", "../include/eken_checked.inc.php", true);
xhrReqChk.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhrReqChk.send(dataReqChk);

xhrVehicle.open("GET", "../include/get_vehicle.inc.php", true);
xhrVehicle.send();


// *  ============================  FETCH STAFF FORM DETAILS  =============================
const xhrDetail = new XMLHttpRequest();

xhrDetail.onload = () => {
    if(xhrDetail.status != 200) {
        console.log(xhrDetail.status);
        return;
    }

    let kForm = JSON.parse(xhrDetail.responseText);

    document.getElementById("purpose").value = kForm.kf_purpose;
    document.getElementById("name").value = kForm.s_name;
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

xhrDetail.open("POST", "../include/get_staff_eken_details.inc.php", true);
xhrDetail.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhrDetail.send(dataDetail);


// *  ============================  FETCH ADMIN FORM DETAILS  =============================
const xhrDriver = new XMLHttpRequest();
xhrDriver.onload = () => {
    if(xhrDriver.status != 200) {
        console.log(xhrDriver.status);
        return;
    }

    let dList = JSON.parse(xhrDriver.responseText);

    for(let d of dList) {
        addDriverInput(d);
    }
}

let theDriver = document.getElementById("theDriver");
theDriver.style.display = "none";

const xhrAdmin = new XMLHttpRequest();
xhrAdmin.onload = () => {
    if(xhrAdmin.status != 200) {
        console.log(xhrAdmin.status);
        return;
    }
    let json = JSON.parse(xhrAdmin.responseText);

    if(json.kf_status == "Pending") {
        theDriver.style.display = "block";
        return;
    }

    document.querySelector(".status").innerHTML = `<b>${json.kf_status}</b>`;

    if(json.kf_available == true) {
        document.getElementById("available").checked = true;
    }
    else {
        document.getElementById("unavailable").checked = true;
    }

    xhrDriver.open("POST", "../include/get_driver.inc.php", true);
    xhrDriver.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhrDriver.send(dataDetail);
}

xhrAdmin.open("POST", "../include/get_admin_eken_details.inc.php", true);
xhrAdmin.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
xhrAdmin.send(dataDetail);


// *  ============================  UPDATE FORM  =============================
const xhrForm = new XMLHttpRequest();

xhrForm.onload = () => {
    if(xhrForm.status != 200) {
        console.log(xhrForm.status);
        return;
    }

    if(xhrForm.responseText == "Form saved") {
        displayModalSuccess("The form has been saved");
    }
    else if(xhrForm.responseText == "State if the requested vehicles are available"){
        showError("avai-error", xhrForm.responseText)
    }
    else if(xhrForm.responseText == "You must assign atleast one driver") {
        showError("driver-error", xhrForm.responseText);
    }
    else if(xhrForm.responseText == "You must choose aleast one vehicle") {
        showError("vehicle-error", xhrForm.responseText);
    }
    else {
        displayModalError(xhrForm.responseText);
    }
}

const mainForm = document.getElementById("updateForm");

let url = mainForm.action;

mainForm.addEventListener("submit", (e) => {
    e.preventDefault();

    clearError();

    let avai = mainForm.availability.value;
    let driver = document.getElementsByName("driver[]");
    let vehicleRec = [];
    // let approval = mainForm.approval.value;

    let listDriver = [];
    for(let d of driver) {
        if(d !== "") {
            listDriver.push(d.value);
        }
    }

    for(let v of vlist) {
        if(document.getElementById(v).checked) {
            vehicleRec.push(document.getElementById(v).value);
        }
    }

    if(avai === "") {
        showError("avai-error", "State if the requested vehicles are available");
        return;
    }
    // if(approval === "") {
    //     showError("approval-error", "You must either approve or deny this request");
    //     return;
    // }
    
    if(!listDriver.length) {
        showError("driver-error", "You must assign atleast one driver");
        return;
    }

    if(listDriver[0] === "") {
        listDriver.shift();
    }

    if(avai == "unavailable" && !vehicleRec.length) {
        showError("vehicle-error", "You must choose aleast one vehicle")
        return;
    }
    
    let data = "id="+kf_id+
                "&avai="+avai+
                "&driver="+listDriver+
                "&vehicle="+vehicleRec;
                // "&approval="+approval;

    xhrForm.open("POST", url, true);
    xhrForm.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrForm.send(data);
});


// *  ============================  APPROVE  =============================
const xhrApprove = new XMLHttpRequest();

xhrApprove.onload = () => {
    if(xhrApprove.status != 200) {
        console.log(xhrApprove.status);
        return;
    }

    if(xhrApprove.responseText == "Form status has been updated"){
        displayModalSuccess(xhrApprove.responseText);
    }
    else {
        displayModalError(xhrApprove.responseText);
    }
}

const btnApprove = document.getElementById("approve");
btnApprove.addEventListener("click", () => {
    let data = "id="+kf_id+
                "&approval=Approved";
    xhrApprove.open("POST", "../include/approve_eken.inc.php", true);
    xhrApprove.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrApprove.send(data);
});

const btnDeny = document.getElementById("deny");
btnDeny.addEventListener("click", () => {
    let data = "id="+kf_id+
                "&approval=Denied";
    xhrApprove.open("POST", "../include/approve_eken.inc.php", true);
    xhrApprove.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrApprove.send(data);
});