<?php
date_default_timezone_set("America/Lima");
class ModeloConexion {
    public static function getConexion() {
        $conexion = @mysql_connect("localhost","coneisc_admin","truj1ll0UNT2014") or die("Conexion Fallida".mysql_error());
	@mysql_select_db("coneisc_familiabd",$conexion)or die("Error cargando la base de datos".mysql_error());    
        return $conexion;
    }
}
?>