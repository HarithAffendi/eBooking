<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/login.css?=<?php echo rand();?>" type="text/css">
    <link rel="shortcut icon" href="../icon/ebooking logo.png" type="image/x-icon">
    <title>Login</title>
</head>
<body>
<header>
    <img src="../img/ebooking.png" alt="Logo KKSB">
</header>

<main class="wrapper-main">
<div class="main">
    <h1>Login</h1>

    <form id="myForm" action="" method="post" autocomplete="on">

        <div class="wrapper-radio">
            <div class="radio">
                <input type="radio" name="type" value="staff" id="staff" checked="checked">
                <label for="staff">Staff</label>
            </div>
            <div class="radio">
                <input type="radio" name="type" value="admin" id="admin">
                <label for="admin">Admin</label>
            </div>
        </div>
        
        <label for="email">Email</label>
        <br>
        <input class="input" type="email" placeholder="Enter your email" id="email" name="email">
        <br>
        <span class="error email-error"></span>
        <br>
        <label for="password">Password</label>
        <br>
        <div class="wrapper-input">
            <input class="input" type="password" placeholder="Enter your password" id="password" name="password">
            <img src="../icon/hide.png" id="eyeicon">
        </div>
        <span class="error password-error"></span>
        <br><br>
        <div class="wrapper-button">
            <button type="submit">Login</button>
        </div>
        <br>
        
    </form>
    <!-- //TODO: figure out how to do the "forgot password" -->
    <!-- <div class="container">
        <a href="">Forgot password?</a> | <a href="signup.php">Sign up</a>
    </div> -->
</div>
</main>

<footer>
    <p><b>KOLEJ KOMUNITI SABAK BERNAM PROPERTY RIGHTS</b></p>
</footer>

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

<script src="../JS/login.js?=<?php echo rand() ?>"></script>
</body>
</html>