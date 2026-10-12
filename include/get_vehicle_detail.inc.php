<?php
include("dbconn.inc.php");

if($_SERVER['REQUEST_METHOD'] != "POST") {
 header("Location: ../PHP/login.php");
}

$id = mysqli_escape_string($conn, $_POST['id']);

$sql = "SELECT * FROM ekenvehicle WHERE kv_id = '$id'";
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));
$result = mysqli_fetch_assoc($query);

$json = json_encode($result, JSON_UNESCAPED_UNICODE);

echo $json;

mysqli_close($conn);