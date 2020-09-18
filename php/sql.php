<?php
	// Connect to the server and select the database
	function connectAndSelect() {
		require "local.php";
		$mysqlConnection = new mysqli($mysql_server, $mysql_username, $mysql_password, $mysql_database);
		if ($mysqlConnection->connect_error) {
			header("HTTP/1.1 500 Internal Server Error");
			die("Could not connect to MySQL server! Error: " . $mysqlConnection->connect_error);
		}
		return $mysqlConnection;
	}
	// Insert an entry into the data sheet
	function insertIntoMysql($table, $entry = array()) {
		$mysqlConnection = connectAndSelect();
		$keys = array();
		$values = array();
		if (!$entry) {
			return false;
		}
		foreach ($entry as $key => $value) {
			$keys[] = $key;
			$values[] = $value;
		}
		$queryString = "INSERT INTO " . $table . " (" . implode(", ", $keys) . ") VALUES (\"" . implode("\", \"", $values) . "\")";
		$answer = $mysqlConnection->query($queryString);
		if ($mysqlConnection->error)
		{
			header("HTTP/1.1 500 Internal Server Error");
			die("Failed to insert " . json_encode($entry) . " into " . $table . "! Error: " . $mysqlConnection->error);
		}
		$mysqlConnection->close();
		return $answer;
	}
	// Delete an entry (or entries) from the data sheet
	function deleteFromMysql($table, $entry = array())
	{
		$mysqlConnection = connectAndSelect();
		$queryString = "DELETE FROM " . $table . " WHERE TRUE";
		foreach ($entry as $key => $value)
		{
			$queryString = $queryString . " AND " . $key . " = \"" . $value . "\"";
		}
		$answer = $mysqlConnection->query($queryString);
		if ($mysqlConnection->error)
		{
			header("HTTP/1.1 500 Internal Server Error");
			die("Failed to delete " . json_encode($entry) . " from " . $table . "! Error: " . $mysqlConnection->error);
		}
		$mysqlConnection->close();
		return $answer;
	}
	// Look for an entry (or entries) in the data sheet
	function selectInMysql($table, $entry = array())
	{
		$mysqlConnection = connectAndSelect();
		$queryString = "SELECT * FROM " . $table . " WHERE TRUE";
		foreach ($entry as $key => $value)
		{
			$queryString = $queryString . " AND " . $key . " = \"" . $value . "\"";
		}
		$mysqlResult = $mysqlConnection->query($queryString);
		if ($mysqlConnection->error)
		{
			header("HTTP/1.1 500 Internal Server Error");
			die("Failed to select " . json_encode($entry) . " in " . $table . "! Error: " . $mysqlConnection->error);
		}
		// Transfer the result to array
		$answer = array();
		while ($row = $mysqlResult->fetch_array())
		{
			$answer[] = $row;
		}
		$mysqlResult->free();
		$mysqlConnection->close();
		return $answer;
	}
?>