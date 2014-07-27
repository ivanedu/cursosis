<?php
include_once 'conexion.php';
$cn = new conexion();
$cn->conectar('onedirectiondb');

$nombre=utf8_decode(mysql_real_escape_string(trim($_POST['txtnombre'])));
$apellidos=utf8_decode(mysql_real_escape_string(trim($_POST['txtapellidos'])));
$usuario=utf8_decode(mysql_real_escape_string(trim($_POST['txtusuario'])));
$contrasea=(mysql_real_escape_string(trim($_POST['txtpassword'])));
$pais=utf8_decode(mysql_real_escape_string(trim($_POST['txtpais'])));
$correo=utf8_decode(mysql_real_escape_string(trim($_POST['txtcorreo'])));
if($nombre!="" && $apellidos!="" && $usuario!="" && $contrasea!="" && $pais!="" && $correo!="")
{
    $contrasea=md5("+{}@+{´¿'-".$contrasea."}{+{[<}+{.");
	
	$sql="insert into usuario values(null,'$nombre','$apellidos','$usuario','$contrasea','$pais','$correo');";
	$res=mysql_query($sql);
	mysql_close();

	if($res==true){
		header("location:home.php");
	}else{
		header("location:registrar.php");
	}

}else{
		header("location:registrar.php");
	}