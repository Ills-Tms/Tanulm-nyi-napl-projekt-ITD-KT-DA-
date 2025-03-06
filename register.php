<?php
include 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    // Jelszó hash-elése
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // SQL lekérdezés
    $sql = "INSERT INTO felhasznalok (username, email, jelszo) VALUES (?, ?, ?)";
    
    // Lekérdezés előkészítése
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sss", $username, $email, $hashed_password);
        
        // A regisztráció végrehajtása
        if ($stmt->execute()) {
            echo "Regisztráció sikeres!";
        } else {
            echo "Hiba történt: " . $stmt->error;
        }
        
        $stmt->close();
    } else {
        echo "Hiba a lekérdezés előkészítése során.";
    }
}

$conn->close();
?>
