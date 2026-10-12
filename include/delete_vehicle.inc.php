<?php
session_start();
include("dbconn.inc.php");

if($_SERVER['REQUEST_METHOD'] != "POST") {
    header("Location: ../PHP/login.php");
}

$id = mysqli_escape_string($conn, $_POST['id']);

$sql = "DELETE FROM ekenvehicle WHERE kv_id = '$id';";
mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));

echo "Vehicle deleted";

mysqli_close($conn);