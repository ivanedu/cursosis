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

    function ejecutarConsulta($opcion = '') {
        $consultaSql = "call spPersona(";
        $consultaSql.="'" . $opcion . "',";
        $consultaSql.=$this->param['inicio'] . ",";
        $consultaSql.=$this->param['final'] . ",";
        $consultaSql.=$this->param['perId'] . ",";
        $consultaSql.="'" . $this->param['perNombre'] . "',";
        $consultaSql.="'" . $this->param['perApePaterno'] . "',";
        $consultaSql.="'" . $this->param['perApeMaterno'] . "',";
        $consultaSql.=$this->param['perEdad'] . ",";
        $consultaSql.="'" . $this->param['perSexo'] . "')";
        $this->result = mysql_query($consultaSql);
    }

    function obtenerCampoUnico($campo) {
        $dato = null;
        while ($fila = mysql_fetch_array($this->result)) {
            $dato = $fila[$campo];
        }
        return $dato;
    }

    function obtenerCamposMultiples($campos) {
        $datos = array();
        if(count($campos)>0){
            while ($fila = mysql_fetch_array($this->result)) {
                $datosFila = array();
                for($i=0;$i<count($campos);$i++)
                    $datosFila[$campos[$i]]=$fila[$campos[$i]];
                array_push($datos, $datosFila);
            }
        }
        return $datos;
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
        $this->ejecutarConsulta('listarContador');
        $total = $this->obtenerCampoUnico('total');
        $datos = array();
        if ($total > 0) {
            $this->cerrarAbrir();
            $this->ejecutarConsulta('listar');
            $datos = $this->obtenerCamposMultiples(array('perId','perNombre','perApePaterno','perApeMaterno','perEdad','perSexo'));
        }
        echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
    }

}

?>