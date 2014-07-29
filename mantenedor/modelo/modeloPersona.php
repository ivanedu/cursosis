<?php

include_once 'modeloConexion.php';

class ModeloPersona {
    
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
        $modeloConexion->prepararConsulta("CALL spPersona(?,?,?,?,?,?,?,?,?,?)");
        $modeloConexion->enlazarParametrosConsulta(array('string',$opcion));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['inicio']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['final']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['consulta']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['perId']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['perNombre']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['perApePaterno']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['perApeMaterno']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['perEdad']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['perSexo']));
        $modeloConexion->ejecutarConsulta();
    }

    public function gestionar($param) {
        $this->param = $param;
        $opcionCorrecta = true;
        switch ($this->param['opcion']) {
            case "listarpagina":
                $resultadoGestion = $this->listarpagina();
                break;
            case "listartodo" :
                if($this->param['perId']==0){
                    if($this->param['consulta']==''){
                        $resultadoGestion = $this->listartodo();
                    }else{
                        $resultadoGestion = $this->filtrartodo();
                    }
                }else{
                    $resultadoGestion = $this->filtrartodomenosperid();
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
    private function listarpagina() {
        $this->ejecutarProcedimientoAlmacenado('listarcontador');
        $total = $this->modeloConexion->obtenerCampoUnico('total');
        $datos = array();
        if ($total > 0) {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('listarpagina');
            $datos = $this->modeloConexion->obtenerCamposMultiples(array('perId','perNombre','perApePaterno','perApeMaterno','perEdad','perSexo'));
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
            $datos = $this->modeloConexion->obtenerCamposMultiples(array('perId','perNombreCompleto'));
        }
        return '{total:' . $total . ',datos:' . json_encode($datos) . '}';
    }
    private function filtrartodo() {
        $this->ejecutarProcedimientoAlmacenado('filtrarcontador');
        $total = $this->modeloConexion->obtenerCampoUnico('total');
        $datos = array();
        if ($total > 0) {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('filtrartodo');
            $datos = $this->modeloConexion->obtenerCamposMultiples(array('perId','perNombreCompleto'));
        }
        return '{total:' . $total . ',datos:' . json_encode($datos) . '}';
    }
    private function filtrartodomenosperid() {
        $this->ejecutarProcedimientoAlmacenado('filtrartodomenosperidcontador');
        $total = $this->modeloConexion->obtenerCampoUnico('total');
        $datos = array();
        if ($total > 0) {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('filtrartodomenosperid');
            $datos = $this->modeloConexion->obtenerCamposMultiples(array('perId','perNombreCompleto'));
        }
        return '{total:' . $total . ',datos:' . json_encode($datos) . '}';
    }
}

?>