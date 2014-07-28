<?php

include_once 'modeloConexion.php';

class ModeloPersona {

    private $param = array();
    private $conexion = null;
    private $result = null;

    function __construct() {
        $this->conexion = ModeloConexion::getConexion();
    }

    function cerrarAbrir() {
        mysql_close($this->conexion);
        $this->conexion = ModeloConexion::getConexion();
    }

    function prepararConsulta($consultaSql) {
        $this->result = mysql_query($consultaSql);
    }

    function ejecutarConsultaTotal() {
        $total = 0;
        while ($fila = mysql_fetch_array($this->result)) {
            $total = $fila["total"];
        }
        return $total;
    }

    function gestionar($param) {
        $this->param = $param;
        switch ($this->param['opcion']) {
            case "listar" :
                echo $this->listar();
                break;
            default:break;
        }
        mysql_close($this->conexion);
    }
    function listar() {
        $this->prepararConsulta("CALL spPersona('listarContador')");
        $total = $this->ejecutarConsultaTotal();
        $datos = array();
        if ($total > 0) {
            $this->cerrarAbrir();
            $this->prepararConsulta("CALL spPersona('listar')");
            while ($fila = mysql_fetch_array($this->result)) {
                array_push($datos, array(
                    "perId" => $fila["perId"],
                    "perNombre" => $fila["perNombre"]
                ));
            }
        }
        echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
    }
    
}

?>