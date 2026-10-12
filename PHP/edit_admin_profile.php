<?php
session_start();
if($_SESSION['privilege'] != "admin" || $_SESSION['type'] == "SUPER") {
    header("Location: login.php");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/edit_admin_profile.css?=time()">
    <link rel="shortcut icon" href="../icon/ebooking logo.png" type="image/x-icon">
    <title>Edit Admin Details</title>
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
                    <li><a href="#"><img src="../icon/editing.png"> Edit Profile</a></li>
                    <li>
                        <div class="subnav">
                            <a href="#" id="edit-password"><img src="../icon/code.png"> Edit Password</a>
                        </div>
                    </li>
                    <li><a href="#" id="logout"><img src="../icon/logout.png"> Logout</a></li>
                </ul>
            </label>
        </div>
    </section>

    <section class="content">
        <main>
            <div class="wrapper-form">
                <h1>User Profile</h1>
                <form id="mainForm" action="">
                    <div class="wrapper-input">
                        <label for="name">Name</label>
                        <input type="text" name="name" id="name">
                    </div>
                    <div class="wrapper-error">
                        <span class="error name-error"></span>
                    </div>
    
                    <div class="wrapper-input">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email">
                    </div>
                    <div class="wrapper-error">
                        <span class="error email-error"></span>
                    </div>
    
                    <div class="wrapper-input">
                        <label for="position">Position</label>
                        <input type="text" name="position" id="position">
                    </div>
                    <div class="wrapper-error">
                        <span class="error position-error"></span>
                    </div>
    
                    <div class="wrapper-input">
                        <label for="phone">Phone Number</label>
                        <input type="text" name="phone" id="phone">
                    </div>
                    <div class="wrapper-error">
                        <span class="error name-error"></span>
                    </div>

                    <br>
                    <button type="reset">Reset</button>
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
    
    <dialog class="password-pop-up">
        <h1>Edit password</h1>
        <form id="password-form" method="dialog">
            <label for="password">Password</label>
            <div class="wrapper-password">
                <input class="input" type="password" placeholder="Enter your new password" id="password" name="password">
                <img src="../icon/hide.png" id="password-toggle">
            </div>
            <span class="error password-error"></span>
            
            <label for="conPass">Confirm password</label>
            <div class="wrapper-password">
                <input class="input" type="password" placeholder="Confirm your password" id="conPass" name="conPass">
                <img src="../icon/hide.png" id="conPass-toggle">
            </div>
            <span class="error conPass-error"></span>
            
            <div class="wrapper-buttons">
                <button id="password-cancel" type="button">No</button>
                <button type="submit">Yes</button>
            </div>
        </form>
    </dialog>
    
    <dialog class="modal-error">
        <h1>Error</h1>
        <p class="modal-p-error"></p>
        <br>
        <div class="wrapper-button">
            <button id="error-button">Ok</button>
        </div>
    </dialog>

    <script src="../JS/edit_admin_profile.js?=time()"></script>
</body>
</html>