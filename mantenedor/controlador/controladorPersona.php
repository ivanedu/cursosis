<?php
include_once '../modelo/modeloPersona.php';

$param = array();

$param['opcion']='';
$param['inicio']=0;
$param['final']=10;
$param['perId']=0;
$param['perNombre']='';
$param['perApePaterno']='';
$param['perApeMaterno']='';
$param['perEdad']=0;
$param['perSexo']='';

if (isset($_POST['opcion']))
    $param['opcion'] = $_POST['opcion'];
if (isset($_POST['start']))
    $param['inicio'] = $_POST['start'];
if (isset($_POST['limit']))
    $param['final'] = $_POST['limit'];
if (isset($_POST['perId']))
    $param['perId'] = $_POST['perId'];
if (isset($_POST['perNombre']))
    $param['perNombre'] = $_POST['perNombre'];
if (isset($_POST['perApePaterno']))
    $param['perApePaterno'] = $_POST['perApePaterno'];
if (isset($_POST['perApeMaterno']))
    $param['perApeMaterno'] = $_POST['perApeMaterno'];
if (isset($_POST['perEdad']))
    $param['perEdad'] = $_POST['perEdad'];
if (isset($_POST['perSexo']))
    $param['perSexo'] = $_POST['perSexo'];

$modeloPersona=new ModeloPersona();
echo $modeloPersona->gestionar($param);

?>