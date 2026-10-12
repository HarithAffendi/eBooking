<?php
session_start();
include("dbconn.inc.php");

if($_SERVER['REQUEST_METHOD'] != "POST") {
    header("Location: ../PHP/login.php");
}

$id = mysqli_escape_string($conn, $_POST['id']);

$sql = "SELECT ef.kf_purpose, s.s_name, ef.kf_destination, ef.kf_numStudent, ef.kf_numStaff, ef.f_name, ef.kf_departureDate, ef.kf_departureTime, ef.kf_returnDate, ef.kf_returnTime, ef.kf_startDate, ef.kf_startTime FROM ekenform ef JOIN staff s ON ef.s_id = s.s_id WHERE ef.kf_id = '$id';";
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));
$result = mysqli_fetch_assoc($query);

$json = json_encode($result, JSON_UNESCAPED_UNICODE);

echo $json;

mysqli_close($conn);