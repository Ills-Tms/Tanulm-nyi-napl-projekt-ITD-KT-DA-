<?php
$servername = "localhost";
$username = "root"; // Az adatbázis felhasználó
$password = ""; // Az adatbázis jelszó
$dbname = "tanulmanyi_naplo"; // Az adatbázis neve

// Kapcsolódás az adatbázishoz
$conn = new mysqli($servername, $username, $password, $dbname);

// Ellenőrzés
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
