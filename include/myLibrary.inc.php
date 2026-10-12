<?php
// this function is used to validate user details
function validateDetails($name, $email, $position, $phone) {
    if(empty($name) || empty($email) || empty($position) || empty($phone)) { // check if there is an empty field
        return "Empty field";
    }

    $emailRegex = "/\w{1,}\@staf\.kksbs\.edu\.my/";
    if(!filter_var($email, FILTER_VALIDATE_EMAIL) || !preg_match($emailRegex, $email)) { // check if email is valid
        return "Invalid email";
    }

    $phoneRegex = "/^[0-9]{10,12}$/";
    if(!preg_match($phoneRegex, $phone)) { // check if the phone number is valid
        return "Invalid phone number";
    }

    return "Valid input";
}

// this function is used to validate user password
function validatePassword($password, $confirmPassword) {
    if(empty($password)) { // check if the password field is empty
        return "Empty field";
    }
    
    $passwordRegex = "/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/";
    if(!preg_match($passwordRegex, $password)) { // check if password is valid
        return "Invalid password";
    }
    
    if($password != $confirmPassword) { // check if the passwords match
        return "Passwords do not match";
    }
    
    return "Valid password";
}

function checkFile($file) {
    if(empty($file)) {
        return "File not uploaded";
    }

    $ext = explode('.', $file['name']);
    $extention = strtolower(end($ext));

    if($extention != "pdf" || $file['size'] > 2000000) {
        return "Only PDF file less then 2MB are allowed to upload";
    }

    if($file['error'] !== 0) {
        return "File failed to upload";
    }

    return "File uploaded";
}

?>