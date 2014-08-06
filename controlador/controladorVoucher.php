<?php
include_once '../modelo/modeloVoucher.php';

$param = array();

$param['opcion']='';
$param['inicio']=0;
$param['final']=10;
$param['consulta']='';
$param['nroOperacion']=0;
$param['fecha']='';
$param['monto']=0;
$param['agente']=1;
$param['nombreBancario']='';
$param['imagen']='';
$param['enFisico']=1;
$param['idINSCRIPCION']='';

if (isset($_POST['opcion']))
    $param['opcion'] = $_POST['opcion'];
if (isset($_POST['start']))
    $param['inicio'] = $_POST['start'];
if (isset($_POST['limit']))
    $param['final'] = $_POST['limit'];
if (isset($_POST['query']))
    $param['consulta'] = $_POST['query'];
if (isset($_POST['nroOperacion']))
    $param['nroOperacion'] = $_POST['nroOperacion'];
if (isset($_POST['fecha']))
    $param['fecha'] = $_POST['fecha'];
if (isset($_POST['monto']))
    $param['monto'] = $_POST['monto'];
if (isset($_POST['agente']))
    $param['agente'] = $_POST['agente'];
if (isset($_POST['nombreBancario']))
    $param['nombreBancario'] = $_POST['nombreBancario'];
if (isset($_POST['imagen']))
    $param['imagen'] = $_POST['imagen'];
if (isset($_POST['enFisico']))
    $param['enFisico'] = $_POST['enFisico'];
if (isset($_POST['idINSCRIPCION']))
    $param['idINSCRIPCION'] = $_POST['idINSCRIPCION'];

$modeloVoucher=new ModeloVoucher();
echo $modeloVoucher->gestionar($param);

?>

