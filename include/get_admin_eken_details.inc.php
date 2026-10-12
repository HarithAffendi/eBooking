<?php
session_start();
include("dbconn.inc.php");

if($_SERVER['REQUEST_METHOD'] != "POST") {
    header("Location: ../PHP/login.php");
}

$id = mysqli_escape_string($conn, $_POST['id']);

$sql = "SELECT kf_status, kf_available, COALESCE(a_id, 'na') AS a_id FROM ekenform WHERE kf_id = '$id';";
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));
$result = mysqli_fetch_assoc($query);

$a_id = $result['a_id'];

if($a_id == "na") {
    $result['a_name'] = "NA";
}
else{
    $adminSQL = "SELECT a_name FROM admins WHERE a_id = '$a_id';";
    $adminQuery = mysqli_query($conn, $adminSQL) or die("Error: ". mysqli_error($conn));
    $admin = mysqli_fetch_assoc($adminQuery);
    
    $result['a_name'] = $admin['a_name'];
}

$json = json_encode($result, JSON_UNESCAPED_UNICODE);

echo $json;

mysqli_close($conn);