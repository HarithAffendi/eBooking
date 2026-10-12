<?php

session_start();

if(empty($_SESSION['privilege'])) {
    header("Location: ../PHP/login.php");
}

if($_SESSION['privilege'] == "staff") { // redirect to staff
    header("Location: ../PHP/homepage.php");
}
else if($_SESSION['type'] == "SUPER") { // redirect super admin
    header("Location: ../PHP/super_homepage.php");
}
else { // redirect other admin
    header("Location: ../PHP/admin_homepage.php");
}


?>