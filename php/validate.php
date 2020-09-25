<?php 
header("content-Type: text/html; charset=utf-8");
require "local.php";
$account = htmlspecialchars($_POST["account"], ENT_QUOTES);
$password = htmlspecialchars($_POST["password"], ENT_QUOTES);


// build and check the connection
$conn =new mysqli($servername, $username, $dbpassword, $dbname); 
if ($conn->connect_error) { 
  die("Connection failed: " . $conn->connect_error); 
} 
// get the pieces
$result = $conn->query("SELECT * FROM user"); 
$login = -1;
while($row = $result->fetch_assoc()) { 
    if($row["account"] == $account && $row["password"] == $password) {
        $login = $row["complete"];
    }
}
$conn->close();

echo $login;
?> 