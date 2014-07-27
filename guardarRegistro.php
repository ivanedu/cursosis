<?php
$nombre=utf8_encode(mysql_real_escape_string(trim($_POST['txtnombre'])));
$apellidos=utf8_encode(mysql_real_escape_string(trim($_POST['txtapellidos'])));
$usuario=utf8_encode(mysql_real_escape_string(trim($_POST['txtusuario'])));
$contrasea=utf8_encode(mysql_real_escape_string(trim($_POST['txtpassword'])));
$pais=utf8_encode(mysql_real_escape_string(trim($_POST['txtpais'])));
$correo=utf8_encode(mysql_real_escape_string(trim($_POST['txtcorreo'])));
if($nombre!=null && $apellidos!=null && $usuario!=null && $contrasea!=null && $pais!=null && $correo!=null)
{
    $contrasea=md5("+{}@+{´¿'-".$contrasea."}{+{[<}+{.");
	$con=mysql_connect("localhost","root","");
	mysql_select_db("onedirectiondb",$con);
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