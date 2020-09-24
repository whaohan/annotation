<?php
	$annotationId = htmlspecialchars($_POST["annotationId"], ENT_QUOTES);
	$valence = htmlspecialchars($_POST["valence"], ENT_QUOTES);
	$arousal = htmlspecialchars($_POST["arousal"], ENT_QUOTES);
	$complete = htmlspecialchars($_POST["complete"], ENT_QUOTES);
	$account = htmlspecialchars($_POST["account"], ENT_QUOTES);
	$servername = "localhost";
	$username = "root";
	$password = "homework1.0";
	$dbname = "annotation";
	try {
		// 创建连接
		$conn = new mysqli($servername, $username, $password, $dbname);
		// 检测连接
		if ($conn->connect_error) {
			die("连接失败: " . $conn->connect_error);
		} 
		
		$arr = array("annotationId"=>$annotationId, "annotation"=>array("valence"=>$valence, "arousal"=>$arousal));
		$str = json_encode($arr);

		$sql = "INSERT INTO test (annotationId, annotation)
		VALUES ('" . $annotationId . "', '" . $str . "')";
		
		$sql_exist = "select ifnull((select annotationId from test where annotationId = '" . $annotationId . "' limit 1 ), 0)";
		if($conn->query($sql_exist)) {
			if ($conn->query($sql) === TRUE) {
				// add the complete number to the database
				$complete = (int)$complete + 2;
				$sql2 = "UPDATE user SET complete = ". (int)$complete ." WHERE account = '" . $account . "'";
				if($conn->query($sql2) == FALSE) {
					echo "Error: " . $sql2 . "<br>" . $conn->error;
				} else {
					// echo "complete has beed added into database";
				}
				// echo "data has been uploaded successfully";
			} else {
				echo "Error: " . $sql . "<br>" . $conn->error;
			}
		} else {
			echo "Please do not resubmit the annotation!";
		}

		
		
		$conn->close();
	}
	catch (Exception $err)
	{
		header("HTTP/1.1 400 Bad Request");
		die($err->getMessage());
	}
	header("HTTP/1.1 200 OK");
?>