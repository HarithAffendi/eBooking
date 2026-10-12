<?php
    include("dbconn.inc.php");

    if($_SERVER['REQUEST_METHOD'] != "POST") { // avoid XSS
        header("Location: ../PHP/login.php");
    }

    // get data from post
    $email = mysqli_escape_string($conn, $_POST['email']);
    $password = mysqli_escape_string($conn, $_POST['password']);
    
    if(empty($email) || empty($password)) { // check if there is an empty field
        die("Empty field");
    }

    $emailSeachSQL = "SELECT * FROM staff WHERE s_email = '$email';"; // check if email exists in the database
    $query = mysqli_query($conn, $emailSeachSQL) or die("Error: ". mysqli_error($conn));

    $result = mysqli_num_rows($query);
    if($result == 0){
        die("Wrong email address"); // if not, sent message
    }

    $result = mysqli_fetch_assoc($query);

    if(password_verify($password, $result['s_password'])) { // check if password is correct
        session_start();
        $_SESSION['id'] = $result['s_id'];
        $_SESSION['privilege'] = "staff";
        echo "Login successful";
    }
    else {
        echo "Wrong password";
    }

    mysqli_close($conn);
?>