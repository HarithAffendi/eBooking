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
    <link rel="stylesheet" href="../CSS/admin_view_eken.css?=time()">
    <link rel="shortcut icon" href="../icon/ebooking logo.png" type="image/x-icon">
    <title>View eKenderaan Form</title>
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
            <div class="wrapper-form">
            <h1>Applicant's segment</h1>
                <form action="#" method="post">
                    <div class="upper-form">
                        <label for="purpose"><b>Purpose</b></label>
                        <input type="text" name="purpose" id="purpose" readonly>
                        
                        <label for="name"><b>Name of the applicant</b></label>
                        <input type="text" name="name" id="name" readonly>
    
                        <label for="destination"><b>Destination</b></label>
                        <input type="text" name="destination" id="destination" readonly>
    
                        <label for=""><b>File</b></label>
                        <div class="file">
                            <a href="#" id="file" target="_">File name</a>
                        </div>

                        <label for=""><b>Number of passengers</b></label>
                        <div class="wrapper-flex">
                            <div class="flex">
                                <label for="numStudent">Student:</label>
                                <input type="number" name="numStudent" id="numStudent" readonly>
                            </div>
                            <div class="flex">
                                <label for="numStaff">Staff:</label>
                                <input type="number" name="numStaff" id="numStaff" readonly>
                            </div>
                        </div>
                        
                    </div>

                    <div class="lower-form">
                        <label for=""><b>Departure</b></label>
                        <div class="wrapper-date-time">
                            <div class="date-time">
                                <label for="depDate">Date:</label>
                                <input type="date" name="depDate" id="depDate" readonly>
                            </div>
                            <div class="date-time">
                                <label for="depTime">Time:</label>
                                <input type="time" name="depTime" id="depTime" readonly>
                            </div>
                        </div>
    
                        <label for=""><b>Return</b></label>
                        <div class="wrapper-date-time">
                            <div class="date-time">
                                <label for="retDate">Date:</label>
                                <input type="date" name="retDate" id="retDate" readonly>
                            </div>
                            <div class="date-time">
                                <label for="retTime">Time:</label>
                                <input type="time" name="retTime" id="retTime" readonly>
                            </div>
                        </div>
    
                        <label for=""><b>Start</b></label>
                        <div class="wrapper-date-time">
                            <div class="date-time">
                                <label for="staDate">Date:</label>
                                <input type="date" name="staDate" id="staDate" readonly>
                            </div>
                            <div class="date-time">
                                <label for="staTime">Time:</label>
                                <input type="time" name="staTime" id="staTime" readonly>
                            </div>
                        </div>
    
                        <label for=""><b>Vehicle</b></label>
                        <table class="req-vehicle">
                        </table>
                    </div>
                    
                </form>
            </div>

            <div class="wrapper-form">
                <h1>Admin's segment A</h1>
                <form id="updateForm" action="../include/update_eken.inc.php" method="post">
                    <div class="upper-form">
                        <label for=""><b>Vehicles' Availablity</b></label>
                        <table>
                            <tr>
                                <td>
                                    <input type="radio" name="availability" id="available" value="Available"><label for="available">Available</label>
                                </td>
                                <td>
                                    <input type="radio" name="availability" id="unavailable" value="Unavailable"><label for="unavailable">Unavailable</label>
                                </td>
                            </tr>
                        </table>
                        <span class="error avai-error"></span>

                        <br>

                        <div class="header-driver">
                            <div>
                                <label for=""><b>Driver's Name</b></label>
                            </div>
                            <div>
                                <button type="button" id="add-driver">+</button>
                            </div>
                        </div>
                        <div class="driver-list">
                            <div class="driver" id="theDriver">
                                <input type="text" name="driver[]" placeholder="Enter the driver's name">
                                <a href="#" class="remove" style="background-color: gray;">-</a>
                            </div>
                        </div>
                        <span class="error driver-error"></span>
                    </div>
                    <div class="lower-form">
                        <label for=""><b>Recommend Vehicle</b></label>
                        <table class="rec-vehicle">
                        </table>
                        <span class="error vehicle-error"></span>

                        <!-- <label for=""><b>Approval</b></label>
                        <table>
                            <tr>
                                <td>
                                    <input type="radio" name="approval" id="approved" value="Approved"><label for="approved">Approve</label>
                                </td>
                                <td>
                                    <input type="radio" name="approval" id="denied" value="Denied"><label for="denied">Deny</label>
                                </td>
                            </tr>
                        </table>
                        <span class="error approval-error"></span> -->

                        <br><br><br>

                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>

            <div class="other">
                <h1>Admin's segment B</h1>
                <br>
                <b>Current status</b>
                <div class="status">
                    <b>Pending</b>
                </div>

                <br>

                <b>Update status</b>
                <div class="innerwrapper">
                    <button type="button" id="approve">Approve</button>
                    <button type="button" id="deny">Deny</button>
                </div>
                <a href="../PHP/print_eken.php" target="_" id="print">Print</a>
                <p class="note">Make sure the the availability has been updated and a driver has been assigned</p>
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
    <script src="../JS/admin_view_eken.js?=1+time()"></script>
</body>
</html>