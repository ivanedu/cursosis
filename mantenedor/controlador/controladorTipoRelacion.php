<?php
include_once '../modelo/modeloTipoRelacion.php';

$param = array();

$param['opcion']='';
$param['inicio']=0;
$param['final']=10;
$param['tiprelId']=0;
$param['tiprelNombre']='';

if (isset($_POST['opcion']))
    $param['opcion'] = $_POST['opcion'];
if (isset($_POST['start']))
    $param['inicio'] = $_POST['start'];
if (isset($_POST['limit']))
    $param['final'] = $_POST['limit'];
if (isset($_POST['tiprelId']))
    $param['tiprelId'] = $_POST['tiprelId'];
if (isset($_POST['tiprelNombre']))
    $param['tiprelNombre'] = $_POST['tiprelNombre'];

$modeloTipoRelacion=new ModeloTipoRelacion();
echo $modeloTipoRelacion->gestionar($param);

?>