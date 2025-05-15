<?php

  if (session_status() === PHP_SESSION_NONE) session_start();
  session_unset();
  session_abort();

  //Check if php is using cookies for session handling
  if (ini_get("session.use_cookies")) {

    //Retrieve current settings for session cookie
    $params = session_get_cookie_params();

    //setcookie used to destroy cookie
    setcookie(
        session_name(),
        '',
        time() - 3600, // Expire the cookie in the past
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
  }

  header("Location: ../page_files/insert_term.php");

