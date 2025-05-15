<?php
  if (session_status() === PHP_SESSION_NONE) session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <form action="../server_logic/submit.php" method="post" id="insert-form">
    <label for="term">Term</label>
    <textarea id="term" name="term"></textarea>
    <label for="def">Definition</label>
    <textarea id="def" name="def"></textarea>
    <input type="submit">
  </form>
  <!-- Used for debugging purposes to end the current php session -->
  <form action="../server_logic/end_session.php" method="post">
    <input type="submit" value="End Session">
  </form>
  <!-- Div for displaying error messages -->
  <div>
    <?php if (!empty($_SESSION["error"])): ?>
      <p class="error-message"><?php echo $_SESSION["error"]; ?></p>
    <?php endif ?>
  </div>
</body>
</html>