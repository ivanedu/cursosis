<?php
include_once '../../modelo/controlusuario/perfil_model.php';
$param = array();
$param['param_opcion']='';
$param['param_cpts']='';
$param['param_usuId']=0;
$param['param_perfId']=0;
$param['param_rolId']=0;
if (isset($_POST['param_opcion']))
    $param['param_opcion'] = $_POST['param_opcion'];
if (isset($_POST['param_cpts']))
    $param['param_cpts'] = json_decode($_POST['param_cpts'], TRUE);
if (isset($_POST['param_usuId']))
    $param['param_usuId'] = $_POST['param_usuId'];
if (isset($_POST['param_perfId']))
    $param['param_perfId'] = $_POST['param_perfId'];
if (isset($_POST['param_rolId']))
    $param['param_rolId'] = $_POST['param_rolId'];
$PerfilModel=new Perfil_Model();
echo $PerfilModel->gestionar($param);
?>
