<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of permiso_model
 *
 * @author JUAN
 */
include_once 'conexion_model.php';

class Permiso_Model {

    //put your code here
    private $param = array();
    private $conexion = null;
    private $result = null;

    function __construct() {
        $this->conexion = Conexion_Model::getConexion();
    }

    function cerrarAbrir() {
        mysql_close($this->conexion);
        $this->conexion = Conexion_Model::getConexion();
    }

    function gestionar($param) {
        $this->param = $param;
        switch ($this->param['param_opcion']) {
            case "grabar":
                echo $this->grabar();
                break;
            case "actualizar":
                echo $this->update();
                break;
            case "get":break;
        }
    }

    private function getArrayPermiso() {
        $datos = array();
        while ($fila = mysql_fetch_array($this->result)) {
            array_push($datos, array(
                "permId" => $fila["permId"],
                "menId" => $fila["menId"],
                "rolId" => $fila["rolId"]));
        }
        return $datos;
    }

   

    function grabar() {
        $this->array = $this->param['param_cpts'];

        $this->eliminarPorRol();
        for ($index = 0; $index < count($this->array); $index++) {
            $this->cerrarAbrir();
            $opcion = 'opc_grabar';
            $menId = 0;
            $consultaSql = "call fazap_sp_permiso(";
            $consultaSql.="'" . $opcion . "',";
            $consultaSql.=$this->param['param_permId'] . ",";
            $consultaSql.=$this->array[$index] . ",";
            $consultaSql.=$this->param['param_rolId'] . ")";
            $this->result = mysql_query($consultaSql);
        }
        echo '{"success":true,"message":{"reason": "Permisos Otorgados"}}';
    }

    function eliminarPorRol() {
        $opcion = 'opc_eliminar_por_rol';
        $menId = 0;
        $consultaSql = "call fazap_sp_permiso(";
        $consultaSql.="'" . $opcion . "',";
        $consultaSql.=$this->param['param_permId'] . ",";
        $consultaSql.=$menId . ",";
        $consultaSql.=$this->param['param_rolId'] . ")";
        $this->result = mysql_query($consultaSql);
    }

    function actualizar() {
        
    }

    function buscar($menId) {
        $opcion = 'opc_buscar';
        $menId = 0;
        $consultaSql = "call fazap_sp_permiso(";
        $consultaSql.="'" . $opcion . "',";
        $consultaSql.=$this->param['param_permId'] . ",";
        $consultaSql.=$menId . ",";
        $consultaSql.=$this->param['param_rolId'] . ")";
        $this->result = mysql_query($consultaSql);

        $total = count($this->result);
        if ($total > 0)
            return false;
        else
            return true;
    }


}

?>
