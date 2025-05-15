<?php

  //File for connecting to database

  require_once "validation.php";

  if (session_status() === PHP_SESSION_NONE) session_start();

  $db_server = "localhost";
  $db_user = "root";
  $db_pass = "";
  $db_name = "flashcard_db";

  $conn = new mysqli($db_server, $db_user, $db_pass, $db_name);

  if($conn->connect_error) handle_error("Database connection failed. Try again.");