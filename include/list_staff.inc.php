<?php
include("dbconn.inc.php");

if($_SERVER['REQUEST_METHOD'] != "GET") { // avoid XSS
    header("Location: ../PHP/login,php");
}

$sql = "SELECT * FROM staff ORDER BY s_name ASC;";
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));
$result = mysqli_fetch_all($query, MYSQLI_ASSOC);

$json = json_encode($result, JSON_UNESCAPED_UNICODE);

echo $json;

?>