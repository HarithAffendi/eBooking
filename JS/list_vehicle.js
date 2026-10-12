// *  ============================ ADD VEHICLE =============================
let addStaff = document.getElementById("add-vehicle");

addStaff.addEventListener("click", () => {
    window.location.href = "../PHP/add_vehicle.php";
});


// *  ============================ GET ALL VEHICLE =============================
const xhrList = new XMLHttpRequest();

xhrList.onload = () => {
    if(xhrList.status != 200) {
        console.log(xhrList.status);
        return;
    }

    let vehicles = JSON.parse(xhrList.responseText);
    
    let out = "";
    for(let vehicle of vehicles) {
        out += `
            <tr>
                <td style="width: 75%;">${vehicle.kv_name}</td>
                <td style="width: 15%;">${vehicle.kv_plate}</td>
                <td style="width: 10%;"><a href="../PHP/view_vehicle.php?id=${vehicle.kv_id}">View</a></td>
            </tr>
        `;
    }

    if(!vehicles.length) {
        out += `
            <div class="no-result">
                <img src="../icon/folder.png" alt="no result">
                <p><b>No result</b></p>
            </div>
        `;
    }

    document.querySelector(".vehicle-list").innerHTML = out;
};

xhrList.open("GET", "../include/get_vehicle.inc.php", true);
// xhrList.open("GET", "../testken.json", true);
xhrList.send();


// *  ============================ SEARCH BAR =============================
const xhrSearch = new XMLHttpRequest();

xhrSearch.onload = () => {
    if(xhrSearch.status != 200) {
        console.log(xhrSearch.status);
        return;
    }

    let vehicles = JSON.parse(xhrSearch.responseText);
    
    let out = "";
    for(let vehicle of vehicles) {
        out += `
            <tr>
                <td style="width: 75%;">${vehicle.kv_name}</td>
                <td style="width: 15%;">${vehicle.kv_plate}</td>
                <td style="width: 10%;"><a href="../PHP/view_vehicle.php?id=${vehicle.kv_id}">View</a></td>
            </tr>
        `;
    }

    if(!vehicles.length) {
        out += `
            <div class="no-result">
                <img src="../icon/folder.png" alt="no result">
                <p><b>No result</b></p>
            </div>
        `;
    }

    document.querySelector(".vehicle-list").innerHTML = out;
}


const form = document.getElementById("mainForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let search = form.search;

    if(search.value === "") {
        xhrList.open("GET", "../include/get_vehicle.inc.php", true);
        xhrList.send();
        return;
    }

    let data = "search="+search.value;
    xhrSearch.open("POST", "../include/list_vehicle_query.inc.php", true);
    xhrSearch.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrSearch.send(data);
})