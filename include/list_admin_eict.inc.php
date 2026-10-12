<?php
session_start();
include("dbconn.inc.php");

if($_SERVER['REQUEST_METHOD'] != "POST") {
    header("Location: ../PHP/login.php");
}

$status = $_POST['status'];

$sql = "SELECT * FROM ictform WHERE if_status = '$status' AND if_borrowDate >= now() - INTERVAL 2 YEAR ORDER BY if_borrowDate DESC;";
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));
$result = mysqli_fetch_all($query, MYSQLI_ASSOC);

$json = json_encode($result, JSON_UNESCAPED_UNICODE);

echo $json;

mysqli_close($conn);
?>