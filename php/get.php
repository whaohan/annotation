<?php 
header("content-Type: text/html; charset=utf-8");
require "local.php";

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
    $pieces[$row["pieceId"]] = $row;
} 
// get the annotation
// $result = $conn->query("SELECT * FROM test"); 
// $annotation = array(); 
// while($row = $result->fetch_assoc()) { 
//   // free the $row
//   $count=count($row);
//   for($i=0;$i<$count;$i++){ 
//     unset($row[$i]);
//   } 
//   // push it into array
//   $annotation[$row["annotationId"]] = json_decode(stripslashes($row["annotation"]));
// } 
// transform it into json
// echo json_encode(array("annotations"=>$annotation,"pieces"=>$pieces),JSON_UNESCAPED_UNICODE);
echo json_encode(array("pieces"=>$pieces),JSON_UNESCAPED_UNICODE);
$conn->close(); 
?> 