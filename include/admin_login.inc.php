<?php
session_start();
include("myLibrary.inc.php");
include("dbconn.inc.php");

if($_SERVER['REQUEST_METHOD'] != "POST") { // avoid XSS
    header("Location: ../PHP/login.php");
}

// get data from post
$email = mysqli_escape_string($conn, $_POST['email']);
$password = mysqli_escape_string($conn, $_POST['password']);

if(empty($email) || empty($password)) {
    die("Empty field");
}

$sql = "SELECT * FROM admins WHERE a_email = '$email';"; // check if email exists in database
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));
$result = mysqli_num_rows($query);

if($result == 0) { // if not, send message
    die("Wrong email address");
}

$result = mysqli_fetch_assoc($query);

if(password_verify($password, $result['a_password'])) { // check if user uses the correct password
    $_SESSION['id'] = $result['a_id'];
    $_SESSION['privilege'] = "admin";
    $_SESSION['type'] = $result['a_type'];
    echo "Login successful";
}
else {
    echo "Wrong password"; // if not, send message
}

mysqli_close($conn);
?>