<?php
session_start();
if($_SESSION['privilege'] != "admin" || $_SESSION['type'] != "SUPER") {
    header("Location: login.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/add_admin.css?=time()">
    <link rel="shortcut icon" href="../icon/ebooking logo.png" type="image/x-icon">
    <title>Add Admin</title>
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
                    <li><a href="super_homepage.php"><img src="../icon/home.png"> Homepage</a></li>
                    <li><a href="https://calendar.google.com/calendar/u/0?cid=ZWtlbmRlcmFhbkBzdGFmLmtrc2JzLmVkdS5teQ" target="_"><img src="../icon/calendar.png"> View calendar</a></li>
                    <li><a href="#" id="logout"><img src="../icon/logout.png"> Logout</a></li>
                </ul>
            </label>
        </div>
    </section>

    <section class="content">
        <main>
            <div class="wrapper-form">
                <h1>Enter new Admin details</h1>
                <form id="mainForm" action="">
                    <div class="wrapper-input">
                        <label for="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter the admin name">
                    </div>
                    <div class="wrapper-error">
                        <span class="error name-error"></span>
                    </div>
    
                    <div class="wrapper-input">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Enter the admin email">
                    </div>
                    <div class="wrapper-error">
                        <span class="error email-error"></span>
                    </div>
    
                    <div class="wrapper-input">
                        <label for="position">Position</label>
                        <input type="text" name="position" id="position" placeholder="Enter the admin position">
                    </div>
                    <div class="wrapper-error">
                        <span class="error position-error"></span>
                    </div>
    
                    <div class="wrapper-input">
                        <label for="phone">Phone Number</label>
                        <input type="text" name="phone" id="phone" placeholder="Enter the admin phone number">
                    </div>
                    <div class="wrapper-error">
                        <span class="error phone-error"></span>
                    </div>

                    <div class="wrapper-input">
                        <label for="type">Type</label>
                        <select name="type" id="type">
                            <option value="" style="color: gray;">Select the admin type</option>
                            <option value="eFasiliti">eFasiliti</option>
                            <option value="eICT">eICT</option>
                            <option value="eKenderaan">eKenderaan</option>
                        </select>
                    </div>
                    <div class="wrapper-error">
                        <span class="error type-error"></span>
                    </div>

                    <div class="wrapper-input">
                        <label for="password">Password</label>
                        <div class="wrapper-password">
                            <input type="password" name="password" id="password" placeholder="Enter the admin password">
                            <img src="../icon/hide.png" id="password-toggle">
                        </div>
                    </div>
                    <div class="wrapper-error">
                        <span class="error password-error"></span>
                    </div>

                    <div class="wrapper-input">
                        <label for="conPass">Confirm password</label>
                        <div class="wrapper-password">
                            <input type="password" name="conPass" id="conPass" placeholder="Confirm the passowrd">
                            <img src="../icon/hide.png" id="conPass-toggle">
                        </div>
                    </div>
                    <div class="wrapper-error">
                        <span class="error conPassword-error"></span>
                    </div>

                    <br>
                    <button type="submit">Save</button>
    
                </form>
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

    <script src="../JS/add_admin.js?=1"></script>
</body>
</html>