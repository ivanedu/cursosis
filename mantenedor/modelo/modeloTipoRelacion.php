<?php

include_once 'modeloConexion.php';

class ModeloTipoRelacion {

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
        $consultaSql = "call spTipoRelacion(";
        $consultaSql.="'" . $opcion . "',";
        $consultaSql.=$this->param['inicio'] . ",";
        $consultaSql.=$this->param['final'] . ",";
        $consultaSql.=$this->param['tiprelId'] . ",";
        $consultaSql.="'" . $this->param['tiprelNombre'] . "')";
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
            case "registrar" :
                echo $this->registrar();
                break;
            case "editar" :
                echo $this->editar();
                break;
            case "eliminar" :
                echo $this->eliminar();
                break;
            case "listarpagina" :
                echo $this->listarpagina();
                break;
            case "listartodo" :
                echo $this->listartodo();
                break;
            default:break;
        }
        mysql_close($this->conexion);
    }
    function registrar() {
        $this->ejecutarConsulta('registrarValidacion');
        $respuesta = $this->obtenerCampoUnico('respuesta');
        if ($respuesta=='') {
            $this->cerrarAbrir();
            $this->ejecutarConsulta('registrar');
            $respuesta = "Registro Satisfactorio";
        }
        echo '{resultado:true,mensaje: "'.$respuesta.'"}';
    }
    function editar() {
        $this->ejecutarConsulta('editarValidacion');
        $respuesta = $this->obtenerCampoUnico('respuesta');
        if ($respuesta=='') {
            $this->cerrarAbrir();
            $this->ejecutarConsulta('editar');
            $respuesta = "Edicion Satisfactoria";
        }
        echo '{resultado:true,mensaje: "'.$respuesta.'"}';
    }
    function eliminar() {
        $this->ejecutarConsulta('eliminarValidacion');
        $respuesta = $this->obtenerCampoUnico('respuesta');
        if ($respuesta=='') {
            $this->cerrarAbrir();
            $this->ejecutarConsulta('eliminar');
            $respuesta = "Eliminacion Satisfactoria";
        }
        echo '{resultado:true,mensaje: "'.$respuesta.'"}';
    }
    function listarpagina() {
        $this->ejecutarConsulta('listarContador');
        $total = $this->obtenerCampoUnico('total');
        $datos = array();
        if ($total > 0) {
            $this->cerrarAbrir();
            $this->ejecutarConsulta('listarpagina');
            $datos = $this->obtenerCamposMultiples(array('tiprelId','tiprelNombre'));
        }
        echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
    }
    function listartodo() {
        $this->ejecutarConsulta('listarContador');
        $total = $this->obtenerCampoUnico('total');
        $datos = array();
        if ($total > 0) {
            $this->cerrarAbrir();
            $this->ejecutarConsulta('listartodo');
            $datos = $this->obtenerCamposMultiples(array('tiprelId','tiprelNombre'));
        }
        echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
    }
}

?>