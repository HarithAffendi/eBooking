<?php

$db_server = "localhost";
$db_user = "root";
$db_password = "";
$db_name = "ebooking";
$conn = "";

// $conn = mysqli_connect($db_server, $db_user, $db_password, $db_name) or die("Error: " . mysqli_error($conn));

try {
    $conn = mysqli_connect($db_server, $db_user, $db_password, $db_name); // try create a mysqli connection
}
catch (mysqli_sql_exception){
    die("Error: " . mysqli_error($conn)); // if fail, display message
}

?>