<?php

include_once '../../modelo/controlusuario/permiso_model.php';

$param = array();
$param['param_opcion']='';
$param['param_cpts']='';
$param['param_rolId']=0;
$param['param_permId']=0;
        
if (isset($_POST['param_opcion']))
    $param['param_opcion'] = $_POST['param_opcion'];
if (isset($_POST['param_cpts']))
    $param['param_cpts'] = json_decode($_POST['param_cpts'], true);
if (isset($_POST['param_rolId']))
    $param['param_rolId'] = $_POST['param_rolId'];
if (isset($_POST['param_permId']))
    $param['param_permId'] = $_POST['param_permId'];

$PermisoModel=new Permiso_Model();

echo $PermisoModel->gestionar($param);
?>
