<?php
session_start();
include("dbconn.inc.php");

$s_id = $_SESSION['id'];

$purpose = mysqli_escape_string($conn, $_POST['purpose']);
$place = mysqli_escape_string($conn, $_POST['place']);

$borDate = date('Y-m-d', strtotime(str_replace('-', '/', $_POST['borDate'])));
$retDate = date('Y-m-d', strtotime(str_replace('-', '/', $_POST['retDate'])));

$equip = explode(",", mysqli_escape_string($conn, $_POST['equip']));

$equipIndex = array();
if(count($equip) >= 2) {
    $equipIndex[] = 1;
    if(count($equip) == 3) {
        $equipIndex[] = 2;
    }
}
$tempQTY = explode(",", mysqli_escape_string($conn, $_POST['qty']));

$qty = array();
foreach($tempQTY as $q) {
    $qty[] = intval($q);
}

if(empty($purpose)) {
    die("purpose empty");
}
if(empty($place)) {
    die("place empty");
}
if(empty($_POST['borDate'])) {
    die("borDate empty");
}
if(empty($_POST['retDate'])) {
    die("retDate empty");
}
if(empty($equip[0])) {
    die("equip empty");
}
if(empty($qty[0])) {
    die("qty empty");
}

if($qty[0] == 0) {
    die("qty zero");
}

foreach($equipIndex as $index) {
    if(empty($qty[$index])) {
        die("additional qty empty");
    }
    if($qty[$index] == 0) {
        die("additional qty zero");
    }
}


$if_id = 0;

do {
    $if_id = rand(1, 9999999);

    $ifSQL = "SELECT * FROM ictform WHERE if_id = '$if_id';";
    $ifQuery = mysqli_query($conn, $ifSQL) or die("Error: ". mysqli_error($conn));
    $ifRow = mysqli_num_rows($ifQuery);
} while($ifRow != 0);


$ictFormSQL = "INSERT INTO ictform (if_id, if_purpose, if_place, if_borrowDate, if_xReturnDate, if_status, s_id)
                VALUES ('$if_id', '$purpose', '$place', '$borDate', '$retDate', 'Pending', '$s_id');";
mysqli_query($conn, $ictFormSQL) or die("Error: ". mysqli_error($conn));

for($index = 0; $index < count($equip); $index++) {
    $equipSQL = "INSERT INTO ictlist (ii_id, il_qty, il_status, if_id)
                VALUES ('${equip[$index]}', '${qty[$index]}', 'Requested', '$if_id')";
    // echo $equipSQL;
    // echo "<br>";
    mysqli_query($conn, $equipSQL) or die("Error: ". mysqli_error($conn));
}

echo "Passed";