<?php

include_once 'conexion_model.php';

session_start();

class Personal_Model {

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

    function _PrepararConsulta($opcion = '') {
        $consultaSql = "call sp_empleado(";
        $consultaSql.="'" . $opcion . "',";
        $consultaSql.=$this->param['param_inicio'] . ",";
        $consultaSql.=$this->param['param_final'] . ",";
        $consultaSql.="'" . $this->param['param_consulta'] . "',";
        $consultaSql.="'" . $this->param['param_persId'] . "',";
        $consultaSql.="'" . $this->param['param_persDni'] . "',";
        $consultaSql.="'" . $this->param['param_persNombre'] . "',";
        $consultaSql.="'" . $this->param['param_persApePaterno'] . "',";
        $consultaSql.="'" . $this->param['param_persApeMaterno'] . "',";
        $consultaSql.=$this->param['param_persFechaNacimiento'] . ",";
        $consultaSql.="'" . $this->param['param_persSexo'] . "',";
        $consultaSql.="'" . $this->param['param_persDireccion'] . "',";
        $consultaSql.="'" . $this->param['param_persTelefono'] . "',";
        $consultaSql.=$this->param['param_persFechaIngreso'] . ",";
        $consultaSql.=$this->param['param_persFechaSeso'] . ",";
        $consultaSql.=$this->param['param_persEstado'] . ",";
        $consultaSql.=$this->param['param_persTienda'] . ",";
        $consultaSql.="'" . $this->param['param_usuUsuario'] . "',";
        $consultaSql.="'" . $this->param['param_usuClave'] . "')";
        $this->result = mysql_query($consultaSql);
    }

