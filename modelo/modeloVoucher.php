<?php
include_once 'modeloConexion.php';

class ModeloVoucher {
    
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
        $modeloConexion->prepararConsulta("CALL spVoucher(?,?,?,?,?,?,?,?,?,?,?,?)");
        $modeloConexion->enlazarParametrosConsulta(array('string',$opcion));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['inicio']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['final']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['consulta']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['nroOperacion']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['fecha']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['monto']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['agente']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['nombreBancario']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['imagen']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['enFisico']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['idINSCRIPCION']));
        $modeloConexion->ejecutarConsulta();
    }

    public function gestionar($param) {
        $this->param = $param;
        $opcionCorrecta = true;
        switch ($this->param['opcion']) {
            case "registropago":
                $resultadoGestion = $this->registropago();
                break;
            default:
                $opcionCorrecta = false;
                $resultadoGestion = "<span style='color:rgb(255,0,0);'>ERROR</span> : Opcion no encontrada</br>";
                break;     
        }
        if($opcionCorrecta) $this->modeloConexion->cerrarConexion();
        return $resultadoGestion;
    }
    
    private function registropago() {
        $this->ejecutarProcedimientoAlmacenado('validarregistropago');
        $respuesta = $this->modeloConexion->obtenerCampoUnico('respuesta');
        if ($respuesta=='') {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('registropago');
        }
        return '{resultado:'.($respuesta==''?'true':'false').',mensaje: "'.($respuesta==''?'Registro Satisfactorio':$respuesta).'"}';
    }
}

?>
