<?php
session_start();
include("dbconn.inc.php");

if($_SERVER['REQUEST_METHOD'] != "POST") {
    header("Location: ../PHP/login.php");
}

$id = mysqli_escape_string($conn, $_POST['id']);

$sql = "SELECT d_name FROM driver WHERE kf_id = '$id';";
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));
$result = mysqli_fetch_all($query, MYSQLI_ASSOC);

$data = array();
foreach($result as $r) {
    $data[] = $r['d_name'];
}

$json = json_encode($data, JSON_UNESCAPED_UNICODE);

echo $json;

mysqli_close($conn);