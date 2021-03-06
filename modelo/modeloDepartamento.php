<?php

include_once 'modeloConexion.php';

class ModeloDepartamento {
    
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
        $modeloConexion->prepararConsulta("CALL spDepartamento(?,?,?,?,?,?,?)");
        $modeloConexion->enlazarParametrosConsulta(array('string',$opcion));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['inicio']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['final']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['consulta']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['idDEPARTAMENTO']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['nombre']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['pais']));
        $modeloConexion->ejecutarConsulta();
    }

    public function gestionar($param) {
        $this->param = $param;
        $opcionCorrecta = true;
        switch ($this->param['opcion']) {
            case "listarTodo":
                if ($this->param['consulta']!=''){
                    $resultadoGestion = $this->filtrarTodo();
                }else{
                    $resultadoGestion = $this->listarTodo();
                }
                break;
            default:
                $opcionCorrecta = false;
                $resultadoGestion = "<span style='color:rgb(255,0,0);'>ERROR</span> : Opcion no encontrada</br>";
                break;     
        }
        if($opcionCorrecta) $this->modeloConexion->cerrarConexion();
        return $resultadoGestion;
    }
    private function listarTodo() {
        $this->ejecutarProcedimientoAlmacenado('listarContador');
        $total = $this->modeloConexion->obtenerCampoUnico('total');
        $datos = array();
        if ($total > 0) {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('listarTodo');
            $datos = $this->modeloConexion->obtenerCamposMultiples(array('idDEPARTAMENTO','nombre'));
        }
        return '{total:' . $total . ',datos:' . json_encode($datos) . '}';
    }
     private function filtrarTodo() {
        $this->ejecutarProcedimientoAlmacenado('filtrarTodoContador');
        $total = $this->modeloConexion->obtenerCampoUnico('total');
        $datos = array();
        if ($total > 0) {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('filtrarTodo');
            $datos = $this->modeloConexion->obtenerCamposMultiples(array('idDEPARTAMENTO','nombre'));
        }
        return '{total:' . $total . ',datos:' . json_encode($datos) . '}';
    }
}

?>
