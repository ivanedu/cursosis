<?php

session_start();

include_once 'conexion_model.php';

class Tree_Model {

    private $records = array();
    private $array = array();
    private $tree = array();
    private $index = array();
    private $cont = 0;
    private $mysqli = null;
    private $cs = null;
    private $param = array();
    private $conexion = null;
    private $result = null;
    private $usuId;

    function __construct() {
        $this->conexion = Conexion_Model::getConexion();
        $this->usuId = $_SESSION['coneisc_usuId'];
    }

    function cerrarAbrir() {
        mysql_close($this->conexion);
        $this->conexion = Conexion_Model::getConexion();
    }

    public function addChild($child, $parentKey = null) {
        $key = isset($child["id"]) ? $child["id"] : 'item_' . $this->cont;
        $child["leaf"] = true;
        if ($this->containsKey($parentKey)) {
            //added to the existing node  
            $this->index[$key] = & $child;
            $parent = & $this->index[$parentKey];
            if (isset($parent["children"])) {
                $parent["children"][] = & $child;
            } else {
                $parent["leaf"] = false;
                $parent["children"] = array();
                $parent["children"][] = & $child;
            }
        } else {
            //added to the root  
            $this->index[$key] = & $child;
            $this->tree[] = & $child;
        }
        $this->cont++;
    }

    public function getNode($key) {
        return $this->index[key];
    }

    public function removeNode($key) {
        //unset($this->index[key]);  
    }

    public function containsKey($key) {
        return isset($this->index[$key]);
    }

    public function toJson() {
        return json_encode($this->tree);
    }

    //
    //getArray
    private function getArrayMenu() {
        $datos = array();
        while ($fila = mysql_fetch_array($this->result)) {
            array_push($datos, array(
                "menId" => $fila["menId"],
                "menPadreId" => $fila["menPadreId"],
                "menNombre" => $fila["menNombre"],
                "menOrden" => $fila["menOrden"],
                "menDescripcion" => $fila["menDescripcion"],
                "menDraggable" => $fila["menDraggable"],
                "menHidden" => $fila["menHidden"]));
        }
        return $datos;
    }

