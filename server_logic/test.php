<?php

  require_once ('./database.php');

  $term = "What does SQL stand for";
  $def = "Structured Query Language";
  $set_id = 1;

  $result = $conn->query("SELECT COUNT(*) AS num_cards FROM flashcards");

  $row = $result->fetch_assoc();

  $max_position = (int)$row['num_cards'] + 1;

  $stmt = $conn->prepare("INSERT INTO flashcards(set_id, term, definition, position) VALUES(?, ?, ?, ?)");
  $stmt->bind_param("issi", $set_id, $term, $def, $max_position);


  if($stmt->execute()) echo "insertion success";

  else echo "insertion fialed";
    
