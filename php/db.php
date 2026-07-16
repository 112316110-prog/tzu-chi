<?php

$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "teaching_web";

$conn = new mysqli(
    $servername,
    $username,
    $password,
    $dbname
);

if($conn->connect_error){

    die(
        "資料庫連線失敗：" .
        $conn->connect_error
    );

}

$conn->set_charset("utf8mb4");

?>