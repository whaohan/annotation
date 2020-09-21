<?php 
header("content-Type: text/html; charset=utf-8");
$servername = "localhost"; 
$username = "root"; 
$password = "homework1.0"; 
$dbname = "annotation"; 

// build and check the connection
$conn =new mysqli($servername, $username, $password, $dbname); 
if ($conn->connect_error) { 
  die("Connection failed: " . $conn->connect_error); 
} 
// get the pieces
$result = $conn->query("SELECT * FROM pieces"); 
$pieces = array(); 
while($row = $result->fetch_assoc()) { 
    // free the $row
    $count=count($row);
    for($i=0;$i<$count;$i++){ 
      unset($row[$i]);
    } 
    // push it into array
    array_push($pieces,$row); 
} 
// get the annotation
$result = $conn->query("SELECT * FROM test"); 
$annotation = array(); 
while($row = $result->fetch_assoc()) { 
  // free the $row
  $count=count($row);
  for($i=0;$i<$count;$i++){ 
    unset($row[$i]);
  } 
  // push it into array
  array_push($annotation,$row); 
} 
// transform it into json
echo json_encode(array("annotation"=>$annotation,"pieces"=>$pieces),JSON_UNESCAPED_UNICODE);//json编码 
$conn->close(); 
?> 