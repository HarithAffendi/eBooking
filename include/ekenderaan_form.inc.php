<?php
session_start();
include("myLibrary.inc.php");
include("dbconn.inc.php");

if($_SERVER['REQUEST_METHOD'] != "POST") { // prevent XSS
    header("Location: ../PHP/login.php");
}

$id = $_SESSION['id'];

$purpose = mysqli_escape_string($conn, $_POST['purpose']);
$destination = mysqli_escape_string($conn, $_POST['destination']);
$numStudent = mysqli_escape_string($conn, $_POST['numStudent']);
$numStaff = mysqli_escape_string($conn, $_POST['numStaff']);
$depDate = date('Y-m-d', strtotime(str_replace('-', '/', $_POST['depDate'])));
$depTime = date('H:i:s', strtotime($_POST['depTime']));
$retDate = date('Y-m-d', strtotime(str_replace('-', '/', $_POST['retDate'])));
$retTime = date('H:i:s', strtotime($_POST['retTime']));
$staDate = date('Y-m-d', strtotime(str_replace('-', '/', $_POST['staDate'])));
$staTime = date('H:i:s', strtotime($_POST['staTime']));

$vehicle = array();
foreach($_POST['vehicle'] as $v) {
    $vehicle[] = intval($v);
}

if(empty($purpose) || empty($destination) || !isset($numStaff) || !isset($numStudent) || empty($vehicle) || empty($depDate) || empty($depTime) || empty($retDate) || empty($retTime) || empty($staDate) || empty($staTime)) {
    die(print_r($_POST));
}

if(intval($numStaff) + intval($numStudent) == 0) {
    die("The number of passengers cannot add up to zero");
}


$fileCheck = checkFile($_FILES['file']);

if($fileCheck != "File uploaded") {
    die($fileCheck);
}


// * upload the file to folder and database
$fileName = $_FILES['file']['name'];
$fileSQL = "SELECT * FROM file_eken WHERE f_name = '$fileName';";
$fileQuery = mysqli_query($conn, $fileSQL) or die("Error: ". mysqli_error($conn));
$fileRow = mysqli_num_rows($fileQuery);

if($fileRow != 0) {
    die("This file NAME is already exists in the database");
}


$targetDir = "../eken/";
$targetFile = $targetDir . $_FILES['file']['name'];
$timestamp = date("Y-m-d H:i:s");

if(move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
    $fileUpSql = "INSERT INTO file_eken (f_name, f_path, f_timeStamp)
                    VALUES ('$fileName', '$targetDir', '$timestamp');";
    $fileUpQuery = mysqli_query($conn, $fileUpSql) or die("Error: ". mysqli_error($conn));
}
else {
    die("Error uploading file");
}


// * making the ekenform and saving it to the db
$kf_id = 0;

do {
    $kf_id = rand(1, 9999999);

    $kfSQL = "SELECT * FROM ekenform WHERE kf_id = '$kf_id';";
    $kfQuery = mysqli_query($conn, $kfSQL) or die("Error: ". mysqli_error($conn));
    $kfRow = mysqli_num_rows($kfQuery);
} while($kfRow != 0);

$ekenFormSql = "INSERT INTO ekenform (kf_id, kf_purpose, kf_destination, kf_numStudent, kf_numStaff, kf_departureDate, kf_departureTime, kf_returnDate, kf_returnTime, kf_startDate, kf_startTime, kf_status, s_id, f_name, a_id) VALUES ('$kf_id', '$purpose', '$destination', '$numStudent', '$numStaff', '$depDate', '$depTime', '$retDate', '$retTime', '$staDate', '$staTime', 'Pending', '$id', '$fileName', NULL);";
$ekenFormQuery = mysqli_query($conn, $ekenFormSql) or die("Error: ". mysqli_error($conn));



// * save what vehicles are requsted
foreach($vehicle as $v) {
    $vSQL = "INSERT INTO ekenlist (kf_id, kv_id, kl_type) VALUES ('$kf_id', '$v', 'Request');";
    $vQuery = mysqli_query($conn, $vSQL) or die("Error: ". mysqli_error($conn));
}

echo "Form submitted";

mysqli_close($conn);