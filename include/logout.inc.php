<?php
session_start();

if($_SERVER["REQUEST_METHOD"] == "POST") {
    session_destroy(); // terminate session

    echo "User has logout";
}
?>