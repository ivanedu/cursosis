<?php
session_start();
if (isset($_SESSION['coneisc_usuUsuario'])) {
    echo $_SESSION['coneisc_usuUsuario'];
}  else {
    echo "Invitado";
}
?>
