<?php
session_start();
include("dbconn.inc.php");
include("myLibrary.inc.php");

if($_SERVER['REQUEST_METHOD'] != "POST") { // avoid XSS
    header("Location: ../PHP/login.php");
}

// get data from post
$id = mysqli_escape_string($conn, $_POST['id']);
$name = mysqli_escape_string($conn, $_POST['name']);
$email = mysqli_escape_string($conn, $_POST['email']);
$position = mysqli_escape_string($conn, $_POST['position']);
$phone = mysqli_escape_string($conn, $_POST['phone']);
$type = mysqli_escape_string($conn, $_POST['type']);

if(empty($type)) {
    die("Empty field");
}

$valid = validateDetails($name, $email, $position, $phone); // validate details
if($valid != "Valid input") { // if not valid, send message
    die($valid); 
}

$userSQL = "SELECT * FROM admins WHERE a_id = '$id';"; // get user database for testing
$userQuery = mysqli_query($conn, $userSQL) or die("Error: ". mysqli_error($conn));
$user = mysqli_fetch_assoc($userQuery);

if($email != $user['a_email']) {
    $emailCheckSQL = "SELECT * FROM admins WHERE a_id = '$id';";
    $emailCheckQuery = mysqli_query($conn, $emailCheckSQL) or die("Error: ". mysqli_error($conn));
    $emailCheck = mysqli_num_rows($emailCheckQuery);

    if($emailCheck != 0) {
        die("Email already exists");
    }
}

$sql = "UPDATE admins SET a_name = '$name', a_email = '$email', a_position = '$position', a_phone = '$phone', a_type = '$type' WHERE a_id = '$id';";
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));

echo "Profile updated";

mysqli_close($conn);
?>