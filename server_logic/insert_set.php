<?php

require_once "database.php";

$set_name = trim($_POST['set-name']);

$stmt = $conn->prepare("INSERT INTO card_sets(name) VALUES(?)");
$stmt->bind_param("s", $set_name);

if ($stmt->execute()) echo "success";

else echo "error";

