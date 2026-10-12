<?php
session_start();
include("myLibrary.inc.php");
include("dbconn.inc.php");

if($_SERVER["REQUEST_METHOD"] != "POST") { // avoid XSS
    header("Location: ../PHP/edit_profile.php");
}

// get data from post
$name = mysqli_escape_string($conn, $_POST['name']);
$email = mysqli_escape_string($conn, $_POST['email']);
$position = mysqli_escape_string($conn, $_POST['position']);
$phone = mysqli_escape_string($conn, $_POST['phone']);

$valid = validateDetails($name, $email, $position, $phone); // validate details
if($valid != "Valid input") { // if not valid, send message
    die($valid); 
}

$id = $_SESSION['id'];

$userSQL = "SELECT * FROM staff WHERE s_id = '$id';"; // get user database for testing
$userQuery = mysqli_query($conn, $userSQL) or die("Error: ". mysqli_error($conn));
$user = mysqli_fetch_assoc($userQuery);

if($email != $user['s_email']) { // if user email != to email in database
    $emailCheckSQL = "SELECT * FROM staff WHERE s_email = '$email';"; // check if the new email already exist in the database
    $emailCheckQuery = mysqli_query($conn, $emailCheckSQL) or die("Error: ". mysqli_error($conn));
    $emailCheck = mysqli_num_rows($emailCheckQuery);

    if($emailCheck != 0) {
        die("Email already exists");
    }
}

$sql = "UPDATE staff SET s_name = '$name', s_email = '$email', s_position = '$position', s_phone = '$phone' WHERE s_id = '$id';"; // update user details
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));

echo "Profile updated";

mysqli_close($conn);
?>