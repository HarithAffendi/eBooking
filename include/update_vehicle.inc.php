<?php
session_start();
include("dbconn.inc.php");

if($_SERVER['REQUEST_METHOD'] != "POST") {
    header("Location: ../PHP/login.php");
}

$id = mysqli_escape_string($conn, $_POST['id']);
$name = mysqli_escape_string($conn, $_POST['name']);
$plate = mysqli_escape_string($conn, $_POST['plate']);

$sql = "UPDATE ekenvehicle SET kv_name = '$name', kv_plate = '$plate' WHERE kv_id = '$id';";
mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));

echo "Vehicle updated";

mysqli_close($conn);