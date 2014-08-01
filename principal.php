<?php
session_start();
if (!isset($_SESSION['coneisc_usuUsuario'])) {
    header("Location:index.php");
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <?php include_once 'vista/head.php' ?>
    </head>
    <body>
    </body>
</html>