<?php

session_start();
include_once 'conexion.php';
$cn = new conexion();
if (isset($_SESSION["validado"])) {
    $nomUni = utf8_encode(mysql_real_escape_string(trim($_REQUEST['nomUni'])));
    $abrevUni = utf8_encode(mysql_real_escape_string(trim($_REQUEST['abrevUni'])));
    $dirUni = utf8_encode(mysql_real_escape_string(trim($_REQUEST['dirUni'])));
    $depUni = utf8_encode(mysql_real_escape_string(trim($_REQUEST['depUni'])));
    if ($_SESSION["validado"] == "si") {
        if ($nomUni != "" && $abrevUni != "" && $dirUni != "" && $depUni > 0) {
            $cn->conectar('congresodb');
            $sql="select * from universidad where nombre='".$nomUni."'";
            $res = $cn->consulta($sql);

            if (($row=mysql_fetch_row($res))) {
                echo "nombre repetido";                
            } else {
                $sql = "insert into universidad values(null,'" . $nomUni . "','" . $abrevUni . "','" . $dirUni . "'," . $depUni . ");";

                $res = $cn->consulta($sql);
                echo $res;
            }
        } else {
            echo "datos incorrectos";
        }
    } else {
        header("location:salir.php");
    }
} else {
    header("location:salir.php");
}
?>
