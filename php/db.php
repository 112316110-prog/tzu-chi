<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "teaching_system";


$conn = new mysqli(
    $servername,
    $username,
    $password,
    $dbname
);


if ($conn->connect_error) {
    die("資料庫連線失敗：" . $conn->connect_error);
}


$conn->set_charset("utf8mb4");

?>