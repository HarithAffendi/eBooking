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


// *  ============================ LIST PENDING =============================
const xhrPending = new XMLHttpRequest();

xhrPending.onload = () => {
    if(xhrPending.status != 200) {
        console.log(xhrPending.status);
        return;
    }

    let eKens = JSON.parse(xhrPending.responseText);

    let out = "";
    for(let eKen of eKens) {
        out += `
        <tr>
            <td style="width: 90%;">${eKen.kf_purpose}</td>
            <td style="width: 10%;"><a href="../PHP/admin_view_eken.php?id=${eKen.kf_id}">View</a></td>
        </tr>
        `;
    }

    if(!eKens.length) {
        out += `
            <div class="no-result">
                <img src="../icon/folder.png" alt="no result">
                <p><b>No result</b></p>
            </div>
        `;
    }

    document.querySelector(".pending").innerHTML = out;
}

let pStatus = "status=Pending";
xhrPending.open("POST", "../include/list_admin_eken.inc.php", true);
xhrPending.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhrPending.send(pStatus);


// *  ============================ LIST APPROVE =============================
const xhrApprove = new XMLHttpRequest();

xhrApprove.onload = () => {
    if(xhrApprove.status != 200) {
        console.log(xhrApprove.status);
        return;
    }

    let eKens = JSON.parse(xhrApprove.responseText);

    let out = "";
    for(let eKen of eKens) {
        out += `
        <tr>
            <td style="width: 90%;">${eKen.kf_purpose}</td>
            <td style="width: 10%;"><a href="../PHP/admin_view_eken.php?id=${eKen.kf_id}">View</a></td>
        </tr>
        `;
    }

    if(!eKens.length) {
        out += `
            <div class="no-result">
                <img src="../icon/folder.png" alt="no result">
                <p><b>No result</b></p>
            </div>
        `;
    }

    document.querySelector(".approved").innerHTML = out;
}

let aStatus = "status=Approved";
xhrApprove.open("POST", "../include/list_admin_eken.inc.php", true);
xhrApprove.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhrApprove.send(aStatus);


// *  ============================ LIST DENIED =============================
const xhrDenied = new XMLHttpRequest();

xhrDenied.onload = () => {
    if(xhrDenied.status != 200) {
        console.log(xhrDenied.status);
        return;
    }

    let eKens = JSON.parse(xhrDenied.responseText);
    
    let out = "";
    for(let eKen of eKens) {
        out += `
        <tr>
            <td style="width: 90%;">${eKen.kf_purpose}</td>
            <td style="width: 10%;"><a href="../PHP/admin_view_eken.php?id=${eKen.kf_id}">View</a></td>
        </tr>
        `;
    }

    if(!eKens.length) {
        out += `
            <div class="no-result">
                <img src="../icon/folder.png" alt="no result">
                <p><b>No result</b></p>
            </div>
        `;
    }

    document.querySelector(".denied").innerHTML = out;
}

let dStatus = "status=Denied";
xhrDenied.open("POST", "../include/list_admin_eken.inc.php", true);
xhrDenied.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhrDenied.send(dStatus);


