<?php
session_start();
include("dbconn.inc.php");

if($_SERVER['REQUEST_METHOD'] != "POST") {
    header("Location: ../PHP/login.php");
}

$name = mysqli_escape_string($conn, $_POST["name"]);
$email = mysqli_escape_string($conn, $_POST["email"]);
$position = mysqli_escape_string($conn, $_POST["position"]);
$phone = mysqli_escape_string($conn, $_POST["phone"]);
$type = mysqli_escape_string($conn, $_POST["type"]);
$password = mysqli_escape_string($conn, $_POST["password"]);
$conPass = mysqli_escape_string($conn, $_POST["conPass"]);

if(!isset($name) || !isset($email) || !isset($position) || !isset($phone) || !isset($password) || !isset($type)) {
    die("Empty field");
}


// * sever-side validation
$emailRegex = "/\w{1,}\@staf\.kksbs\.edu\.my/";
if(!filter_var($email, FILTER_VALIDATE_EMAIL)) { // check if email is valid
    die("Invalid email");
}

if(!preg_match($emailRegex, $email)) {
    die("Out of kksb");
}

$passwordRegex = "/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/";
if(!preg_match($passwordRegex, $password)) { // check if password is valid
    die("Invalid password");
}

if($conPass != $password) { // check if confirm password match with password
    die("Passwords do not match");
}


// * check if email already exists in database
$emailSqlCheck = "SELECT * FROM admins WHERE a_email = '$email';"; // SQL to check duplicate of email
$query = mysqli_query($conn, $emailSqlCheck) or die("Error: " . mysqli_error($conn));
$result = mysqli_num_rows($query);


if($result != 0) { // checking if email already exists
    die("Duplicate email");
}

$option = [
    'cost' => 12
];

$hashedPassword = password_hash($password, PASSWORD_BCRYPT, $option);

// * insert data to database
$sql = "INSERT INTO admins (a_name, a_email, a_phone, a_position, a_type, a_password)
        VALUES ('$name', '$email', '$phone', '$position', '$type', '$hashedPassword');";

$query = mysqli_query($conn, $sql) or die("Error: " . mysqli_error($conn));

echo "Admin added";


mysqli_close($conn);
?>