    function prepararConsulta($opcion = '') {
        $consultaSql = "call fazap_sp_personal(";
        $consultaSql.="'" . $opcion . "',";
        $consultaSql.=$this->param['param_inicio'] . ",";
        $consultaSql.=$this->param['param_final'] . ",";
        $consultaSql.="'" . $this->param['param_consulta'] . "',";
        $consultaSql.="'" . $this->param['param_persId'] . "',";
        $consultaSql.="'" . $this->param['param_persDni'] . "',";
        $consultaSql.="'" . $this->param['param_persNombre'] . "',";
        $consultaSql.="'" . $this->param['param_persApePaterno'] . "',";
        $consultaSql.="'" . $this->param['param_persApeMaterno'] . "',";
        $consultaSql.="'" . $this->param['param_persFechaNacimiento'] . "',";
        $consultaSql.="'" . $this->param['param_persSexo'] . "',";
        $consultaSql.="'" . $this->param['param_persDireccion'] . "',";
        $consultaSql.="'" . $this->param['param_persTelefono01'] . "',";
        $consultaSql.="'" . $this->param['param_persTelefono02'] . "',";
        $consultaSql.="'" . $this->param['param_persCorreo'] . "',";
        $consultaSql.=$this->param['param_persEstado'] . ",";
        $consultaSql.=$this->param['param_persTienda'] . ",";
        $consultaSql.="'" . $this->param['param_usuUsuario'] . "',";
        $consultaSql.="'" . $this->param['param_usuClave'] . "')";
        //echo $consultaSql;
        $this->result = mysql_query($consultaSql);
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

    function gestionar($param) {
        $this->param = $param;
        switch ($this->param['param_opcion']) {
            case "update":
                echo $this->_Update();
                break;
            case "getactual":
                echo $this->getactual();
                break;
            case "load":
                echo $this->_Load();
                break;
            case "show":
                echo $this->_Show();
                break;
            case "drop":
                echo $this->_Drop();
                break;
            case "tienda":
                echo $this->_listasTienda();
                break;
            case "add":
                echo $this->_Add();
                break;
            case "obtenerPersonal":
                echo $this->_obtenerPersonal();
                break;

            case "insertar":
                echo $this->insertar();
                break;
            case "actualizar":
                echo $this->actualizar();
                break;
            case "login":
                echo $this->login();
                break;
            case "listarAlmacenPersonal":
                echo $this->listarAlmacenPersonal();
                break;
            case "listarPersonalAlmacen":
                echo $this->listarPersonalAlmacen();
                break;
            case "listarAll":
                if (isset($this->param['param_consulta']))
                    if ($this->param['param_consulta'] != '')
                        echo $this->filtrarAll();
                    else
                        echo $this->listarAll();
                else
                    echo $this->listarAll();
                break;
            default: echo $this->_Load();
        }
        mysql_close($this->conexion);
    }

    function insertar() {
        $this->prepararConsulta('opc_insertar');
        $respuesta = $this->ejecutarConsultaRespuesta();
        if ($respuesta == '1') {
            echo '{"resultado":true,"mensaje": "Personal Grabado Correctamente"}';
        } else {
            echo '{"resultado":false,"mensaje":"' . $respuesta . '"}';
        }
    }

    function actualizar() {
        $this->prepararConsulta('opc_actualizar');
        $respuesta = $this->ejecutarConsultaRespuesta();
        if ($respuesta == '1') {
            echo '{"resultado":true,"mensaje": "Personal Actualizado Correctamente"}';
        } else {
            echo '{"resultado":false,"mensaje":"' . $respuesta . '"}';
        }
    }
    function getactual() {
        echo '{"resultado":true,"fazap_persId":"' . $_SESSION['fazap_persId'] . ',"fazap_persNombreCompleto":"' . $_SESSION['fazap_persNombreCompleto'] .'"}';
    }
    function login() {
        $this->prepararConsulta('opc_login_respuesta');
        $respuesta = $this->ejecutarConsultaRespuesta();
        if ($respuesta == '1') {
            $this->cerrarAbrir();
            $this->prepararConsulta('opc_login_listar');
            while ($fila = mysql_fetch_array($this->result)) {
                $_SESSION['fazap_usuId'] = $fila["usuId"];
                $_SESSION['fazap_usuUsuario'] = $fila["usuUsuario"];
                $_SESSION['fazap_persId'] = $fila["persId"];
                $_SESSION['fazap_persNombreCompleto'] = $fila["persNombreCompleto"];
            }
            echo '{"resultado":true,"mensaje": "Bienvenido!!"}';
        } else {
            echo '{"resultado":false,"mensaje":"' . $respuesta . '"}';
        }
    }

    function filtrarAll() {
        $this->prepararConsulta('opc_contador_filtro');
        $total = $this->ejecutarConsultaTotal();
        $datos = array();
        if ($total > 0) {
            $this->cerrarAbrir();
            $this->prepararConsulta('opc_filtroAll');
            while ($fila = mysql_fetch_array($this->result)) {
                array_push($datos, array(
                    "persId" => $fila["persId"],
                    "persDni" => $fila["persDni"],
                    "persNombre" => $fila["persNombre"],
                    "persApePaterno" => $fila["persApePaterno"],
                    "persApeMaterno" => $fila["persApeMaterno"],
                    "persFechaNacimiento" => $fila["persFechaNacimiento"],
                    "persSexo" => $fila["persSexo"],
                    "persDireccion" => $fila["persDireccion"],
                    "persTelefono01" => $fila["persTelefono01"],
                    "persTelefono02" => $fila["persTelefono02"],
                    "persCorreo" => $fila["persCorreo"],
                    "persTienda" => $fila["persTienda"],
                    "usuId" => $fila["usuId"],
                    "usuUsuario" => $fila["usuUsuario"],
                    "persNombreCompleto" => $fila["persNombreCompleto"],
                    "persEstado" => $fila["persEstado"]
                ));
            }
            echo '({"total":"' . $total . '", "datos": ' . json_encode($datos) . '})';
        } else {
            echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
        }
    }
    function listarPersonalAlmacen() {
        $this->prepararConsulta('opc_personalalmacen_contador');
        $total = $this->ejecutarConsultaTotal();
        $datos = array();
        if ($total > 0) {
            $this->cerrarAbrir();
            $this->prepararConsulta('opc_personalalmacen_listar');
            while ($fila = mysql_fetch_array($this->result)) {
                array_push($datos, array(
                    "persId" => $fila["persId"],
                    "persDni" => $fila["persDni"],
                    "persNombre" => $fila["persNombre"],
                    "persApePaterno" => $fila["persApePaterno"],
                    "persApeMaterno" => $fila["persApeMaterno"],
                    "persFechaNacimiento" => $fila["persFechaNacimiento"],
                    "persSexo" => $fila["persSexo"],
                    "persDireccion" => $fila["persDireccion"],
                    "persTelefono01" => $fila["persTelefono01"],
                    "persTelefono02" => $fila["persTelefono02"],
                    "persCorreo" => $fila["persCorreo"],
                    "persTienda" => $fila["persTienda"],
                    "usuId" => $fila["usuId"],
                    "usuUsuario" => $fila["usuUsuario"],
                    "persNombreCompleto" => $fila["persNombreCompleto"],
                    "persEstado" => $fila["persEstado"]
                ));
            }
            echo '{"total":"' . $total . '", "datos": ' . json_encode($datos) . '}';
        } else {
            echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
        }
    }
    function listarAll() {
        $this->prepararConsulta('opc_contador');
        $total = $this->ejecutarConsultaTotal();
        $datos = array();
        if ($total > 0) {
            $this->cerrarAbrir();
            $this->prepararConsulta('opc_listarAll');
            while ($fila = mysql_fetch_array($this->result)) {
                array_push($datos, array(
                    "persId" => $fila["persId"],
                    "persDni" => $fila["persDni"],
                    "persNombre" => $fila["persNombre"],
                    "persApePaterno" => $fila["persApePaterno"],
                    "persApeMaterno" => $fila["persApeMaterno"],
                    "persFechaNacimiento" => $fila["persFechaNacimiento"],
                    "persSexo" => $fila["persSexo"],
                    "persDireccion" => $fila["persDireccion"],
                    "persTelefono01" => $fila["persTelefono01"],
                    "persTelefono02" => $fila["persTelefono02"],
                    "persCorreo" => $fila["persCorreo"],
                    "persTienda" => $fila["persTienda"],
                    "usuId" => $fila["usuId"],
                    "usuUsuario" => $fila["usuUsuario"],
                    "persNombreCompleto" => $fila["persNombreCompleto"],
                    "persEstado" => $fila["persEstado"]
                ));
            }
            echo '({"total":"' . $total . '", "datos": ' . json_encode($datos) . '})';
        } else {
            echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
        }
    }

    function listarAlmacenPersonal() {
        $this->prepararConsulta('opc_contador_almacen_personal');
        $total = $this->ejecutarConsultaTotal();
        $datos = array();
        if ($total > 0) {
            $this->cerrarAbrir();
            $this->prepararConsulta('opc_listarAlmacenPersonal');
            while ($fila = mysql_fetch_array($this->result)) {
                array_push($datos, array(
                    "almId" => $fila["almId"],
                    "almDescripcion" => $fila["almDescripcion"]
                ));
            }
            echo '{total:' . $total . ', datos: ' . json_encode($datos) . '}';
        } else {
            echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
        }
    }

    /* function listarAlmacenPersonal() {
      $this->prepararConsulta('opc_contador_almacen_personal');
      $total = $this->ejecutarConsultaTotal();
      $datos = array();
      if ($total > 0) {
      $this->cerrarAbrir();
      $this->prepararConsulta('opc_listarAlmacenPersonal');
      while ($fila = mysql_fetch_array($this->result)) {
      array_push($datos, array(
      "almId" => $fila["almId"],
      "almDescripcion" => $fila["almDescripcion"]
      ));
      }
      echo '({"total":"' . $total . '", "datos": ' . json_encode($datos) . '})';
      } else {
      echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
      }
      }
     */

    function _Load() {
        $this->_PrepararConsulta(2);
        $total = mysql_num_rows($this->result);
        mysql_close($this->conexion);
        $this->conexion = Conexion_Model::getConexion();
        $this->_PrepararConsulta(3);
        $data = array();
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "persId" => $row["persId"],
                "persDni" => $row["persDni"],
                "NombreCompleto" => $row["NombreCompleto"],
                "persFechaNacimiento" => $row["persFechaNacimiento"],
                "persSexo" => $row["persSexo"],
                "persDireccion" => $row["persDireccion"],
                "persTelefono" => $row["persTelefono"],
                "persFechaIngreso" => $row["persFechaIngreso"],
                "persFechaSeso" => $row["persFechaSeso"],
                "persEstado" => $row["persEstado"],
                "persTienda" => $row["persTienda"]
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})';
    }

    function _obtenerPersonal() {
        $this->param['param_persId'] = $_SESSION['fazap_persId'];
        $this->_PrepararConsulta(20);
        $data = array();
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "persId" => $row["persId"],
                "persDni" => $row["persDni"],
                "NombreCompleto" => $row["NombreCompleto"],
                "persFechaNacimiento" => $row["persFechaNacimiento"],
                "persSexo" => $row["persSexo"],
                "persDireccion" => $row["persDireccion"],
                "persTelefono" => $row["persTelefono"],
                "persFechaIngreso" => $row["persFechaIngreso"],
                "persFechaSeso" => $row["persFechaSeso"],
                "persEstado" => $row["persEstado"],
                "persTienda" => $row["persTienda"]
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . 1 . '", "datos": ' . $json . '})';
    }

    function _listasTienda() {
        $this->_PrepararConsulta(8);
        $total = mysql_num_rows($this->result);
        $data = array();
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "persTienda" => $row["persTienda"],
                "Descripcion" => $row["Descripcion"],
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})';
    }

    function _Add() {
        $this->_PrepararConsulta(6);
        mysql_close($this->conexion);
        while ($fila = mysql_fetch_array($this->result)) {
            echo '0';
            return;
        }
        $this->conexion = Conexion_Model::getConexion();
        $this->ejecutarConsultaNonSelect(1);
//        else{
//        }
    }

    function _Drop() {
        $this->ejecutarConsultaNonSelect(7);
    }

    function _Show() {
        $this->_PrepararConsulta(6);
        $total = mysql_num_rows($this->result);
        $data = array();
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "persId" => $row["persId"],
                "persDni" => $row["persDni"],
                "persNombre" => $row["persNombre"],
                "persApePaterno" => $row["persApePaterno"],
                "persApeMaterno" => $row["persApeMaterno"],
                "persFechaNacimiento" => $row["persFechaNacimiento"],
                "persSexo" => $row["persSexo"],
                "persDireccion" => $row["persDireccion"],
                "persTelefono" => $row["persTelefono"],
                "persFechaIngreso" => $row["persFechaIngreso"],
                "persFechaSeso" => $row["persFechaSeso"],
                "persEstado" => $row["persEstado"],
                "persTienda" => $row["persTienda"]
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})';
    }

    function _Update() {
        $this->ejecutarConsultaNonSelect(5);
    }

}

?>
