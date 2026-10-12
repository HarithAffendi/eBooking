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


// *  ============================ CONVERT DATE =============================
function convertDate(date) {
    dateArray = date.split("-");
    newDate = dateArray[2]+"/"+dateArray[1]+"/"+dateArray[0];
    return newDate;
}

function convertTime(time) {
    let [hour, minute, second] = time.split(":");
    hour = parseInt(hour);
    minute = parseInt(minute);

    let period = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    if (hour === 0) {
        hour = 12; // 12 AM or 12 PM
    }

    minute = minute < 10 ? '0' + minute : minute;

    return `${hour}:${minute} ${period}`;
}