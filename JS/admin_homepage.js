// *  ============================ SIDE BAR =============================
let toggle = document.getElementById("nav-toggle");
let sidenav = document.querySelector(".sidenav");

toggle.addEventListener("click", () => {
    sidenav.classList.toggle("toggle");
});


// *  ============================ ADMIN DETAILS =============================
const xhrDetail = new XMLHttpRequest();

xhrDetail.onload = () => {
    if(xhrDetail.status != 200) {
        console.log(xhrDetail.status);
        return;
    }

    let user = JSON.parse(xhrDetail.responseText);

    document.getElementById("user-name").innerHTML = user.a_name;
    document.getElementById("user-email").innerHTML = user.a_email;
    document.getElementById("user-position").innerHTML = user.a_position;
    document.getElementById("user-type").innerHTML = user.a_type;
    document.getElementById("user-phone").innerHTML = user.a_phone;
}

xhrDetail.open("GET", "../include/f_admin_info.inc.php", true);
xhrDetail.send();


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

