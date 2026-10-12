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
    <link rel="stylesheet" href="../CSS/admin_homepage.css?=<?php echo rand() ?>" type="text/css">
    <link rel="shortcut icon" href="../icon/ebooking logo.png" type="image/x-icon">
    <title>Admin homepage</title>
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
                    <li><a href="#"><img src="../icon/home.png"> Homepage</a></li>
                    <li><a href="https://calendar.google.com/calendar/u/0?cid=ZWtlbmRlcmFhbkBzdGFmLmtrc2JzLmVkdS5teQ" target="_"><img src="../icon/calendar.png"> View calendar</a></li>
                    <li><a href="edit_admin_profile.php"><img src="../icon/editing.png"> Edit Profile</a></li>
                    <li><a href="" id="logout"><img src="../icon/logout.png"> Logout</a></li>
                </ul>
            </label>
        </div>
    </section>

    <section class="content">
        <main>
            <div class="user-details">
                <?php ?>
                <h1>Admin's Details</h1>
                <h2>Name</h2>
                <p id="user-name">Lorem ipsum</p>
                <br>
                <h2>Email</h2>
                <p id="user-email">Lorem ipsum</p>
                <br>
                <h2>Position</h2>
                <p id="user-position">Lorem ipsum</p>
                <br>
                <h2>Admin of</h2>
                <p id="user-type">Lorem ipsum</p>
                <br>
                <h2>Phone Number</h2>
                <p id="user-phone">Lorem ipsum</p>
            </div>

            <div class="apps">
                <h1>Apps</h1>
                <div class="apps-inner">
                    <div class="wrapper-img">
                        <a href="../include/form_redirect.inc.php"><img src="../img/stamp.png" id="approve-form"></a>
                        <br>
                        <label for="approve-form">View forms</label>
                    </div>
                    <div class="wrapper-img">
                        <a href="../include/stat_redirect.inc.php"><img src="../img/pie-chart.png" id="stat"></a>
                        <br>
                        <label for="stat">Statistic</label>
                    </div>
                </div>
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
    

    <script src="../JS/admin_homepage.js?=time()"></script>
</body>
</html>