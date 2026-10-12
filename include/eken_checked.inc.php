<?php
session_start();
include("dbconn.inc.php");

if($_SERVER['REQUEST_METHOD'] != "POST") {
    headerI("Location: ../PHP/login.php");
}

$id = mysqli_escape_string($conn, $_POST['id']);
// $type = mysqli_escape_string($conn, $_POST['type']);

$sql = "SELECT kv_id, kl_type FROM ekenlist WHERE kf_id = '$id';";
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));
$result = mysqli_fetch_all($query, MYSQLI_ASSOC);

$json = json_encode($result, JSON_UNESCAPED_UNICODE);

echo $json;

mysqli_close($conn);