<?php

include_once 'conexion_model.php';

class Rol_Model {

    //put your code here
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
            case "actualizar":
                echo $this->update();
                break;
            case "get":break;
        }
        mysql_close($this->conexion);
    }

    private function prepararConsultaRol($opcion = '') {
        $consultaSql = "call fazap_sp_rol(";
        $consultaSql.="'" . $opcion . "',";
        $consultaSql.=$this->param['param_inicio'] . ",";
        $consultaSql.=$this->param['param_final'] . ",";
        $consultaSql.="'" . $this->param['param_consulta'] . "',";
        $consultaSql.=$this->param['param_rolId'] . ",";
        $consultaSql.="'" . $this->param['param_rolNombre'] . "',";
        $consultaSql.="'" . $this->param['param_rolActivo'] . "')";
        $this->result = mysql_query($consultaSql);
    }

    private function getArrayRol() {
        $datos = array();
        while ($fila = mysql_fetch_array($this->result)) {
            array_push($datos, array(
                "rolId" => $fila["rolId"],
                "rolNombre" => $fila["rolNombre"],
                "rolActivo" => $fila["rolActivo"]));
        }
        return $datos;
    }

    private function getArrayTotal() {
        $total = 0;
        while ($fila = mysql_fetch_array($this->result)) {
            $total = $fila["total"];
        }
        return $total;
    }

    function listar() {
        $this->prepararConsultaRol('opc_contador');
        if (mysql_num_rows($this->result) > 0) {
            $total = $this->getArrayTotal();
            $datos =array();
            if($total>0){
            		$this->cerrarAbrir();
            		$this->prepararConsultaRol('opc_listar_por_partes');
	            if (mysql_num_rows($this->result) > 0) {
                	$datos = $this->getArrayRol();
	                echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
	            } else {
	                echo "{error:'Falló la ejecución en listar'}";
	            }
            }else{
	                echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
            }
        } else {
            echo "{error:'Falló la ejecución en listar contador'}";
        }
    }

    function filtro() {
        $this->prepararConsultaRol('opc_contador_filtro');
        if (mysql_num_rows($this->result) > 0) {
            $total = $this->getArrayTotal();
            $datos =array();
            if($total>0){
            		$this->cerrarAbrir();
            		$this->prepararConsultaRol('opc_listar_filtro');
	            if (mysql_num_rows($this->result) > 0) {
                	$datos = $this->getArrayRol();
	                echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
	            } else {
	                echo "{error:'Falló la ejecución en listar'}";
	            }
            }else{
	                echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
            }
            
        } else {
            echo "{error:'Falló la ejecución en listar contador filtro}";
        }
    }

    function listarTodos() {
        $this->prepararConsultaRol('opc_listar');
        if (mysql_num_rows($this->result) > 0) {
            $datos = $this->getArrayRol();
            $total = count($datos);
            echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
        } else {
            echo "{error:'Falló la ejecución en listar'}";
        }
    }

    function buscar($tipo = '') {
        switch ($tipo) {
            case "editar":
                $this->adampt->setParam('opc_obtener'); //tipo
                $this->adampt->setParam(0); //start
                $this->adampt->setParam(0); //limit
                $this->adampt->setParam(-1); //id
                $this->adampt->setParam($this->param['param_rolNombre']); //rol
                $this->adampt->setParam(''); //activo
                $this->adampt->setParam(''); //query
                $this->array = $this->adampt->consulta('go_rol');
                $this->total = count($this->array);
                if ($this->total > 0) {
                    $id = $this->array[0]['rolId'];
                    if ($id == $this->param['rolId'])
                        return true;
                    else
                        return false;
                } else
                    return true;
                break;
            default :
                $this->adampt->setParam('obtener'); //tipo
                $this->adampt->setParam(0); //start
                $this->adampt->setParam(0); //limit
                $this->adampt->setParam(-1); //id
                $this->adampt->setParam($this->param['rolNombre']); //rol
                $this->adampt->setParam(''); //activo
                $this->adampt->setParam(''); //query
                $this->array = $this->adampt->consulta('go_rol');
                $this->total = count($this->array);
                if ($this->total > 0)
                    return false;
                else
                    return true;
                break;
        }
    }

    function grabar() {
        $this->prepararConsultaRol('opc_insertar');
        echo '{"success":true,"message":{"reason": "Grabado Correctamente"}}';
    }

    function get() {
        
    }

    function update() {
        $this->prepararConsultaRol('opc_actualizar');
        echo '{"success":true,"message":{"reason": "Actualizado Correctamente"}}';
    }

}

?>