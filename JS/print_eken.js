// *  ============================  FUNCTION =============================
function convertDate(date) {
    dateArray = date.split("-");

    let targetDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2].substr(0,2));

    let day = ("0" + targetDate.getDate()).slice(-2);
    let month = ("0" + (targetDate.getMonth() + 1)).slice(-2);
    
    // let newDate = targetDate.getFullYear()+"-"+(month)+"-"+(day) ;
    let newDate = (day)+"-"+(month)+"-"+targetDate.getFullYear() ; // only for this page 
    
    return newDate;
}

function convertTo12(time24) {
    timeArray = time24.split(":");

    let hour = parseInt(timeArray[0]);
    let minute = timeArray[1];
    let period = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    hour = hour ? hour : 12;

    return `${hour}:${minute} ${period}`;
}

// *  ============================  PRINT =============================
let btnPrint = document.getElementById("print");

btnPrint.addEventListener("click", () => {
    window.print();
})


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

    document.getElementById("name").innerHTML = kForm.s_name;
    document.getElementById("numStudent").innerHTML = kForm.kf_numStudent;
    document.getElementById("numStaff").innerHTML = kForm.kf_numStaff;
    document.getElementById("purpose").innerHTML = kForm.kf_purpose; 
    document.getElementById("destination").innerHTML = kForm.kf_destination;
    document.getElementById("depDate").innerHTML = convertDate(kForm.kf_departureDate);
    document.getElementById("depTime").innerHTML = convertTo12(kForm.kf_departureTime);
    document.getElementById("retDate").innerHTML = convertDate(kForm.kf_returnDate);
    document.getElementById("retTime").innerHTML = convertTo12(kForm.kf_returnTime);
    document.getElementById("staDate").innerHTML = convertDate(kForm.kf_startDate);
    document.getElementById("staTime").innerHTML = convertTo12(kForm.kf_startTime);
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
        <div class="driver"> - ${d}</div>
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
            <div>
            <input type="checkbox" name="vehicleReq[]" value="${vehicle.kv_id}" onclick="return false" checked>${vehicle.kv_name} (${vehicle.kv_plate})
            </div>
            `;
        }
        else {
            outReq += `
            <div>
            <input type="checkbox" name="vehicleReq[]" value="${vehicle.kv_id}" onclick="return false">${vehicle.kv_name} (${vehicle.kv_plate})
            </div>
            `;
        }

    }

    document.querySelector(".req-vehicle").innerHTML = outReq;

    let outRec = "";
    for(let vehicle of vehicles) {
        if(recommendList.includes(vehicle.kv_id)) {
            outRec += `
            <div>
            <input type="checkbox" name="vehicleRec[]" value="${vehicle.kv_id}" onclick="return false" checked>${vehicle.kv_name} (${vehicle.kv_plate})
            </div>
            `;
        }
        else {
            outRec += `
            <div>
            <input type="checkbox" name="vehicleRec[]" value="${vehicle.kv_id}" onclick="return false">${vehicle.kv_name} (${vehicle.kv_plate})
            </div>
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