<?php
	$annotationId = htmlspecialchars($_POST["annotationId"], ENT_QUOTES);
	$valence = htmlspecialchars($_POST["valence"], ENT_QUOTES);
	$arousal = htmlspecialchars($_POST["arousal"], ENT_QUOTES);
	require "sql.php";
	try {
		// insertIntoMysql($target, $entry);
		// switch ($mode) {
		// 	case "insert":
		// 		if (selectInMysql($target, $entry))
		// 		{
		// 			throw new Exception("Entry exists: " . json_encode($entry) . " in " . $target);
		// 		}
		// 		insertIntoMysql($target, $entry);
		// 		break;
		// 	case "delete":
		// 		if (!selectInMysql($target, $entry))
		// 		{
		// 			throw new Exception("Entry doesn't exist: " . json_encode($entry) . " in " . $target);
		// 		}
		// 		deleteFromMysql($target, $entry);
		// 		break;
		// 	default:
		// 		throw new Exception("Unable to understand mode: " . $mode);
        // }

        // 追加写入用户名下文件
        $json_string = file_get_contents("annotation/test.json");// 从文件中读取数据到PHP变量
        $data = json_decode($json_string,true);// 把JSON字符串转成PHP数组
        $data["annotations"][$annotationId] = array("arousal"=>$arousal,"valence"=>$valence);
        $json_strings = json_encode($data);
        file_put_contents("annotation/test.json",$json_strings);//写入

	}
	catch (Exception $err)
	{
		header("HTTP/1.1 400 Bad Request");
		die($err->getMessage());
	}
	header("HTTP/1.1 200 OK");
	// die("Modify Successful! ");
?>