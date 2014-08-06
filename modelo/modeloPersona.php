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
        $modeloConexion->prepararConsulta("CALL spPersona(?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        $modeloConexion->enlazarParametrosConsulta(array('string',$opcion));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['inicio']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['final']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['consulta']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['dni']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['nombre']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['ape_paterno']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['ape_materno']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['email']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['telefono']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['codigoUni']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['direccion']));
        $modeloConexion->enlazarParametrosConsulta(array('number',$param['idUNIVERSIDAD']));
        $modeloConexion->enlazarParametrosConsulta(array('string',$param['tipo']));
        $modeloConexion->ejecutarConsulta();
        
    }

    public function gestionar($param) {
        $this->param = $param;
        $opcionCorrecta = true;
        switch ($this->param['opcion']) {
            case "registrarPersona":
                $resultadoGestion = $this->registrarPersona();
                break;
            case "listarpagina":
                $resultadoGestion = $this->listarpagina();
                break;
            case "listarPaginaIns":
                if ($this->param['nombre']=='' && $this->param['ape_paterno']=='' 
                        && $this->param['ape_materno']==''){
                    $resultadoGestion = $this->listarPaginaIns();
                }else{
                    $resultadoGestion = $this->filtrarTodoIns();
                }
                break;
            case "buscarpagocongreso":
                $resultadoGestion = $this->buscarpagocongreso();
                break;
            case "listarpresenciales":
                if($this->param['dni']=='')
                {
                    $resultadoGestion = $this->listarpresenciales();
                }else{
                    $resultadoGestion = $this->filtrarpresenciales();
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
    private function registrarPersona() {
        $this->ejecutarProcedimientoAlmacenado('registrarvalidacion');
        $respuesta = $this->modeloConexion->obtenerCampoUnico('respuesta');
        if ($respuesta=='') {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('registrarPersona');
        }else{
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('modificarPersona');
        }
        return '{resultado:true,mensaje: "Registro Satisfactorio"}';
    }
    private function listarpagina() {
        $this->ejecutarProcedimientoAlmacenado('listarContador');
        $total = $this->modeloConexion->obtenerCampoUnico('total');
        $datos = array();
        if ($total > 0) {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('listarPagina');
            $datos = $this->modeloConexion->obtenerCamposMultiples(array('dni','nombre',
                'ape_paterno','ape_materno','email','telefono','codigoUni',
                'direccion','idUNIVERSIDAD'));
        }
        return '{total:' . $total . ',datos:' . json_encode($datos) . '}';
    }
    private function filtrarTodoIns() {
        $this->ejecutarProcedimientoAlmacenado('filtrarTodoContadorIns');
        $total = $this->modeloConexion->obtenerCampoUnico('total');
        $datos = array();
        if ($total > 0) {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('filtrarTodoIns');
            $datos = $this->modeloConexion->obtenerCamposMultiples(array('dni','nombre',
                'ape_paterno','ape_materno','email','telefono','codigoUni',
                'direccion','idUNIVERSIDAD'));
        }
        return '{total:' . $total . ',datos:' . json_encode($datos) . '}';
    }
    private function listarPaginaIns() {
        $this->ejecutarProcedimientoAlmacenado('listarContadorIns');
        $total = $this->modeloConexion->obtenerCampoUnico('total');
        $datos = array();
        if ($total > 0) {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('listarPaginaIns');
            $datos = $this->modeloConexion->obtenerCamposMultiples(array('dni','nombre',
                'ape_paterno','ape_materno','email','telefono','codigoUni',
                'direccion','idUNIVERSIDAD'));
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
    private function buscarpagocongreso() {
        $this->ejecutarProcedimientoAlmacenado('buscarpagocongresocontador');
        $total = $this->modeloConexion->obtenerCampoUnico('total');
        $datos = array();
        if ($total > 0) {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('buscarpagocongreso');
            $datos = $this->modeloConexion->obtenerCamposMultiples(array('idINSCRIPCION',
                    'perNombreCompleto','tipo','fecha','monto','numComprobante','agente',
                    'nroOperacion','nombreBancario','enFisico','imagen','presencial'));
        }
        return '{total:' . $total . ',datos:' . json_encode($datos) . '}';
    }
    function listarpresenciales()
    {
        $this->ejecutarProcedimientoAlmacenado('listarpresencialestotal');
        $total = $this->modeloConexion->obtenerCampoUnico('total');
        $datos = array();
        if ($total > 0) {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('listarpresenciales');
            $datos = $this->modeloConexion->obtenerCamposMultiples(array('dni','nombre',
                     'ape_paterno','ape_materno','idUNIVERSIDAD','carnet','materiales'));
        }
        return '{total:' . $total . ',datos:' . json_encode($datos) . '}';
    }
    function filtrarpresenciales()
    {
        $this->ejecutarProcedimientoAlmacenado('filtrarpresencialestotal');
        $total = $this->modeloConexion->obtenerCampoUnico('total');
        $datos = array();
        if ($total > 0) {
            $this->modeloConexion->cerrarabrirConexion();
            $this->ejecutarProcedimientoAlmacenado('filtrarpresenciales');
            $datos = $this->modeloConexion->obtenerCamposMultiples(array('dni','nombre',
                     'ape_paterno','ape_materno','idUNIVERSIDAD','carnet','materiales'));
        }
        return '{total:' . $total . ',datos:' . json_encode($datos) . '}';
    }
}

?>