    private function getArrayPermiso($datos) {
        $datos = array();
        while ($fila = mysql_fetch_array($this->result)) {
            array_push($datos, array(
                "permId" => $fila["permId"],
                "menId" => $fila["menId"],
                "rolId" => $fila["rolId"]));
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
    function prepararConsultaUsuario($opcion = '') {
        $consultaSql = "call fazap_sp_usuario(";
        $consultaSql.="'" . $opcion . "',";
        $consultaSql.=$this->param['param_inicio'] . ",";
        $consultaSql.=$this->param['param_final'] . ",";
        $consultaSql.="'" . $this->param['param_consulta'] . "',";
        $consultaSql.=$this->usuId . ",";
        $consultaSql.="'" . $this->param['param_usuUsuario'] . "',";
        $consultaSql.="'" . $this->param['param_usuClave'] . "',";
        $consultaSql.=$this->param['param_usuEstado'] . ")";
        //echo $consultaSql;
        $this->result = mysql_query($consultaSql);
    }

    private function prepararConsultaMenu($opcion = '') {
        $consultaSql = "call fazap_sp_menu(";
        $consultaSql.="'" . $opcion . "',";
        $consultaSql.=$this->param['param_menId'] . ",";
        $consultaSql.=$this->param['param_menPadreId'] . ",";
        $consultaSql.="'" . $this->param['param_menNombre'] . "',";
        $consultaSql.=$this->param['param_menOrden'] . ",";
        $consultaSql.="'" . $this->param['param_menDescripcion'] . "',";
        $consultaSql.="'" . $this->param['param_menDraggable'] . "',";
        $consultaSql.="'" . $this->param['param_menHidden'] . "',";
        $consultaSql.=$this->param['param_inicio'] . ",";
        $consultaSql.=$this->param['param_final'] . ")";
        $this->result = mysql_query($consultaSql);
    }

    private function prepararConsultaPermiso($opcion = '') {
        $consultaSql = "call fazap_sp_permiso(";
        $consultaSql.="'" . $opcion . "',";
        $consultaSql.=$this->param['param_permId'] . ",";
        $consultaSql.=$this->param['param_menId'] . ",";
        $consultaSql.=$this->param['param_rolId'] . ")";
        $this->result = mysql_query($consultaSql);
    }

    function gestionar($datos, $records) {
        $this->param = $datos;
        $this->records = $records;
        switch ($this->param['param_opcion']) {
            case "grabar":
                echo $this->grabar();
                break;
            case "listarOrder":
                echo $this->listarPorNombre();
                break;
            
            case "listarPadres":
                echo $this->listarPadres();
                break;
            case "listarTodos":
                echo $this->listarPorOrden0();
                break;
            case "listar":
                echo $this->listarPorOrden();
                break;
            case "listarMenu":
                echo $this->listarMenu();
                break;
            case"listarCheck":
                echo $this->listarPorOrdenCheck();
                break;
            case "actualizar":
                echo $this->actualizarPadreOrden();
                break;
            case "actualizar1":
                echo $this->actualizarTodo();
                break;
            default :
                echo '{"failure":false,"errors":{"reason": "Ninguna Opcion"}}';
                break;
        }
        mysql_close($this->conexion);
    }

    function getChecked($menId) {
        $this->cerrarAbrir();
        $opcion = 'opc_buscar';
        $consultaSql = "call fazap_sp_permiso(";
        $consultaSql.="'" . $opcion . "',";
        $consultaSql.=$this->param['param_permId'] . ",";
        $consultaSql.=$menId . ",";
        $consultaSql.=$this->param['param_rolId'] . ")";
        $this->result = mysql_query($consultaSql);
        $total = mysql_num_rows($this->result);
        if ($total > 0) {
            return true;
        } else
            return false;
    }

    function grabar() {
        $this->prepararConsultaMenu("opc_grabar");
        echo '{"success":true,"message":{"reason": "Grabado Correctamente"}}';
    }

    function listarMenu() {
        $this->prepararConsultaUsuario('opc_listar_menu');
        $total = mysql_num_rows($this->result);

        $datos = array();
        while ($fila = mysql_fetch_array($this->result)) {
            $val = true;
            if ($fila["menDraggable"] == 1)
                $val = true;
            if ($fila["menDraggable"] == 0)
                $val = false;
            $val2 = true;
            if ($fila["menHidden"] == 1)
                $val2 = true;
            if ($fila["menHidden"] == 0)
                $val2 = false;
            array_push($datos, array(
                "id" => $fila["menId"],
                "idParent" => $fila["menPadreId"],
                "text" => $fila["menNombre"],
                "orderNumber" => $fila["menOrden"],
                "description" => $fila["menDescripcion"],
                "draggable" => $val,
                "hidden" => $val2));
        }
        for ($i = 0; $i < count($datos); $i++) {
            $category = $datos[$i];
            $this->addChild($category, $category["idParent"]);
        }

        echo $this->toJson();
    }
	
    function listarPorOrden0() {
    	$this->prepararConsultaMenu('opc_contador');
    	if (mysql_num_rows($this->result) > 0) {
            $total = $this->getArrayTotal();
            $datos =array();
            if($total>0){
            		$this->cerrarAbrir();
	            $this->prepararConsultaMenu('opc_listar_por_Id');
	            if (mysql_num_rows($this->result) > 0) {
	                $datos = $this->getArrayMenu();
	                echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
	            } else {
	                echo "{error:'Fall�� la ejecuci��n en listar'}";
	            }
            }else{
	                echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
            }
            
        } else {
            echo "{error:'Fall�� la ejecuci��n en listar contador'}";
        } 
        
    }
    function listarPadres() {
    	$this->prepararConsultaMenu('opc_contador_padre');
    	if (mysql_num_rows($this->result) > 0) {
            $total = $this->getArrayTotal();
            $datos =array();
            if($total>0){
            		$this->cerrarAbrir();
	            $this->prepararConsultaMenu('opc_listar_padre');
	            if (mysql_num_rows($this->result) > 0) {
	                $datos = $this->getArrayMenu();
	                echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
	            } else {
	                echo "{error:'Fall�� la ejecuci��n en listar'}";
	            }
            }else{
	                echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
            }
            
        } else {
            echo "{error:'Fall�� la ejecuci��n en listar contador'}";
        } 
        
    }
    function listarPorNombre() {
        $this->prepararConsultaMenu('opc_listar_por_nombre');
        if (!mysql_num_rows($this->result)) {
            $datos = $this->getArrayMenu();
            $total = count($datos);
            echo '{total:' . $this->total . ',datos:' . json_encode($this->array) . '}';
        } else {
            echo "{error:'Falló la ejecución}";
        }
    }

    function listarPorOrdenCheck() {
        $this->prepararConsultaMenu('opc_listar_por_orden');
        $total = mysql_num_rows($this->result);

        $dataInicial = $this->getArrayMenu();
        $datos = array();
       for ($i = 0; $i < count($dataInicial); $i++) {
            $fila = $dataInicial[$i];
            $val = true;
            if ($fila["menDraggable"] == 1)
                $val = true;
            if ($fila["menDraggable"] == 0)
                $val = false;
            $val2 = true;
            if ($fila["menHidden"] == 1)
                $val2 = true;
            if ($fila["menHidden"] == 0)
                $val2 = false;
            array_push($datos, array(
                "id" => $fila["menId"],
                "idParent" => $fila["menPadreId"],
                "text" => $fila["menNombre"],
                "orderNumber" => $fila["menOrden"],
                "description" => $fila["menDescripcion"],
                "draggable" => $val,
                "hidden" => $val2,
                "expanded" => true,
                "checked" => $this->getChecked($fila["menId"])));
        }



        for ($i = 0; $i < count($datos); $i++) {
            $category = $datos[$i];
            $this->addChild($category, $category["idParent"]);
        }

        echo $this->toJson();
    }

    function listarPorOrden() {
        $this->prepararConsultaMenu('opc_listar_por_orden');
        $total = mysql_num_rows($this->result);

        $datos = array();

        while ($fila = mysql_fetch_array($this->result)) {
            $val = true;
            if ($fila["menDraggable"] == 1)
                $val = true;
            if ($fila["menDraggable"] == 0)
                $val = false;
            $val2 = true;
            if ($fila["menHidden"] == 1)
                $val2 = true;
            if ($fila["menHidden"] == 0)
                $val2 = false;
            array_push($datos, array(
                "id" => $fila["menId"],
                "idParent" => $fila["menPadreId"],
                "text" => $fila["menNombre"],
                "orderNumber" => $fila["menOrden"],
                "description" => $fila["menDescripcion"],
                "draggable" => $val,
                "hidden" => $val2));
        }

        for ($i = 0; $i < count($datos); $i++) {
            $category = $datos[$i];
            $this->addChild($category, $category["idParent"]);
        }

        echo $this->toJson();
    }

    function actualizarTodo() {
        //No modificado al 20/02/14
        echo $this->param['param_records'][0]['param_menNombre'];
        for ($index = 0; $index < count($this->param['param_records']); $index++) {
            $menId = $this->param['param_records'][$index]['param_menId'];
            $menPadreId = NULL;
            if ($this->param['param_records'][$index]['param_menPadreId'])
                $menPadreId = $this->param['param_records'][$index]['param_menPadreId'];
            $menNombre = $this->param['param_records'][$index]['param_menNombre'];
            $menOrden = 0;
            if ($this->param['param_records'][$index]['param_menOrden'] != '')
                $menOrden = $this->param['param_records'][$index]['param_menOrden'];
            $menDescripcion = '';
            if ($this->param['param_records'][$index]['param_menDescripcion'] != '')
                $menDescripcion = $this->param['param_records'][$index]['param_menDescripcion'];
            $menDraggable = $this->param['param_records'][$index]['param_menDraggable'];
            $menHidden = $this->param['param_records'][$index]['param_menHidden'];
            //   

            $opcion = 'opc_actualizar_todo';

            $consultaSql = "call fazap_sp_menu(";
            $consultaSql.="'" . $opcion . "',";
            $consultaSql.=$menId . ",";
            $consultaSql.=$menPadreId . ",";
            $consultaSql.="'" . $menNombre . "',";
            $consultaSql.=$menOrden . ",";
            $consultaSql.="'" . $menDescripcion . "',";
            $consultaSql.="'" . $menDraggable . "',";
            $consultaSql.="'" . $menHidden . "',";
            $consultaSql.=$this->param['param_inicio'] . ",";
            $consultaSql.=$this->param['param_final'] . ")";
            $this->result = mysql_query($consultaSql);
        }
    }

    function actualizarPadreOrden() {
        $items = explode(',', $this->param['param_nodes']);
        for ($index1 = 0; $index1 < count($items); $index1++) {

            $opcion = 'opc_actualizar_padre_orden';

            $consultaSql = "call fazap_sp_menu(";
            $consultaSql.="'" . $opcion . "',";
            $consultaSql.=$items[$index1];
            $consultaSql.=$this->param['param_menPadreId'];
            $consultaSql.="'" . $this->param['param_menNombre'] . ")";
            $consultaSql.=($index1 + 1);
            $consultaSql.="'" . $this->param['param_menDescripcion'] . ")";
            $consultaSql.="'" . $this->param['param_menDraggable'] . ")";
            $consultaSql.="'" . $this->param['param_menHidden'] . ")";
            $this->result = mysql_query($consultaSql);
        }
    }

}

?>