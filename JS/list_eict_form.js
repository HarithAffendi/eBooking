// *  ============================ LIST PENDING =============================
const xhrPending = new XMLHttpRequest();

xhrPending.onload = () => {
    if(xhrPending.status != 200) {
        console.log(xhrPending.status);
        return;
    }

    let eIcts = JSON.parse(xhrPending.responseText);

    let out = "";
    for(let eIct of eIcts) {
        out += `
        <tr>
            <td style="width: 90%;">${eIct.if_purpose}</td>
            <td style="width: 10%;"><a href="../PHP/admin_view_eict.php?id=${eIct.if_id}">View</a></td>
        </tr>
        `;
    }

    if(!eIcts.length) {
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
xhrPending.open("POST", "../include/list_admin_eict.inc.php", true);
xhrPending.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhrPending.send(pStatus);


// *  ============================ LIST APPROVE =============================
const xhrApprove = new XMLHttpRequest();

xhrApprove.onload = () => {
    if(xhrApprove.status != 200) {
        console.log(xhrApprove.status);
        return;
    }

    let eIcts = JSON.parse(xhrApprove.responseText);

    let out = "";
    for(let eIct of eIcts) {
        out += `
        <tr>
            <td style="width: 90%;">${eIct.if_purpose}</td>
            <td style="width: 10%;"><a href="../PHP/admin_view_eict.php?id=${eIct.if_id}">View</a></td>
        </tr>
        `;
    }

    if(!eIcts.length) {
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
xhrApprove.open("POST", "../include/list_admin_eict.inc.php", true);
xhrApprove.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhrApprove.send(aStatus);


// *  ============================ LIST APPROVE =============================
const xhrDenied = new XMLHttpRequest();

xhrDenied.onload = () => {
    if(xhrDenied.status != 200) {
        console.log(xhrDenied.status);
        return;
    }

    let eIcts = JSON.parse(xhrDenied.responseText);

    let out = "";
    for(let eIct of eIcts) {
        out += `
        <tr>
            <td style="width: 90%;">${eIct.if_purpose}</td>
            <td style="width: 10%;"><a href="../PHP/admin_view_eict.php?id=${eIct.if_id}">View</a></td>
        </tr>
        `;
    }

    if(!eIcts.length) {
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
xhrDenied.open("POST", "../include/list_admin_eict.inc.php", true);
xhrDenied.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhrDenied.send(dStatus);