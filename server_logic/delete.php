<?php 

  require_once "database.php";

  $card_num = $_GET['cardNum'];
  $set_name = $_GET["set_name"];
  $result = $conn->query("SELECT * FROM card_sets WHERE name='$set_name'");
  $row = $result->fetch_assoc();
  $set_id = $row['set_id'];

  $query_success = $conn->query("DELETE FROM flashcards WHERE position=$card_num AND set_id=$set_id");

  if(!$query_success)  {
    echo "query failed";
    exit;
  }
  
  $query_success = $conn->query("UPDATE flashcards SET position = position - 1 WHERE position > $card_num");

  if(!$query_success) echo "query failed";

  else echo "success";