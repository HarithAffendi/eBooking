<?php
include("dbconn.inc.php");

if($_SERVER['REQUEST_METHOD'] != "GET") {
    header("Location: ../PHP/login.php");
}

$vehicleSQL = "SELECT * FROM ekenvehicle;";
$vehicleQuery = mysqli_query($conn, $vehicleSQL) or die("Error: ". mysqli_error($conn));

$vehicles = array();

while($r = mysqli_fetch_assoc($vehicleQuery)) {
    $vehicles[$r["kv_id"]] = $r["kv_name"] . "(" . $r["kv_plate"] . ")";
}

$reqSQL = "SELECT l.kv_id, COUNT(l.kv_id) AS count FROM ekenlist l 
        JOIN ekenform f ON l.kf_id = f.kf_id 
        WHERE f.kf_departureDate >= now() - INTERVAL 6 MONTH AND  l.kl_type = 'Request' 
        GROUP BY l.kv_id;";
$reqQuery = mysqli_query($conn, $reqSQL) or die("Error: ". mysqli_error($conn));
$req = array();

while($r = mysqli_fetch_assoc($reqQuery)) {
    $req[$r["kv_id"]] = $r["count"];
}

$recSQL = "SELECT l.kv_id, COUNT(l.kv_id) AS count FROM ekenlist l 
        JOIN ekenform f ON l.kf_id = f.kf_id 
        WHERE f.kf_departureDate >= now() - INTERVAL 6 MONTH AND  l.kl_type = 'Recommend' 
        GROUP BY l.kv_id;";
$recQuery = mysqli_query($conn, $recSQL) or die("Error: ". mysqli_error($conn));
$rec = array();

while($r = mysqli_fetch_assoc($recQuery)) {
    $rec[$r["kv_id"]] = $r["count"];
}

$v_id = array_keys($vehicles);

$table = array();

foreach($v_id as $id) {
    $vreq = array_key_exists($id, $req) ? $req[$id] : "0" ;
    $vrec = array_key_exists($id, $rec) ? $rec[$id] : "0" ;

    $row = array();
    $row['kv_name'] = $vehicles[$id];
    $row['reqcount'] = $vreq;
    $row['reccount'] = $vrec;
    $table[] = $row;
}

$json = json_encode($table, JSON_UNESCAPED_UNICODE);

echo $json;

mysqli_close($conn);