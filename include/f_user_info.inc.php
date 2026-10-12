<?php
session_start();
include("dbconn.inc.php");

if($_SERVER['REQUEST_METHOD'] != "GET") { // avoid XSS
    header("Location: ../PHP/login,php");
}

$id = $_SESSION['id'];


$sql = "SELECT * FROM staff WHERE s_id = $id;"; // search user in database
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));
$result = mysqli_fetch_assoc($query);

$data = json_encode($result, JSON_UNESCAPED_UNICODE); // create a json

echo $data; // send json

mysqli_close($conn);
?>