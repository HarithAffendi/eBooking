<?php
session_start();
include("dbconn.inc.php");

if($_SERVER['REQUEST_METHOD'] != "POST") {
    header("Location: ../PHP/login.php");
}

$id = mysqli_escape_string($conn, $_POST['id']);

$sql = "DELETE FROM admins WHERE a_id = '$id';";
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));

echo "Admin deleted";

mysqli_close($conn);
?>