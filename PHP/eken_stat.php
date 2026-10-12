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
    <link rel="stylesheet" href="../CSS/eken_stat.css?=time()">
    <link rel="shortcut icon" href="../icon/ebooking logo.png" type="image/x-icon">
    <title>eKenderaan Statistics</title>
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
                <div class="wrapper-stat">
                    <div class="submit">
                        <h1>Number of form submitted for the past 6 months:</h1>
                        <p id="submit">0</p>
                    </div>
                    <div class="flex">
                        <div class="approved">
                            <h1>Approved:</h1>
                            <p id="approved">0</p>
                        </div>
                        <div class="denied">
                            <h1>Denied:</h1>
                            <p id="denied">0</p>
                        </div>
                    </div>
                </div>

                <div class="table-wrapper">
                    <h1>Vehicle statistics for the past 6 months</h1>

                    <br>
                    <table id="stat">
                        <tr>
                            <th class="vehicle">Vehicle</th>
                            <th class="col">Number of request</th>
                            <th class="col">Number of recommend</th>
                        </tr>
                    </table>

                    <!-- <p class="note">Refresh the page if there is something wrong with the table</p> -->
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
                <div class="wrapper-button">
                    <button id="logout-cancel" type="button">No</button>
                    <button type="submit">Yes</button>
                </div>
            </form>
        </dialog>

    <script src="../JS/module.js"></script>
    <script src="../JS/eken_stat.js?=1+time()" defer></script>
</body>
</html>