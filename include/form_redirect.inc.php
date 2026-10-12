<?php
session_start();

if($_SESSION['type'] == "eKenderaan") {
    header("Location: ../PHP/list_eken_form.php");
}
elseif($_SESSION['type'] == "eICT") {
    header("Location: ../PHP/list_eict_form.php");
}
else {
    header("Location: ../PHP/admin_homepage.php");
}