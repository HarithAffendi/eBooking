<?php
session_start()
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/admin_view_eict.css?=time()">
    <link rel="shortcut icon" href="../icon/ebooking logo.png" type="image/x-icon">
    <title>Document</title>
</head>
<body>
    <header>
        <img id="nav-toggle" src="../icon/list.png">
        <img src="../img/ebooking.png" alt="Logo KKSB">
    </header>
    <!-- side bar -->
    <section class="sidenav">
        <h1>Navigation</h1>
        <div class="wrapper-nav">
            <label>
                <ul>
                    <li><a href="admin_homepage.php"><img src="../icon/home.png"> Homepage</a></li>
                    <li><a href="https://calendar.google.com/calendar/u/0?cid=ZWtlbmRlcmFhbkBzdGFmLmtrc2JzLmVkdS5teQ" target="_"><img src="../icon/calendar.png"> View calendar</a></li>
                    <li><a href="edit_admin_profile.php"><img src="../icon/editing.png"> Edit Profile</a></li>
                    <li><a href="#" id="logout"><img src="../icon/logout.png"> Logout</a></li>
                </ul>
            </label>
        </div>
        </section>

        <section class="content">
            <main>
                <div class="booking">
                    <h1>Applicant's segment</h1>

                    <label for=""><b>Purpose</b></label>
                    <input type="text" name="purpose" id="purpose" readonly>
                    
                    <label for=""><b>Applicant's name</b></label>
                    <input type="text" name="name" id="name" readonly>

                    <label for=""><b>Place</b></label>
                    <input type="text" name="place" id="place" readonly>

                    <div class="dates">
                        <div class="date">
                            <label for=""><b>Borrow date</b></label>
                            <input type="date" name="borDate" id="borDate">
                        </div>
                        <div class="date">
                            <label for=""><b>Expected return date</b></label>
                            <input type="date" name="retDate" id="retDate">
                        </div>
                    </div>

                    <table id="equipment">
                        <tr>
                            <td style="width: 75%;"><label for=""><b>Equipment to borrow</b></label></td>
                            <td><label for=""><b>Quantity</b></label></td>
                        </tr>
                        <tr>
                            <td>Laptop</td>
                            <td>2</td>
                        </tr>
                    </table>

                    <label for=""><b>Status</b></label>
                    <b id="status">Pending</b>
                </div>

                <div class="admin">
                    <h1>Admin's segment</h1>

                    <table class="qoh">
                        <tr>
                            <th style="width: 75%;">Equipment</th>
                            <th>Quantity on hand</th>
                        </tr>
                        <tr>
                            <td>Laptop</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>Laptop</td>
                            <td>2</td>
                        </tr>
                    </table>

                    <label for=""><b>Approval</b></label>
                    <div class="approval">
                        <button id="approve" type="button">Approve</button>
                        <button id="deny" type="button">Deny</button>
                    </div>

                    <!-- <button id="view_equip_status" type="button">View equipment status</button> -->
                    <button id="equip_return" type="button">Return equipments</button>
                </div>
            </main>
        </section>

        <footer>
            <p><b>KOLEJ KOMUNITI SABAK BERNAM PROPERTY RIGHTS</b></p>
        </footer>
    
        <dialog class="modal">
            <h1 class="modal-h1"></h1>
            <p class="modal-text"></p>
            <br>
            <div class="wrapper-button">
                <button id="modal-button" type="button">Ok</button>
            </div>
        </dialog>
        
        <dialog class="logout-pop-up">
            <h1>Logout</h1>
            <form id="logout-form" method="dialog">
                <p>Are you sure you want to logout?</p>
                <br>
                <div class="wrapper-button">
                    <button id="logout-cancel" type="button">No</button>
                    <button type="submit">Yes</button>
                </div>
            </form>
        </dialog>
    
        <dialog class="modal-success">
            <h1>Success</h1>
            <p class="success-text"></p>
            <br>
            <div class="wrapper-button">
                <button id="success-button" type="button">Ok</button>
            </div>
        </dialog>
        
        <dialog class="modal-error">
            <h1>Error</h1>
            <p class="modal-p-error"></p>
            <br>
            <div class="wrapper-button">
                <button id="error-button">Ok</button>
            </div>
        </dialog>


    <script src="../JS/module.js?=time()"></script>
    <script src="../JS/admin_view_eken.js?=time()"></script>
</body>
</html>