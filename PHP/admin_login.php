<?php
session_start();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/admin_login.css?=time()">
    <link rel="shortcut icon" href="../icon/ebooking logo.png" type="image/x-icon">
    <title>Admin login</title>
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
                    <li><a href="homepage.php"><img src="../icon/home.png"> Homepage</a></li>
                    <li><a href=""><img src="../icon/check-list.png"> View Status</a></li>
                    <li><a href=""><img src="../icon/calendar.png"> View calendar</a></li>
                    <li><a href="edit_profile.php"><img src="../icon/editing.png"> Edit Profile</a></li>
                    <li><a href="#"><img src="../icon/setting.png"> Admin Login</a></li>
                    <li><a href="" id="logout"><img src="../icon/logout.png"> Logout</a></li>
                </ul>
            </label>
        </div>
    </section>
    <section class="content">
        <main>
            <div class="wrapper-form">
                <h1>Admin login</h1>

                <form action="" id="myForm">
                    <label for="email">Email</label>
                    <br>
                    <input type="email" name="email" id="email" placeholder="Enter your email">
                    <span class="error email-error"></span>
                    
                    <br>

                    <label for="password">Password</label>
                    <br>
                    <div class="wrapper-password">
                        <input type="password" name="password" id="password" placeholder="Enter your password">
                        <img src="../icon/hide.png" id="password-toggle">
                    </div>
                    <span class="error password-error"></span>
                    <br>

                    <div class="wrapper-button">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </main>
    </section>
    
    <footer>
        <p><b>KOLEJ KOMUNITI SABAK BERNAM PROPERTY RIGHTS</b></p>
    </footer>

    <dialog class="logout-pop-up">
        <h1>Logout</h1>
        <form id="logout-form" method="dialog">
            <p>Are you sure you want to logout?</p>
            <br>
            <div class="wrapper-buttons">
                <button id="logout-cancel" type="button">No</button>
                <button type="submit">Yes</button>
            </div>
        </form>
    </dialog>

    <dialog class="modal-success">
        <h1>Success</h1>
        <p class="success-text"></p>
        <br>
        <button id="success-button" type="button">Ok</button>
    </dialog>

    <dialog class="modal">
        <h1 class="modal-h1"></h1>
        <p class="modal-text"></p>
        <br>
        <button id="modal-button" type="button">Ok</button>
    </dialog>

    <dialog class="modal-error">
        <h1>Error</h1>
        <p class="modal-p-error"></p>
        <br>
        <button id="error-button">Ok</button>
    </dialog>

    <script src="../JS/admin_login.js?=time()"></script>
</body>
</html>