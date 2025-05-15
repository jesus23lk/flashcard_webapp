<?php

require_once "database.php";

//Location where user is sent when error happens
$error_path = "../page_files/flashcards.html";

if($_SERVER["REQUEST_METHOD"] === "POST") {

  $set_name = $_POST['set_name'];
  $result = $conn->query("SELECT * FROM card_sets WHERE name='$set_name'");
  $row = $result->fetch_assoc();
  $set_id = $row['set_id'];

  //Retrieve user input and remove whitespace
  $term = trim($_POST["term"]);
  $def = trim($_POST["def"]);

  //Get the number of cards in the DB
  $result = $conn->query("SELECT COUNT(*) AS num_cards FROM flashcards WHERE set_id=$set_id");

  if ($result) {

    $row = $result->fetch_assoc();

    $max_position = (int)$row['num_cards'] + 1;

    $stmt = $conn->prepare("INSERT INTO flashcards(set_id, term, definition, position) VALUES(?, ?, ?, ?)");
    $stmt->bind_param("issi", $set_id, $term, $def, $max_position);

    if($stmt->execute()) echo "success";

    else echo "error";
    
  }

  else echo "error";
}

else {
  echo "error";
  exit;
}