<?php

  /* Contains functions that deal with error handling
     and form validation */


  if (session_status() === PHP_SESSION_NONE) session_start();

  function handle_error($error_message, $path) {

    $_SESSION["error"] = $error_message;
    header("Location:" . $path);
    exit;
  }