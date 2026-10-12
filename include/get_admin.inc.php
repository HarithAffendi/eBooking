<?php
include("dbconn.inc.php");

if($_SERVER['REQUEST_METHOD'] != "POST") { // avoid XSS
    header("Location: ../PHP/login,php");
}

$id = mysqli_escape_string($conn, $_POST['id']);

$sql = "SELECT * FROM admins WHERE a_id = '$id';";
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));
$result = mysqli_fetch_assoc($query);

$json = json_encode($result, JSON_UNESCAPED_UNICODE);

echo $json;

?>