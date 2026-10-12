<?php
include("dbconn.inc.php");

$data = array();

$sql = "SELECT COUNT(kf_id) AS count FROM ekenform WHERE kf_departureDate >= now() - INTERVAL 6 MONTH;";
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));
$result = mysqli_fetch_assoc($query);

$data['submit'] = $result['count'];

$sql = "SELECT COUNT(kf_id) AS count FROM ekenform WHERE kf_departureDate >= now() - INTERVAL 6 MONTH AND kf_status = 'Approved';";
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));
$result = mysqli_fetch_assoc($query);

$data['approved'] = $result['count'];

$sql = "SELECT COUNT(kf_id) AS count FROM ekenform WHERE kf_departureDate >= now() - INTERVAL 6 MONTH AND kf_status = 'Denied';";
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));
$result = mysqli_fetch_assoc($query);

$data['denied'] = $result['count'];

$json = json_encode($data, JSON_UNESCAPED_UNICODE);
echo $json;

mysqli_close($conn);