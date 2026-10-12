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


// *  ============================ GET ALL STAFF =============================
const xhrDetail = new XMLHttpRequest();

xhrDetail.onload = () => {
    let staffs = JSON.parse(xhrDetail.responseText);
    
    let out = "";
    for(let staff of staffs) {
        out += `
            <tr>
                <td style="width: 5%;">${staff.s_id}</td>
                <td style="width: 85%;">${staff.s_name}</td>
                <td style="width: 10%;"><a href="">View</a></td>
            </tr>
        `;
    }

    document.querySelector(".staff-list").innerHTML = out;
};

// xhrDetail.open("GET", "../include/get_staff.inc.php", true);
xhrDetail.open("GET", "../tess.json", true);
xhrDetail.send();