<?php

date_default_timezone_set("America/Lima");
class Conexion_Model {

    public static function getConexion() {
        $conexion = @mysql_connect("localhost","root","") or die("Conexion Fallida".mysql_error());
	@mysql_select_db("coneiscbd",$conexion)or die("Error cargando la base de datos".mysql_error());    
        return $conexion;
    }

}
?>