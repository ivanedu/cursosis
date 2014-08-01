<?php
session_start();
if (isset($_SESSION['coneisc_usuUsuario'])) {
    header("Location:principal.php");
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <?php include_once 'vista/head_login.php' ?>
    </head>
    <body style="background-image: url('img/blue2.jpg');width: 100%">
    </body>
</html>
