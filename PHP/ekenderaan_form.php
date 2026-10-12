<?php
session_start();
if($_SESSION['privilege'] != "staff") {
    header("Location: login.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/ekenderaan_form.css?=<?php echo rand() ?>">
    <link rel="shortcut icon" href="../icon/ebooking logo.png" type="image/x-icon">
    <title>eKenderaan Form</title>
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
                    <li><a href="view_status.php"><img src="../icon/check-list.png"> View Status</a></li>
                    <li><a href="https://calendar.google.com/calendar/u/0?cid=ZWtlbmRlcmFhbkBzdGFmLmtrc2JzLmVkdS5teQ" target="_"><img src="../icon/calendar.png"> View calendar</a></li>
                    <li><a href="edit_profile.php"><img src="../icon/editing.png"> Edit Profile</a></li>
                    <li><a href="#" id="logout"><img src="../icon/logout.png"> Logout</a></li>
                </ul>
            </label>
        </div>
        </section>

    <section class="content">
        <main>
            <div class="wrapper-form">
                <form id="mainForm" action="../include/ekenderaan_form.inc.php" method="post" enctype="multipart/form-data">
                    <div class="upper-form">
                        <label for="purpose"><b>Purpose</b></label>
                        <input type="text" name="purpose" id="purpose">
                        <span class="error purpose-error"></span>
    
                        <label for="destination"><b>Destination</b></label>
                        <input type="text" name="destination" id="destination">
                        <span class="error destination-error"></span>

                        <label for=""><b>Number of passengers</b></label>
                        <div class="wrapper-flex">
                            <div class="flex">
                                <label for="numStudent">Student:</label>
                                <input type="number" name="numStudent" id="numStudent" min="0">
                            </div>
                            <div class="flex">
                                <label for="numStaff">Staff:</label>
                                <input type="number" name="numStaff" id="numStaff" min="0">
                            </div>
                        </div>
                        <span class="error passenger-error"></span>

                        <label for="file"><b>File</b></label>
                        <input type="file" name="file" id="file">
                        <span class="error file-error"></span>
                    </div>

                    <div class="lower-form">
                        <label for=""><b>Departure</b></label>
                        <div class="wrapper-date-time">
                            <div class="date-time">
                                <label for="depDate">Date:</label>
                                <input type="date" name="depDate" id="depDate">
                            </div>
                            <div class="date-time">
                                <label for="depTime">Time:</label>
                                <input type="time" name="depTime" id="depTime">
                            </div>
                        </div>
                        <span class="error departure-error"></span>
    
                        <label for=""><b>Return</b></label>
                        <div class="wrapper-date-time">
                            <div class="date-time">
                                <label for="retDate">Date:</label>
                                <input type="date" name="retDate" id="retDate">
                            </div>
                            <div class="date-time">
                                <label for="retTime">Time:</label>
                                <input type="time" name="retTime" id="retTime">
                            </div>
                        </div>
                        <span class="error return-error"></span>
    
                        <label for=""><b>Start</b></label>
                        <div class="wrapper-date-time">
                            <div class="date-time">
                                <label for="staDate">Date:</label>
                                <input type="date" name="staDate" id="staDate">
                            </div>
                            <div class="date-time">
                                <label for="staTime">Time:</label>
                                <input type="time" name="staTime" id="staTime">
                            </div>
                        </div>
                        <span class="error start-error"></span>

                        <label for=""><b>Vehicle</b></label>
                        <table class="list-vehicle">
                        </table>
                        <span class="error vehicle-error"></span>
    
                        <br>
                        <button type="submit" class="submit">Submit</button>
                    </div>
                    
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

    <script src="../JS/ekenderaan_form.js?=time()"></script>
</body>
</html>