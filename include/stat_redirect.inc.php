<?php

session_start();

if(empty($_SESSION['privilege'])) {
    header("Location: ../PHP/login.php");
}

if($_SESSION['type'] == "eKenderaan") {
    header("Location: ../PHP/eken_stat.php");
}


?>