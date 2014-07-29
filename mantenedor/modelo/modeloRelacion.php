<?php

include_once 'modeloConexion.php';

class ModeloRelacion{

    private $param = array();
    private $modeloConexion = null;

    public function __construct() {
        $this->modeloConexion = new ModeloConexion();
        $this->modeloConexion->abrirConexion();
    }
    
    public function ejecutarProcedimientoAlmacenado($opcion = '',$param = null,$modeloConexion = null) {
        if($param == null) $param = $this->param;
        if($modeloConexion == null) $modeloConexion = $this->modeloConexion;
        /*
         *
         */
        $modeloConexion->prepararConsulta("CALL spRelacion(?,?,?,?,?,?,?,?)");
        $modeloConexion->enlazarParametrosConsulta(array('string',$opcion));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['inicio']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['final']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['consulta']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['relId']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['perIdRelacionador']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['perIdRelacionado']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['tiprelId']));
        $modeloConexion->ejecutarConsulta();
    }
    
    public function gestionar($param) {
        $this->param = $param;
        $opcionCorrecta = true;
        switch ($this->param['opcion']) {
            case "registrar" :
                $resultadoGestion = $this->registrar();
                break;
            case "editar" :
                $resultadoGestion = $this->editar();
                break;
            case "eliminar" :
                $resultadoGestion = $this->eliminar();
                break;
            case "listarpagina" :
                $resultadoGestion = $this->listarpagina();
                break;
            case "listartodo" :
                $resultadoGestion = $this->listartodo();
                break;
            default:
                $opcionCorrecta = false;
                $resultadoGestion = "<span style='color:rgb(255,0,0);'>ERROR</span> : Opcion no encontrada</br>";
                break;     
        }
        if($opcionCorrecta) $this->modeloConexion->cerrarConexion();
        return $resultadoGestion;
    }
    private function registrar() {
        $this->ejecutarProcedimientoAlmacenado('registrarvalidacion');
        $respuesta = $this->modeloConexion->obtenerCampoUnico('respuesta');
        if ($respuesta=='') {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('registrar');
        }
        return '{resultado:'.($respuesta==''?'true':'false').',mensaje: "'.($respuesta==''?'Registro Satisfactorio':$respuesta).'"}';
    }
    private function editar() {
        $this->ejecutarProcedimientoAlmacenado('editarvalidacion');
        $respuesta = $this->modeloConexion->obtenerCampoUnico('respuesta');
        if ($respuesta=='') {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('editar');
        }
        return '{resultado:'.($respuesta==''?'true':'false').',mensaje: "'.($respuesta==''?'Edicion Satisfactoria':$respuesta).'"}';
    }
    private function eliminar() {
        $respuesta='';
        $this->modeloConexion->cerrarabrirConexion();
        $this->ejecutarProcedimientoAlmacenado('eliminar');
        return '{resultado:'.($respuesta==''?'true':'false').',mensaje: "'.($respuesta==''?'Eliminacion Satisfactorio':$respuesta).'"}';
    }
    private function listarpagina() {
        $this->ejecutarProcedimientoAlmacenado('listarcontador');
        $total = $this->modeloConexion->obtenerCampoUnico('total');
        $datos = array();
        if ($total > 0) {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('listarpagina');
            $datos = $this->modeloConexion->obtenerCamposMultiples(array('relId','perIdRelacionador','perIdRelacionado','tiprelId'));
        }
        return '{total:' . $total . ',datos:' . json_encode($datos) . '}';
    }
    private function listartodo() {
        $this->ejecutarProcedimientoAlmacenado('listarcontador');
        $total = $this->modeloConexion->obtenerCampoUnico('total');
        $datos = array();
        if ($total > 0) {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('listartodo');
            $datos = $this->modeloConexion->obtenerCamposMultiples(array('relId','perIdRelacionador','perIdRelacionado','tiprelId'));
        }
        return '{total:' . $total . ',datos:' . json_encode($datos) . '}';
    }
}

?>