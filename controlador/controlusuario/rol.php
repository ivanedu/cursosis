<?php

include_once '../../modelo/controlusuario/rol_model.php';

$param = array();

$param['param_opcion']='';
$param['param_inicio']=0;
$param['param_final']=10;
$param['param_consulta']=0;
$param['param_rolId']=0;
$param['param_rolNombre']='';
$param['param_rolActivo'] = '1';

if (isset($_POST['param_opcion']))
    $param['param_opcion'] = $_POST['param_opcion'];
if (isset($_POST['start']))
    $param['param_inicio'] = $_POST['start'];
if (isset($_POST['limit']))
    $param['param_final'] = $_POST['limit'];
if (isset($_POST['param_rolId']))
    $param['param_rolId'] = $_POST['param_rolId'];
if (isset($_POST['param_rolNombre']))
    $param['param_rolNombre'] = $_POST['param_rolNombre'];
if (isset($_POST['param_rolActivo'])) {
    if ($_POST['param_rolActivo'] == 'true')
        $param['param_rolActivo'] = '1';
    if ($_POST['param_rolActivo'] == 'false')
        $param['param_rolActivo'] = '0';
}

$Rol=new Rol_Model();
echo $Rol->gestionar($param);

?>
