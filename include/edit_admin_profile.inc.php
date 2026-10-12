<?php
session_start();
include("myLibrary.inc.php");
include("dbconn.inc.php");

if($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: ../PHP/login.php");
}

// get data for post
$name = mysqli_escape_string($conn, $_POST['name']);
$email = mysqli_escape_string($conn, $_POST['email']);
$position = mysqli_escape_string($conn, $_POST['position']);
$phone = mysqli_escape_string($conn, $_POST['phone']);

$valid = validateDetails($name, $email, $position, $phone);
if($valid != "Valid input") {
    die($valid);
}

$id =  $_SESSION['id'];

$userSQL = "SELECT * FROM admins WHERE a_id = '$id';";
$userQuery = mysqli_query($conn, $userSQL) or die("Error: ". mysqli_error($conn));
$user = mysqli_fetch_assoc($userQuery);

if($email != $user['a_email']) {
    $emailCheckSQL = "SELECT * FROM admins WHERE a_email = '$email';"; // check if the new email already exist in the database
    $emailCheckQuery = mysqli_query($conn, $emailCheckSQL) or die("Error: ". mysqli_error($conn));
    $emailCheck = mysqli_num_rows($emailCheckQuery);

    if($emailCheck != 0) {
        die("Email already exists");
    }
}

$sql = "UPDATE admins SET a_name = '$name', a_email = '$email', a_position = '$position', a_phone = '$phone' WHERE a_id = '$id';";
$query = mysqli_query($conn, $sql) or die("Error: ".mysqli_error($conn));

echo "Profile updated";

mysqli_close($conn);
?>