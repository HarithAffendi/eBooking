// *  ============================ EKEN STAT =============================
const xhrFStat = new XMLHttpRequest();

xhrFStat.onload = () => {
    if(xhrFStat.status != 200) {
        console.log(xhrFStat.status);
        return;
    }

    let stats = JSON.parse(xhrFStat.responseText);

    document.getElementById("submit").innerHTML = stats.submit;
    document.getElementById("approved").innerHTML = stats.approved;
    document.getElementById("denied").innerHTML = stats.denied;
}

// xhrFStat.open("GET", "../kk.json", true);
xhrFStat.open("GET", "../include/get_eken_stat.inc.php", true);
xhrFStat.send();


// *  ============================ VEHICLE STAT =============================
const xhrVstat = new XMLHttpRequest();

xhrVstat.onload = () => {
    if(xhrVstat.status != 200) {
        console.log(xhrVstat.status);
        return;
    }

    let table = JSON.parse(xhrVstat.responseText);

    let out = "";
    for(let row of table) {
        out += `
        <tr>
            <td>${row.kv_name}</td>
            <td>${row.reqcount}</td>
            <td>${row.reccount}</td>
        </tr>
        `;
    }
    document.getElementById("stat").innerHTML += out;
}

xhrVstat.open("GET", "../include/get_vehicle_stat.inc.php", true);
xhrVstat.send();

// * the old code will not be used again
// let vehicle = [];
// let v_name = [];
// const xhrVehicle = new XMLHttpRequest();

// let check = 0;

// xhrVehicle.onload = () => {
//     if(xhrVehicle.status != 200) {
//         console.log(xhrVehicle.status);
//         return;
//     }

//     let data = JSON.parse(xhrVehicle.responseText);
//     for(let d of data) {
//         vehicle.push(d.kv_id);
//         v_name.push(d.kv_name+" ("+d.kv_plate+")");
//     }
// }

// // xhrVehicle.open("GET", "../testken.json", true);
// xhrVehicle.open("GET", "../include/get_vehicle.inc.php", true);
// xhrVehicle.send();

// let monthreq = [];
// const xhrMonthReq = new XMLHttpRequest();

// xhrMonthReq.onload = () => {
//     if(xhrMonthReq.status != 200) {
//         console.log(xhrMonthReq.status);
//         return;
//     }

//     let data = JSON.parse(xhrMonthReq.responseText);
//     for(let id of vehicle) {
//         if(id in data) {
//             monthreq.push(data[id]);
//         }
//         else {
//             monthreq.push("0");
//         }
//     }
// }

// // xhrMonthReq.open("GET", "../tess.json", true);
// xhrMonthReq.open("GET", "../include/get_num_vreq.inc.php", true);
// xhrMonthReq.send();

// let monthrec = [];
// const xhrMonthRec = new XMLHttpRequest();

// xhrMonthRec.onload = () => {
//     if(xhrMonthRec.status != 200) {
//         console.log(xhrMonthRec.status);
//         return;
//     }

//     let data = JSON.parse(xhrMonthRec.responseText);
//     for(let id of vehicle) {
//         if(id in data) {
//             monthrec.push(data[id]);
//         }
//         else{
//             monthrec.push("0");
//         }
//     }

//     let out = "";
//     for(let i=0; i<vehicle.length; i++) {
//         out += `
//         <tr>
//             <td>${v_name[i]}</td>
//             <td>${monthreq[i]}</td>
//             <td>${monthrec[i]}</td>
//         </tr>
//         `;
//     }
//     document.getElementById("stat").innerHTML += out;
// }

// // xhrMonthRec.open("GET", "../som.json", true);
// xhrMonthRec.open("GET", "../include/get_num_vrec.inc.php", true);
// xhrMonthRec.send();
