<?php

  require_once "./database.php";

  //TODO: Make it so a user can't acess this page by just typing the url into the search bar
  
  $set_name = $_GET["set_name"];
  $result = $conn->query("SELECT * FROM card_sets WHERE name='$set_name'");
  $row = $result->fetch_assoc();
  $set_id = $row['set_id'];

  //Run query
  $result = $conn->query("SELECT * FROM flashcards WHERE set_id=$set_id");
  
  //Handle any errors
  if (!$result) handle_error("Something went wrong, please try again", "../page_files/flashcards.php");
  
  //Array that will hold data to be JSONed
  $data = [];

  if ($result->num_rows > 0) {
    
    while($row = $result->fetch_assoc()) {

      //Santize the entries that are user-defined
      $row["term"] = htmlentities($row["term"]);
      $row["definition"] = htmlentities($row["definition"]);

      //Push each row to our $data array
      $data[] = $row;
    }
  }

  echo json_encode($data);


  $conn->close();
