<?php
include_once '../modelo/modeloRelacion.php';

$param = array();

$param['opcion']='';
$param['inicio']=0;
$param['final']=10;
$param['consulta']='';
$param['relId']=0;
$param['perIdRelacionador']=0;
$param['perIdRelacionado']=0;
$param['tiprelId']=0;

if (isset($_POST['opcion']))
    $param['opcion'] = $_POST['opcion'];
if (isset($_POST['start']))
    $param['inicio'] = $_POST['start'];
if (isset($_POST['limit']))
    $param['final'] = $_POST['limit'];
if (isset($_POST['query']))
    $param['consulta'] = $_POST['query'];
if (isset($_POST['relId']))
    $param['relId'] = $_POST['relId'];
if (isset($_POST['perIdRelacionador']))
    $param['perIdRelacionador'] = $_POST['perIdRelacionador'];
if (isset($_POST['perIdRelacionado']))
    $param['perIdRelacionado'] = $_POST['perIdRelacionado'];
if (isset($_POST['tiprelId']))
    $param['tiprelId'] = $_POST['tiprelId'];

$modeloRelacion=new ModeloRelacion();
echo $modeloRelacion->gestionar($param);

?>