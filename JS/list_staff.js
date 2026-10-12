// *  ============================ SIDE BAR =============================
let toggle = document.getElementById("nav-toggle");
let sidenav = document.querySelector(".sidenav");

toggle.addEventListener("click", () => {
    sidenav.classList.toggle("toggle");
});


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


// *  ============================ ADD STAFF =============================
let addStaff = document.getElementById("add-staff");

addStaff.addEventListener("click", () => {
    window.location.href = "../PHP/add_staff.php";
});


// *  ============================ GET ALL STAFF =============================
const xhrList = new XMLHttpRequest();

xhrList.onload = () => {
    if(xhrList.status != 200) {
        console.log(xhrList.status);
        return;
    }

    let staffs = JSON.parse(xhrList.responseText);
    
    let out = "";
    for(let staff of staffs) {
        out += `
            <tr>
                <td style="width: 5%;">${staff.s_id}</td>
                <td style="width: 85%;">${staff.s_name}</td>
                <td style="width: 10%;"><a href="../PHP/view_staff.php?id=${staff.s_id}">View</a></td>
            </tr>
        `;
    }

    if(!staffs.length) {
        out += `
            <div class="no-result">
                <img src="../icon/folder.png" alt="no result">
                <p><b>No result</b></p>
            </div>
        `;
    }

    document.querySelector(".staff-list").innerHTML = out;
};

xhrList.open("GET", "../include/list_staff.inc.php", true);
// xhrList.open("GET", "../tess.json", true);
xhrList.send();


// *  ============================ SEARCH BAR =============================
const xhrSearch = new XMLHttpRequest();

xhrSearch.onload = () => {
    if(xhrSearch.status != 200) {
        console.log(xhrSearch.status);
        return;
    }

    let staffs = JSON.parse(xhrSearch.responseText);
    
    let out = "";
    for(let staff of staffs) {
        out += `
            <tr>
                <td style="width: 5%;">${staff.s_id}</td>
                <td style="width: 85%;">${staff.s_name}</td>
                <td style="width: 10%;"><a href="../PHP/view_staff.php?id=${staff.s_id}">View</a></td>
            </tr>
        `;
    }

    if(!staffs.length) {
        out += `
            <div class="no-result">
                <img src="../icon/folder.png" alt="no result">
                <p><b>No result</b></p>
            </div>
        `;
    }

    document.querySelector(".staff-list").innerHTML = out;
}


const form = document.getElementById("mainForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let search = form.search;

    if(search.value === "") {
        xhrList.open("GET", "../include/list_staff.inc.php", true);
        xhrList.send();
        return;
    }

    let data = "search="+search.value;
    xhrSearch.open("POST", "../include/list_staff_query.inc.php", true);
    xhrSearch.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrSearch.send(data);
})