<?php
include_once '../modelo/modeloUniversidad.php';

$param = array();

$param['opcion']='';
$param['inicio']=0;
$param['final']=10;
$param['consulta']='';
$param['idUNIVERSIDAD']=0;
$param['nombre']='';
$param['abreviacion']='';
$param['direccion']='';
$param['idDEPARTAMENTO']=0;

if (isset($_POST['opcion']))
    $param['opcion'] = $_POST['opcion'];
if (isset($_POST['start']))
    $param['inicio'] = $_POST['start'];
if (isset($_POST['limit']))
    $param['final'] = $_POST['limit'];
if (isset($_POST['query']))
    $param['consulta'] = $_POST['query'];
if (isset($_POST['idUNIVERSIDAD']))
    $param['idUNIVERSIDAD'] = $_POST['idUNIVERSIDAD'];
if (isset($_POST['nombre']))
    $param['nombre'] = $_POST['nombre'];
if (isset($_POST['abreviacion']))
    $param['abreviacion'] = $_POST['abreviacion'];
if (isset($_POST['idDEPARTAMENTO']))
    $param['idDEPARTAMENTO'] = $_POST['idDEPARTAMENTO'];


$modeloUniversidad=new modeloUniversidad();
echo $modeloUniversidad->gestionar($param);

?>
