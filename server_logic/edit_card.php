<?php

require_once "database.php";

$set_name = $_POST['set_name'];
$result = $conn->query("SELECT * FROM card_sets WHERE name='$set_name'");
$row = $result->fetch_assoc();
$set_id = $row['set_id'];

$card_num = $_POST['cardNum'];
$term = trim($_POST["term"]);
$def = trim($_POST["def"]);

$query_success = $conn->query("UPDATE flashcards SET term='$term', definition='$def' WHERE position=$card_num AND set_id=$set_id");

if(!$query_success)  {
  echo "query failed";
  exit;
}

echo "success";