// *  ============================ SIDE BAR =============================
let toggle = document.getElementById("nav-toggle");
let sidenav = document.querySelector(".sidenav");

toggle.addEventListener("click", () => {
    sidenav.classList.toggle("toggle");
});


// *  ============================ XHR FOR USER INFO =============================
const xhrDetail = new XMLHttpRequest(); // create an xhr object

xhrDetail.onload  = () => {
    if(xhrDetail.status != 200) { // check status
        console.log(xhrDetail.status);
        return;
    }

    // console.log(xhrDetail.responseText);
    let user = JSON.parse(xhrDetail.responseText);

    // display user details
    document.getElementById("user-name").innerHTML = user.s_name;
    document.getElementById("user-email").innerHTML = user.s_email;
    document.getElementById("user-position").innerHTML = user.s_position;
    document.getElementById("user-phone").innerHTML = user.s_phone;
};

xhrDetail.open("GET", "../include/f_user_info.inc.php", true);
xhrDetail.send();


// *  ============================ LOGOUT =============================
let logoutModal = document.querySelector(".logout-pop-up");

let logoutCancel = document.getElementById("logout-cancel");

logoutCancel.addEventListener("click", () => {
    logoutModal.close();
});

const xhrLogout = new XMLHttpRequest(); // create an xhr object

xhrLogout.onload = () => {
    if(xhrLogout.status != 200) { // check status
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
