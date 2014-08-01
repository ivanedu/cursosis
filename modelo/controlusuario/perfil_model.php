<?php

include_once 'conexion_model.php';

class Perfil_Model {

    private $param = array();
    private $array;
    private $result = array();
    private $conexion = null;

    function __construct() {
        $this->conexion = Conexion_Model::getConexion();
    }

    function cerrarAbrir() {
        mysql_close($this->conexion);
        $this->conexion = Conexion_Model::getConexion();
    }

    private function getArrayPerfil() {
        $datos = array();
        while ($fila = mysql_fetch_array($this->result)) {
            array_push($datos, array(
                "perfId" => $fila["perfId"],
                "rolId" => $fila["rolId"],
                "usuId" => $fila["usuId"]));
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

    private function prepararConsultaPerfil($opcion = '') {
        $consultaSql = "call fazap_sp_perfil(";
        $consultaSql.="'" . $opcion . "',";
        $consultaSql.=$this->param['param_perfId'] . ",";
        $consultaSql.=$this->param['param_rolId'] . ",";
        $consultaSql.=$this->param['param_usuId'] . ")";
        $this->result = mysql_query($consultaSql);
    }

    function gestionar($param) {
        $this->param = $param;
        switch ($this->param['param_opcion']) {
            case "grabar":
                echo $this->grabar();
                break;
            case "listxpersonal":
                echo $this->listxpersonal();
                break;
            case "actualizar":
                echo $this->update();
                break;
            case "get":break;
        }
        $this->cerrarAbrir();
    }

    function grabar() {
        $array = $this->param['param_cpts'];
        $this->eliminarActuales();
        for ($index = 0; $index < count($array); $index++) {
            $this->cerrarAbrir();
            $opcion = 'opc_grabar';
            $consultaSql = "call fazap_sp_perfil(";
            $consultaSql.="'" . $opcion . "',";
            $consultaSql.=$this->param['param_perfId'] . ",";
            $consultaSql.=$array[$index] . ",";
            $consultaSql.=$this->param['param_usuId'] . ")";
            $this->result = mysql_query($consultaSql);
        }
        echo '{"success":true,"message":{"reason": "Grabado Correctamente"}}';
    }

    function eliminarActuales() {
        $this->prepararConsultaPerfil("opc_elimina_actuales");
    }

    function buscar($rolId) {
        $opcion = 'opc_buscarcount';
        $consultaSql = "call fazap_sp_perfil(";
        $consultaSql.="'" . $opcion . "',";
        $consultaSql.=$this->param['param_perfId'] . ",";
        $consultaSql.=$rolId . ",";
        $consultaSql.=$this->param['param_usuId'] . ")";
        $this->result = mysql_query($consultaSql);
        $total = $this->getArrayTotal();
        if ($total > 0)
            return false;
        else
            return true;
    }

    function eliminar() {
        $this->prepararConsultaPerfil("opc_listar_por_usuario");
        $array = $this->getArrayPerfil();
        for ($index = 0; $index < count($result); $index++) {
            if (!$this->buscarEnResult($result[$index]['rolId'])) {
                $this->cerrarAbrir();
                $opcion = 'opc_eliminar';
                $consultaSql = "call fazap_sp_perfil(";
                $consultaSql.="'" . $opcion . "',";
                $consultaSql.=$this->param['param_perfId'] . ",";
                $consultaSql.=$array[$index]['param_rolId'] . ",";
                $consultaSql.=$this->param['param_usuId'] . ")";
                $this->result = mysql_query($consultaSql);
            }
        }
    }

    function buscarEnResult($rolId) {

        for ($index = 0; $index < count($this->array); $index++) {
            if ($this->array[$index] == $rolId)
                return true;
        }
        return false;
    }

    function listxpersonal() {
        $this->prepararConsultaPerfil("opc_listar_por_usuario");
        $total=count($this->result);
        $this->result= $this->getArrayPerfil();

        echo json_encode($this->result);
    }

}
?>