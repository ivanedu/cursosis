<?php
include_once '../modelo/modeloBoleta.php';

$param = array();

$param['opcion']='';
$param['inicio']=0;
$param['final']=10;
$param['consulta']='';
$param['fecha']='';
$param['monto']=0;
$param['numComprobante']='';
$param['idINSCRIPCION']=0;

if (isset($_POST['opcion']))
    $param['opcion'] = $_POST['opcion'];
if (isset($_POST['start']))
    $param['inicio'] = $_POST['start'];
if (isset($_POST['limit']))
    $param['final'] = $_POST['limit'];
if (isset($_POST['query']))
    $param['consulta'] = $_POST['query'];
if (isset($_POST['fecha']))
    $param['fecha'] = $_POST['fecha'];
if (isset($_POST['monto']))
    $param['monto'] = $_POST['monto'];
if (isset($_POST['numComprobante']))
    $param['numComprobante'] = $_POST['numComprobante'];
if (isset($_POST['idINSCRIPCION']))
    $param['idINSCRIPCION'] = $_POST['idINSCRIPCION'];

$modeloBoleta=new ModeloBoleta();
echo $modeloBoleta->gestionar($param);

?>

