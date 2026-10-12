<?php
session_start();
include("dbconn.inc.php");

$id = $_SESSION['id'];

$sql = "SELECT * FROM ictform WHERE s_id = '$id';";
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));
$result = mysqli_fetch_all($query, MYSQLI_ASSOC);

$json = json_encode($result, JSON_UNESCAPED_UNICODE);

echo $json;

mysqli_close($conn);
?>