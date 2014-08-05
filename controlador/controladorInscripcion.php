<?php
include_once '../modelo/modeloInscripcion.php';

$param = array();

$param['opcion']='';
$param['inicio']=0;
$param['final']=10;
$param['consulta']='';
$param['idINSCRIPCION']=0;
$param['presencial']=0;
$param['carnet']=1;
$param['materiales']=1;
$param['fecha']='';
$param['certificado']=1;
$param['dni']='';
$param['tipo']=0;

if (isset($_POST['opcion']))
    $param['opcion'] = $_POST['opcion'];
if (isset($_POST['start']))
    $param['inicio'] = $_POST['start'];
if (isset($_POST['limit']))
    $param['final'] = $_POST['limit'];
if (isset($_POST['query']))
    $param['consulta'] = $_POST['query'];
if (isset($_POST['idINSCRIPCION']))
    $param['idINSCRIPCION'] = $_POST['idINSCRIPCION'];
if (isset($_POST['presencial']))
    $param['presencial'] = $_POST['presencial'];
if (isset($_POST['carnet']))
    $param['carnet'] = $_POST['carnet'];
if (isset($_POST['materiales']))
    $param['materiales'] = $_POST['materiales'];
if (isset($_POST['fecha']))
    $param['fecha'] = $_POST['fecha'];
if (isset($_POST['certificado']))
    $param['certificado'] = $_POST['certificado'];
if (isset($_POST['dni']))
    $param['dni'] = $_POST['dni'];
if (isset($_POST['tipo']))
    $param['tipo'] = $_POST['tipo'];

$modeloInscripcion=new ModeloInscripcion();
echo $modeloInscripcion->gestionar($param);

?>

