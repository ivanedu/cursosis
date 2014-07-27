<?php

session_start();
include_once 'conexion.php';

if(isset($_SESSION["validado"])){
	if($_SESSION["validado"]=="si"){
		
            } else {
        header("location:salir.php");
    }
} else {
    header("location:salir.php");
}
?>
<!DOCTYPE html>
<html>
    <head>
        
        <meta charset="utf-8"/>
        <link rel="StyleSheet" type="text/css" href="css/estilo.css"/>
        <script type="text/javascript" src="js/jquery.js"></script>
        <script type="text/javascript" src="js/general.js"></script>
        <title></title>
    </head>
    <body>
        <header id="menuSis">
            <ul>
                <li><a href="pagoVirtual.php">Pago Voucher</a></li>
                <li><a href="pagoEfectivo.php">Pago a contabilidad</a></li>
                <li><a href="pagoVirtual.php">Pago efectivo</a></li>
                <li><a href="universidad.php">Universidades</a></li>
                <li><a href="#">Confirmar</a></li>
                <li><a href="#">Carnets</a></li>
                <li><a href="#">Materiales</a></li>
                <li><a href="#">Talleres</a></li>
                <li><a href="#">Inscripción Talleres</a></li>
                <li><a href="#">Salir</a></li>
            </ul>
        </header>
        
