<?php
session_start();
include("dbconn.inc.php");

$id = mysqli_escape_string($conn, $_POST['id']);
$approval = mysqli_escape_string($conn, $_POST['approval']);

$sql = "UPDATE ekenform SET kf_status = '$approval' WHERE kf_id = '$id';";
mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));

echo "Form status has been updated";

mysqli_close($conn);