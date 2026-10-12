<?php
session_start();
include("dbconn.inc.php");

if($_SERVER['REQUEST_METHOD'] != "POST") {
    header("Location: ../PHP/login.php");
}

$id = $_SESSION['id'];

$kf_id = mysqli_escape_string($conn, $_POST['id']);
$avai = mysqli_escape_string($conn, $_POST['avai']);
// $approval = mysqli_escape_string($conn, $_POST['approval']);
$dList = mysqli_escape_string($conn, $_POST['driver']);
$vList = mysqli_escape_string($conn, $_POST['vehicle']);
$driver = explode(",", $dList);
$vehicle = explode(",", $vList);

if(empty($avai)) {
    die("State if the requested vehicles are available");
}

if(empty($driver)) {
    die("You must assign atleast one driver");
}

if($avai == "Unavailable" && empty($vehicle)) {
    die("You must choose aleast one vehicle");
}

$dCheckSQL = "SELECT d_name FROM driver WHERE kf_id = '$kf_id';";
$dCheckQuery = mysqli_query($conn, $dCheckSQL) or die("Error: ". mysqli_error($conn));
$dResult = mysqli_fetch_all($dCheckQuery, MYSQLI_ASSOC);
$dList = array();
$delDriver = array();
foreach($dResult as $r) {
    if(in_array($r['d_name'], $driver)) {
        $dList[] = $r['d_name'];
    }
    else {
        $delDriver[] = $r['d_name'];
    }
}

foreach($delDriver as $d) {
    $dDelSQL = "DELETE FROM driver WHERE d_name = '$d' AND kf_id = '$kf_id';";
    mysqli_query($conn, $dDelSQL) or die("Error: ". mysqli_error($conn));
}

$vCheckSQL = "SELECT kv_id FROM ekenlist WHERE kf_id = '$kf_id' AND kl_type = 'Recommend';";
$vcheckQuery = mysqli_query($conn, $vCheckSQL) or die("Error: ". mysqli_error($conn));
$vResult = mysqli_fetch_all($vcheckQuery, MYSQLI_ASSOC);
$vList = array();
$delVehicle = array();
foreach($vResult as $v) {
    if(in_array($v['kv_id'], $vehicle)) {
        $vList[] = $v['kv_id'];
    }
    else {
        $delVehicle[] = $v['kv_id'];
    }
}

foreach($delVehicle as $v) {
    $vDelSQL = "DELETE FROM ekenlist WHERE kf_id = '$kf_id' AND kv_id = '$v' AND kl_type = 'Recommend';";
    mysqli_query($conn, $vDelSQL) or die("Error: ". mysqli_error($conn));
}

// * insert data into database
foreach($driver as $d) {
    if(!in_array($d, $dList)) {
        $driverSQL = "INSERT INTO driver (d_name, kf_id) VALUES ('$d', '$kf_id')";
        mysqli_query($conn, $driverSQL) or die("Error: ". mysqli_error($conn));
    }
}

if($avai == "Unavailable") {
    foreach($vehicle as $v) {
        if(!in_array($v, $vList)) {
            $vehicleSQL = "INSERT INTO ekenlist (kv_id, kf_id, kl_type) VALUES ('$v', '$kf_id', 'Recommend');";
            mysqli_query($conn, $vehicleSQL) or die("Error: ". mysqli_error($conn));
        }
    }
}

$available = $avai == "Available" ? true : false;

// $sql = "UPDATE ekenform SET kf_status = '$approval', kf_available = '$available', a_id = '$id' WHERE kf_id = '$kf_id';";
$sql = "UPDATE ekenform SET  kf_available = '$available', a_id = '$id' WHERE kf_id = '$kf_id';";
mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));

echo "Form saved";

mysqli_close($conn);