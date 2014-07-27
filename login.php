<?php
include_once 'conexion.php';
$cn= new conexion();
$cn->conectar('onedirectiondb');
$usuario=utf8_decode(mysql_real_escape_string(trim($_REQUEST['usuario'])));
$contrasea=md5("+{}@+{´¿'-".mysql_real_escape_string(trim($_REQUEST['clave']))."}{+{[<}+{.");


if($usuario!="" && $contrasea!="")
{	
    
    $sql="select * from usuario where nick='$usuario' && clave='$contrasea'";
    $res=$cn->consulta($sql);	
    if(($fila=mysql_fetch_row($res))){
            session_start();
            $_SESSION["validado"]="si";
            $_SESSION["id"]=$fila[0];
            echo "0";
    }else{
            echo "Datos incorrectos";
    }
}else{
    echo "Ingresar datos";
    
    }