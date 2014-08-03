<?php
include_once '../modelo/modeloDepartamento.php';

$param = array();

$param['opcion']='';
$param['inicio']=0;
$param['final']=10;
$param['consulta']='';
$param['idDEPARTAMENTO']=0;
$param['nombre']='';
$param['pais']='';

if (isset($_POST['opcion']))
    $param['opcion'] = $_POST['opcion'];
if (isset($_POST['start']))
    $param['inicio'] = $_POST['start'];
if (isset($_POST['limit']))
    $param['final'] = $_POST['limit'];
if (isset($_POST['query']))
    $param['consulta'] = $_POST['query'];
if (isset($_POST['idDEPARTAMENTO']))
    $param['idDEPARTAMENTO'] = $_POST['idDEPARTAMENTO'];
if (isset($_POST['nombre']))
    $param['nombre'] = $_POST['nombre'];
if (isset($_POST['pais']))
    $param['pais'] = $_POST['pais'];


$modeloDepartamento=new modeloDepartamento();
echo $modeloDepartamento->gestionar($param);

?>
