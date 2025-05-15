<?php

  require_once "./database.php";

  $result = $conn->query("SELECT * FROM card_sets");

  if (!$result) {
    echo "error";
    exit;
  }

  // Array that will hold data to be JSONed
  $data = [];

  if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {

      // Sanatize the set name
      $row['name'] = htmlentities($row["name"]);

      // Push each set name to our $data array
      $data[] = $row;
    }
  }

  echo json_encode($data);

  $conn->close();


