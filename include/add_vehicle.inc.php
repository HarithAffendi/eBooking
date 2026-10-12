<?php
include("dbconn.inc.php");

if($_SERVER['REQUEST_METHOD'] != "POST") {
    header("location: ../PHP/login.php");
}

$name = mysqli_escape_string($conn, $_POST['name']);
$plate = mysqli_escape_string($conn, $_POST['plate']);

$sql = "INSERT INTO ekenvehicle (kv_name, kv_plate) VALUES ('$name', '$plate');";
mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));

echo "Vehicle added";

mysqli_close($conn);