<?php
// Connexion à la base de données MySQL
$servername = "localhost";
$username = "root"; // Remplacez par votre utilisateur MySQL
$password = ""; // Remplacez par votre mot de passe MySQL
$dbname = "users_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Traitement du formulaire d'inscription
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hashage du mot de passe
    $email = $_POST['email'];
    $country = $_POST['country'];

    // Vérifier si l'utilisateur existe déjà
    $sql_check = "SELECT * FROM users WHERE username='$username'";
    $result = $conn->query($sql_check);

    if ($result->num_rows > 0) {
        echo "Username already taken!";
    } else {
        // Insérer les données dans la base de données
        $sql_insert = "INSERT INTO users (username, password, email, country) 
                       VALUES ('$username', '$password', '$email', '$country')";

        if ($conn->query($sql_insert) === TRUE) {
            echo "Account created successfully!";
            header("Location: login.html"); // Redirection vers la page de connexion après inscription
            exit();
        } else {
            echo "Error: " . $sql_insert . "<br>" . $conn->error;
        }
    }
}

$conn->close();
?>
