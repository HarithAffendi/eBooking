<?php
session_start();
include("dbconn.inc.php");

$id = mysqli_escape_string($conn, $_POST['id']);

$fileSQL = "SELECT f_name FROM ekenform WHERE kf_id = '$id';";
$fileQuery = mysqli_query($conn, $fileSQL) or die("Error". mysqli_error($conn));
$fileResult = mysqli_fetch_assoc($fileQuery);
$filename = $fileResult['f_name'];

$listSQL = "DELETE FROM ekenform WHERE kf_id = '$id';";
mysqli_query($conn, $listSQL) or die("Error". mysqli_error($conn));

$formSQL = "DELETE FROM ekenform WHERE kf_id = '$id;'";
mysqli_query($conn, $formSQL) or die("Error". mysqli_error($conn));

$fileDir = "../eken/". $filename;
if(file_exists($fileDir)) {
    unlink($fileDir);
}

$sql = "DELETE FROM file_eken WHERE f_name = '$filename';";
mysqli_query($conn, $sql) or die("Error". mysqli_error($conn));

echo "Form deleted";

mysqli_close($conn);