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
let addAdmin = document.getElementById("add-admin");

addAdmin.addEventListener("click", () => {
    window.location.href = "../PHP/add_admin.php";
});


// *  ============================ GET ALL ADMIN =============================
const xhrList = new XMLHttpRequest();

xhrList.onload = () => {
    if(xhrList.status != 200) {
        console.log(xhrList.status);
        return;
    }

    let admins = JSON.parse(xhrList.responseText);
    
    let out = "";
    for(let admin of admins) {
        out += `
            <tr>
                <td style="width: 5%;">${admin.a_type}</td>
                <td style="width: 85%;">${admin.a_name}</td>
                <td style="width: 10%;"><a href="../PHP/view_admin.php?id=${admin.a_id}">View</a></td>
            </tr>
        `;
    }

    if(!admins.length) {
        out += `
            <div class="no-result">
                <img src="../icon/folder.png" alt="no result">
                <p><b>No result</b></p>
            </div>
        `;
    }

    document.querySelector(".admin-list").innerHTML = out;
};

xhrList.open("GET", "../include/list_admin.inc.php", true);
// xhrList.open("GET", "../admintest.json", true);
// xhrList.open("GET", "../empty.json", true);
xhrList.send();


// *  ============================ SEARCH BAR =============================
const xhrSearch = new XMLHttpRequest();

xhrSearch.onload = () => {
    if(xhrSearch.status != 200) {
        console.log(xhrSearch.status);
        return;
    }

    let admins = JSON.parse(xhrSearch.responseText);
    
    let out = "";
    for(let admin of admins) {
        out += `
            <tr>
                <td style="width: 5%;">${admin.a_type}</td>
                <td style="width: 85%;">${admin.a_name}</td>
                <td style="width: 10%;"><a href="../PHP/view_admin.php?id=${admin.a_id}">View</a></td>
            </tr>
        `;
    }

    if(!admins.length) {
        out += `
            <div class="no-result">
                <img src="../icon/folder.png" alt="no result">
                <p><b>No result</b></p>
            </div>
        `;
    }

    document.querySelector(".admin-list").innerHTML = out;
}


const form = document.getElementById("mainForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let search = form.search;

    if(search.value === "") {
        xhrList.open("GET", "../include/list_admin.inc.php", true);
        xhrList.send();
        return;
    }

    let data = "search="+search.value;
    xhrSearch.open("POST", "../include/list_admin_query.inc.php", true);
    xhrSearch.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhrSearch.send(data);
})