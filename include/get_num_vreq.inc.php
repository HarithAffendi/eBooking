<?php
include("dbconn.inc.php");

$sql = "SELECT l.kv_id, COUNT(l.kv_id) AS count FROM ekenlist l 
        JOIN ekenform f ON l.kf_id = f.kf_id 
        WHERE f.kf_departureDate >= now() - INTERVAL 1 MONTH AND  l.kl_type = 'Request' 
        GROUP BY l.kv_id;";
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));

$data = array();

while($r = mysqli_fetch_assoc($query)) {
        $data[$r['kv_id']] = $r['count'];
}

$json = json_encode($data, JSON_UNESCAPED_UNICODE);

echo $json;

mysqli_close($conn);