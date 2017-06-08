<?php 
define('SERVERNAME', 'andementev.ru');
define('USERNAME', 'adementyevn');
define('PASSWORD', '2Gt2XcgAg8');
define('DBNAME', 'adementyevn_tickets');

$conn = mysqli_connect(SERVERNAME, USERNAME, PASSWORD, DBNAME);
mysqli_set_charset($conn,"utf8");

if (!$conn) {
	die("Connection failed: " . mysqli_connect_error());
}
// $servername = "localhost";
// 	$username = "root";
// 	$password = "";
// 	$dbname = "cinema";