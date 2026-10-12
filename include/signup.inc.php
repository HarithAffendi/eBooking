<?php
    include("dbconn.inc.php");
    
    if($_SERVER['REQUEST_METHOD'] != "POST") { // avoid XSS
        header("Location: ../PHP/signup.php");
    }

    $name = mysqli_escape_string($conn, $_POST['name']);
    $email = mysqli_escape_string($conn, $_POST['email']);
    $position = mysqli_escape_string($conn, $_POST['position']);
    $phone = mysqli_escape_string($conn, $_POST['phone']);
    $password = mysqli_escape_string($conn, $_POST['password']);
    $conPass = mysqli_escape_string($conn, $_POST['conPass']);


    // * check if any field is empty
    if(!isset($name) || !isset($email) || !isset($position) || !isset($phone) || !isset($password)) {
        die("Empty field");
    }


    // * sever-side validation
    $emailRegex = "/\w{1,}\@staf\.kksbs\.edu\.my/";
    if(!filter_var($email, FILTER_VALIDATE_EMAIL) || !preg_match($emailRegex, $email)) { // check if email is valid
        die("Invalid email");
    }

    $passwordRegex = "/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/";
    if(!preg_match($passwordRegex, $password)) { // check if password is valid
        die("Invalid password");
    }

    if($conPass != $password) { // check if confirm password match with password
        die("Passwords do not match");
    }

    
    // * check if email already exists in database
    $emailSqlCheck = "SELECT * FROM staff WHERE s_email = '$email';"; // SQL to check duplicate of email
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
    $sql = "INSERT INTO staff (s_name, s_email, s_phone, s_position, s_password)
            VALUES ('$name', '$email', '$phone', '$position', '$hashedPassword');";

    $query = mysqli_query($conn, $sql) or die("Error: " . mysqli_error($conn));

    echo "Sign up successful";


    mysqli_close($conn);
?>