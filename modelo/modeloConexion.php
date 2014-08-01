<?php

date_default_timezone_set("America/Lima");

class ModeloConexion {

    private $conexion = null;
    private $result = null;
    private $consultaSql = "";

    public function __construct() {
        $this->conexion = null;
        $this->result = null;
        $this->consultaSql = "";
    }

    public function abrirConexion($servidor = "localhost", $usuario = "root", $clave = "", $basedatos = "coneiscbd") {
        $this->conexion = @mysql_connect($servidor, $usuario, $clave) or die("<span style='color:rgb(255,0,0);'>ERROR</span> : ModeloConexion->abrirConexion[mysql_connect : " . mysql_error() . "]</br>");
        @mysql_select_db($basedatos, $this->conexion)or die("<span style='color:rgb(255,0,0);'>ERROR</span> : ModeloConexion->abrirConexion[mysql_mysql_db : " . mysql_error() . "]</br>");
    }

    public function cerrarConexion() {
        mysql_close($this->conexion);
    }

    public function cerrarabrirConexion() {
        $this->cerrarConexion();
        $this->abrirConexion();
    }

    public function obtenerCampoUnico($campo) {
        $dato = null;
        while ($fila = mysql_fetch_array($this->result) ) {
            if (array_key_exists($campo, $fila)) {
                $dato = $fila[$campo];
            } else {
                die("<span style='color:rgb(255,0,0);'>ERROR</span> : ModeloConexion->obtenerCampoUnico[mysql_fetch_array : campo '" . $campo . "' no existe. " . mysql_error() . "]</br>");
            }
        }
        return $dato;
    }

    public function obtenerCamposMultiples($campos) {
        $datos = array();
        if (count($campos) > 0) {
            while ($fila = mysql_fetch_array($this->result)) {
                $datosFila = array();
                for ($i = 0; $i < count($campos); $i++) {
                    if (array_key_exists($campos[$i], $fila)) {
                        $datosFila[$campos[$i]] = $fila[$campos[$i]];
                    } else {
                        die("<span style='color:rgb(255,0,0);'>ERROR</span> : ModeloConexion->obtenerCamposMultimples[mysql_fetch_array : campo '" . $campos[$i] . "' no existe. " . mysql_error() . "]</br>");
                    }
                }
                array_push($datos, $datosFila);
            }
        }
        return $datos;
    }

    public function prepararConsulta($consulta) {
        $this->consultaSql = $consulta;
    }

    private function enlazarParametrosConsultaUnico($parametros = array()) {
        $posicionVariable = strpos($this->consultaSql, "?");
        if ($posicionVariable !== false) {
            switch ($parametros[0]) {
                case 'number':
                    $this->consultaSql = substr_replace($this->consultaSql, $parametros[1], $posicionVariable, 1);
                    break;
                case 'string':
                    $this->consultaSql = substr_replace($this->consultaSql, "'" . $parametros[1] . "'", $posicionVariable, 1);
                    break;
                default:
                    die("<span style='color:rgb(255,0,0);'>ERROR</span> : TipoVariable = '" . $parametros[0] . "'(tipoVariable[number,string]) </br>");
                    break;
            }
        } else {
            die("<span style='color:rgb(255,0,0);'>ERROR</span> : Ya no hay variables en la consulta('?' no encontrado) </br>");
        }
    }

    public function enlazarParametrosConsulta($parametros = array()) {
        if (count($parametros) > 0) {
            if (is_array($parametros[0])) {
                for ($i = 0; $i < count($parametros); $i++) {
                    $this->enlazarParametrosConsultaUnico($parametros[$i]);
                }
            } else {
                $this->enlazarParametrosConsultaUnico($parametros);
            }
        } else {
            die("<span style='color:rgb(255,0,0);'>ERROR</span> : Parametros nulo. </br>");
        }
    }

    public function ejecutarConsulta() {
        $this->result = mysql_query($this->consultaSql) or die("<span style='color:rgb(255,0,0);'>ERROR</span> : ModeloConexion->ejecutarConsulta[mysql_query : consulta '".$this->consultaSql."'.<br/>" . mysql_error() . "]</br>");
        $filasAfectadas = mysql_affected_rows();
        /*if($filasAfectadas<=0) {
            if($filasAfectadas == 0)
            {
                die("<span style='color:rgb(255,0,0);'>ERROR</span> : ModeloConexion->ejecutarConsulta[mysql_query : consulta '".$this->consultaSql."' afecto (0) filas.]<br/>");
            }else{
                die("<span style='color:rgb(255,0,0);'>ERROR</span> : ModeloConexion->ejecutarConsulta[mysql_query : consulta '".$this->consultaSql."' fallo.]<br/>");
            }
       }*/
       return $this->consultaSql;
    }
}

?>