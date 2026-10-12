<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/eICT_form.css?=time()">
    <link rel="shortcut icon" href="../icon/ebooking logo.png" type="image/x-icon">
    <title>eICT Form</title>
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
                <li><a href="#"><img src="../icon/check-list.png"> View Status</a></li>
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
                <h1>eICT Form</h1>
                <div class="memo">
                    <span><b>Memo</b></span>
                    <p>
                        I agree and promise that:
                    </p>
                    <ol>
                        <li>I will take good care of this ICT equipment.</li>
                        <li>I will be responsible for any damage or loss caused by my own negligence and will be ready to accept any action imposed by KPT if necessary.</li>
                        <li>I will return the ICT equipment on the agreed date or if required to do so at any time.</li>
                    </ol>
                </div>
                <form id="mainForm" action="../include/eICT_form.inc.php" method="post">
                    <div class="upper-form">
                        <label for="purpose"><b>Purpose</b><span class="required">*</span></label>
                        <input type="text" name="purpose" id="purpose" placeholder="Enter your purpose of borrowing equipment">
                        <span class="error purpose-error"></span>

                        <label for="place"><b>Place of use</b><span class="required">*</span></label>
                        <input type="text" name="place" id="place" placeholder="Enter the place of use of the equipment">
                        <span class="error place-error"></span>

                        <label for="borDate"><b>Borrow date</b><span class="required">*</span></label>
                        <input type="date" name="borDate" id="borDate" placeholder="Enter the borrow date of the equipment">
                        <span class="error borDate-error"></span>

                        <label for="retDate"><b>Expected return date</b><span class="required">*</span></label>
                        <input type="date" name="retDate" id="retDate" placeholder="Enter the expected return date of the equipment">
                        <span class="error retDate-error"></span>
                    </div>
                    
                    <div class="lower-form">
                        <div class="spacer"></div>
                        <div class="wrapper-equipment">
                            <div class="equipment">
                                <label for="equip1"><b>Equipment to borrow</b><span class="required">*</span></label>
                                <select name="equip1" id="equip1">
                                    <option value="" hidden>Select the equipment</option>
                                </select>
                            </div>
                            <div class="quantity">
                                <label for="qty1"><b>Quantity</b><span class="required">*</span></label>
                                <input type="number" min="0" name="qty1" id="qty1">
                            </div>
                        </div>
                        <span class="error equip-error"></span>

                        <br>

                        <div class="wrapper-equipment">

                            <div class="equipment">
                                <label for=""><b>Additional equipment</b></label>
                                <select name="equip2" id="equip2">
                                    <option value="" style="color: gray;">None</option>
                                </select>
                            </div>
                            <div class="quantity">
                                <label for=""><b>Quantity</b></label>
                                <input type="number" min="0" name="qty2" id="qty2">
                            </div>
                        </div>
                        <br>
                        <div class="wrapper-equipment">
                            <div class="equipment">
                                <select name="equip3" id="equip3">
                                    <option value="" style="color: gray;">None</option>
                                </select>
                            </div>
                            <div class="quantity">
                                <input type="number" min="0" name="qty3" id="qty3">
                            </div>
                        </div>
                        <span class="error add-error"></span>

                        <br>
                        <br>
                        <button type="submit">Submit</button>
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


    <script src="../JS/module.js?=time()"></script>
    <script src="../JS/eICT_form.js?=time()"></script>
</body>
</html>