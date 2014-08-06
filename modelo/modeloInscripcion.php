<?php
include_once 'modeloConexion.php';

class ModeloInscripcion {
    
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
        $modeloConexion->prepararConsulta("CALL spInscripcion(?,?,?,?,?,?,?,?,?,?,?,?,?)");
        $modeloConexion->enlazarParametrosConsulta(array('string',$opcion));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['inicio']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['final']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['consulta']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['idINSCRIPCION']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['presencial']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['carnet']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['materiales']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['fecha']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['certificado']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['dni']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['tipo']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['dni2']));
        $modeloConexion->ejecutarConsulta();
    }

    public function gestionar($param) {
        $this->param = $param;
        $opcionCorrecta = true;
        switch ($this->param['opcion']) {
            case "registrarInscripcion":
                $resultadoGestion = $this->registrarInscripcion();
                break;
            case "listarPagina":
                $resultadoGestion = $this->listarPagina();
                break;
            case "buscarPorDni":
                $resultadoGestion = $this->buscarPorDni();
                break;
            case "registropago":
                $resultadoGestion = $this->registropago();
                break;
            case "registromateriales":
                $resultadoGestion = $this->registromateriales();
                break;
            case "registrocarnet":
                $resultadoGestion = $this->registrocarnet();
                break;
            default:
                $opcionCorrecta = false;
                $resultadoGestion = "<span style='color:rgb(255,0,0);'>ERROR</span> : Opcion no encontrada</br>";
                break;     
        }
        if($opcionCorrecta) $this->modeloConexion->cerrarConexion();
        return $resultadoGestion;
    }
    private function registrarInscripcion() {
        $this->ejecutarProcedimientoAlmacenado('registrarvalidacion');
        $respuesta = $this->modeloConexion->obtenerCampoUnico('respuesta');
        if ($respuesta=='') {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('registrarInscripcion');
        }else{
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('modificarInscripcion');
        }
        return '{resultado:true,mensaje: "Registro Satisfactorio"}';
    }
    
    private function buscarPorDni(){
        $this->ejecutarProcedimientoAlmacenado('buscarPorDnicontador');
        $total = $this->modeloConexion->obtenerCampoUnico('total');
        $datos = array();
        if ($total > 0) {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('buscarPorDni');
            $datos = $this->modeloConexion->obtenerCamposMultiples(array('nombre',
                'ape_paterno','ape_materno','email','telefono','codigoUni',
                'direccion','idUNIVERSIDAD', 'idDEPARTAMENTO', 'perTipo'));
            return '{total:' . $total . ',datos:' . json_encode($datos) . '}';
        }else{
            return '{resultado:false,mensaje:"No Registrado"}';
        }
        //return '{total:' . $total . ',datos:' . json_encode($datos) . '}';
    }

    private function listarPagina() {
        $this->ejecutarProcedimientoAlmacenado('listarContador');
        $total = $this->modeloConexion->obtenerCampoUnico('total');
        $datos = array();
        if ($total > 0) {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('listarPagina');
            $datos = $this->modeloConexion->obtenerCamposMultiples(array('idINSCRIPCION',
                'presencial','carnet','materiales','fecha','certificado',
                'dni','tipo'));
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
    private function registropago() {
        $this->ejecutarProcedimientoAlmacenado('registropago');
        return '{resultado:true ,mensaje: "Registro Satisfactorio"}';
    }
    private function registromateriales() {
        $this->ejecutarProcedimientoAlmacenado('registromateriales');
        return '{resultado:true ,mensaje: "Registro Satisfactorio"}';
    }
    private function registrocarnet() {
        $this->ejecutarProcedimientoAlmacenado('registrocarnet');
        return '{resultado:true ,mensaje: "Registro Satisfactorio"}';
    }
}

?>

