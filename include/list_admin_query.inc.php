<?php
include("dbconn.inc.php");

if($_SERVER['REQUEST_METHOD'] != "POST") { // avoid XSS
    header("Location: ../PHP/login,php");
}

$search = mysqli_escape_string($conn, $_POST['search']);
$search = "%".$search."%";

$sql = "SELECT * FROM admins WHERE a_type <> 'SUPER' AND a_name LIKE '$search' ORDER BY a_type, a_name ASC;";
$query = mysqli_query($conn, $sql) or die("Error: ". mysqli_error($conn));
$result = mysqli_fetch_all($query, MYSQLI_ASSOC);

$json = json_encode($result, JSON_UNESCAPED_UNICODE);

echo $json;

?>