<?php
include 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Felhasználó lekérdezése az adatbázisból
    $sql = "SELECT * FROM felhasznalok WHERE email = ?";
    
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("s", $email);
        
        // Lekérdezés végrehajtása
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            
            // A jelszó ellenőrzése
            if (password_verify($password, $user['jelszo'])) {
                echo "Bejelentkezés sikeres!";
            } else {
                echo "Hibás jelszó!";
            }
        } else {
            echo "A felhasználó nem található!";
        }
        
        $stmt->close();
    } else {
        echo "Hiba történt a lekérdezés előkészítésekor.";
    }
}

$conn->close();
?>
