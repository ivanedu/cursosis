<?php
include_once 'conexion_model.php';

class Usuario_Model {

    private $param = array();
    private $conexion = null;
    private $result = null;

    function __construct() {
        $this->conexion = Conexion_Model::getConexion();
    }
    function cerrarAbrir()
    {
        mysql_close($this->conexion);
        $this->conexion = Conexion_Model::getConexion();
    }
    function gestionar($param) {
        $this->param = $param;
        switch ($this->param['param_opcion']) {
            case "login":
                echo $this->login();
                break;
            case "autentificar":
                echo $this->autentificar();
                break;
            case "listar":
                if (isset($this->param['param_consulta']))
                    if ($this->param['param_consulta'] != '')
                        echo $this->filtro();
                    else
                        echo $this->listar();
                else
                    echo $this->listar();
                break;
            case "list":
                echo $this->listarTodos();
                break;
            case "grabar":
                echo $this->grabar();
                break;
            case "obtener":
                echo $this->obtenerPorId();
                break;
            case "actualizar":
                echo $this->actualizar();
                break;
            case "get":break;
        }
    }
    private function getArrayUsuario() {
        $datos = array();
        while ($fila = mysql_fetch_array($this->result)) {
            array_push($datos, array(
                "usuId" => $fila["usuId"],
                "usuUsuario" => $fila["usuUsuario"],
                "usuClave" => $fila["usuClave"],
                "usuEstado" => $fila["usuEstado"]));
        }
        return $datos;
    }
    function obtenerPorId(){
            $this->prepararConsultaUsuario('opc_obtener');
            $total=1;
            if (mysql_num_rows($this->result) > 0) {
                $datos = $this->getArrayUsuario();
                echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
            } else {
                echo "{error:'Falló la ejecución en listar'}";
            }
    }
     private function getArrayTotal() {
        $total = 0;
        while ($fila = mysql_fetch_array($this->result)) {
            $total = $fila["total"];
        }
        return $total;
    }
    function prepararConsultaUsuario($opcion = '') {
        $consultaSql = "call fazap_sp_usuario(";
        $consultaSql.="'" . $opcion . "',";
        $consultaSql.=$this->param['param_inicio'] . ",";
        $consultaSql.=$this->param['param_final'] . ",";
        $consultaSql.="'" . $this->param['param_consulta'] . "',";
        $consultaSql.=$this->param['param_usuId'] . ",";
        $consultaSql.="'" . $this->param['param_usuUsuario'] . "',";
        $consultaSql.="'" . $this->param['param_usuClave'] . "',";
        $consultaSql.=$this->param['param_usuEstado'] . ")";
        //echo $consultaSql;
        $this->result = mysql_query($consultaSql);
    }
    
    function autentificar() {
        $this->prepararConsultaUsuario('opc_buscar_por_usuario_clave');
        $total = mysql_num_rows($this->result);
        $data = array();
        if ($total == 1) {
            while ($fila = mysql_fetch_array($this->result)) {
                $_SESSION['fazap_usuId'] = $fila["usuId"];
                $_SESSION['fazap_usuUsuario'] = $fila["usuUsuario"];
            }
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":' . $total . ', "datos": ' . $json . '})';
    }

    function listar() {
    	    $this->prepararConsultaUsuario('opc_contador');
            $total = $this->getArrayTotal();
            $datos =array();
            if($total>0){
            		$this->cerrarAbrir();
            		$this->prepararConsultaUsuario('opc_listar');
                	$datos = $this->getArrayUsuario();
	                echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
            }else{
	                echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
            }
    }

    function filtro() {
    	    $this->prepararConsultaUsuario('opc_contador_filtro');
            $total = $this->getArrayTotal();
            $datos =array();
            if($total>0){
            		$this->cerrarAbrir();
            		$this->prepararConsultaUsuario('opc_listar_filtro');
                	$datos = $this->getArrayUsuario();
	                echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
            }else{
	                echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
            }
    }

    function buscar($tipo = '') {
        switch ($tipo) {
            case "editar":
                $this->adampt->setParam('get'); //tipo
                $this->adampt->setParam(0); //start
                $this->adampt->setParam(0); //limit
                $this->adampt->setParam(0); //@idpersonal integer,
                $this->adampt->setParam($this->param['usuario_usuario']); //@usuario varchar(50),
                $this->adampt->setParam(''); //@password varchar(250),
                $this->adampt->setParam(''); //@apellidos varchar(30),
                $this->adampt->setParam(''); //@nombres varchar(20),
                $this->adampt->setParam(0); //@comision decimal(10,2),
                $this->adampt->setParam(0); //@sueldo decimal(10,2),
                $this->adampt->setParam(''); //@fechaentrada date,
                $this->adampt->setParam(''); //@fechasalida date,
                $this->adampt->setParam(''); //query
                $this->array = $this->adampt->consulta('go_personal');
                $this->total = count($this->array);
                if ($this->total > 0) {
                    $id = $this->array[0]['idPersonal'];
                    if ($id == $this->param['usuario_id'])
                        return true;
                    else
                        return false;
                } else
                    return true;
                break;
            default :
                $this->adampt->setParam('get'); //tipo
                $this->adampt->setParam(0); //start
                $this->adampt->setParam(0); //limit
                $this->adampt->setParam(0); //@idpersonal integer,
                $this->adampt->setParam($this->param['usuario_usuario']); //@usuario varchar(50),
                $this->adampt->setParam(''); //@password varchar(250),
                $this->adampt->setParam(''); //@apellidos varchar(30),
                $this->adampt->setParam(''); //@nombres varchar(20),
                $this->adampt->setParam(0); //@comision decimal(10,2),
                $this->adampt->setParam(0); //@sueldo decimal(10,2),
                $this->adampt->setParam(''); //@fechaentrada date,
                $this->adampt->setParam(''); //@fechasalida date,
                $this->adampt->setParam(''); //query
                $this->array = $this->adampt->consulta('go_personal');
                $this->total = count($this->array);
                if ($this->total > 0)
                    return false;
                else
                    return true;
                break;
        }
    }

     function grabar() {
        $this->prepararConsultaUsuario('opc_grabar');
        echo '{"success":true,"message":{"reason": "Grabado Correctamente"}}';
    }

    function actualizar() {
        $this->prepararConsultaUsuario('opc_actualizar');
        echo '{"success":true,"message":{"reason": "Actualizado Correctamente"}}';
    }
    function ejecutarConsultaTotal() {
        $total = 0;
        while ($fila = mysql_fetch_array($this->result)) {
            $total = $fila["total"];
        }
        return $total;
    }

    function ejecutarConsultaRespuesta() {
        $respuesta = '';
        while ($fila = mysql_fetch_array($this->result)) {
            $respuesta = $fila["respuesta"];
        }
        return $respuesta;
    }
    function login() {
        $this->prepararConsultaUsuario('opc_login_respuesta');
        $respuesta = $this->ejecutarConsultaRespuesta();
        if ($respuesta == '1') {
            $this->cerrarAbrir();
            $this->prepararConsultaUsuario('opc_login_listar');
            while ($fila = mysql_fetch_array($this->result)) {
                $_SESSION['coneisc_usuId'] = $fila["usuId"];
                $_SESSION['coneisc_usuUsuario'] = $fila["usuUsuario"];
            }
            echo '{"resultado":true,"mensaje": "Bienvenido!!"}';
        } else {
            echo '{"resultado":false,"mensaje":"' . $respuesta . '"}';
        }
    }
}

?>