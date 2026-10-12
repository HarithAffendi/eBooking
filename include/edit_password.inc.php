<?php
session_start();
include("dbconn.inc.php");
include("myLibrary.inc.php");

if($_SERVER['REQUEST_METHOD'] != "POST") { // avoid XSS
    header("Location: ../PHP/login.php");
}

$id = empty($_POST['id']) ? $_SESSION['id'] : mysqli_escape_string($conn, $_POST['id']);

// get data from post
$password = mysqli_escape_string($conn, $_POST['password']);
$conPass = mysqli_escape_string($conn, $_POST['conPass']);

$validate = validatePassword($password, $conPass); // validate password

if($validate != "Valid password") { // if password is not valid, send message
    die($validate);
}

$option = [
    'cost' => 12
];

$hashedPassword = password_hash($password, PASSWORD_BCRYPT, $option); // hash new password

$sql = "UPDATE staff SET s_password = '$hashedPassword' WHERE s_id = '$id';"; // update user password
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));

echo "Update successful"; // sent success message

mysqli_close($conn);
?>