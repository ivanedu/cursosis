<?php

include_once '../../modelo/controlusuario/tree_model.php';

$param = array();
$param['param_opcion']='';
$param['param_inicio']=0;
$param['param_final']=10;
$param['param_consulta']=0;
$param['param_usuId']=0;
$param['param_usuUsuario']='';
$param['param_usuClave']='';
$param['param_usuEstado'] = '1';
$param['param_permId']=0;

        
$param['param_menId']=0;
$param['param_menNombre']='';
$param['param_menPadreId'] = 0;
$param['param_menOrden'] = 0;
$param['param_menDescripcion'] = '';
$param['param_menDraggable'] = '0';
$param['param_menHidden'] = '0';

if (isset($_POST['param_opcion']))
    $param['param_opcion'] = $_POST['param_opcion'];
if (isset($_POST['start']))
    $param['param_inicio'] = $_POST['start'];
if (isset($_POST['limit']))
    $param['param_final'] = $_POST['limit'];
if (isset($_POST['query']))
    
if (isset($_POST['param_nodes']))
    $param['param_nodes'] = $_POST['param_nodes'];
if (isset($_POST['parent']))
    $param['parent'] = $_POST['parent'];
$param['param_records'] = '';
if (isset($_POST['param_records']))
    $param['param_records'] = json_decode($_POST['param_records'], true);

if (isset($_POST['param_menId']))
    $param['param_menId'] = $_POST['param_menId'];
if (isset($_POST['param_menNombre']))
    $param['param_menNombre'] = $_POST['param_menNombre'];
if (isset($_POST['param_menPadreId'])){
    $cadena = "'".$_POST['param_menPadreId']."'";
    if($cadena!="''"){
        $param['param_menPadreId'] = $_POST['param_menPadreId'];
    }
}
if (isset($_POST['param_menDescripcion']))
    $param['param_menDescripcion'] = $_POST['param_menDescripcion'];
if (isset($_POST['param_menDraggable']))
    $param['param_menDraggable'] = $_POST['param_menDraggable'];
if (isset($_POST['param_rolId']))
    $param['param_rolId'] = $_POST['param_rolId'];
if (isset($_POST['param_permId']))
    $param['param_permId'] = $_POST['param_permId'];


if (isset($_POST['param_usuId']))
    $param['param_usuId'] = $_POST['param_usuId'];
if (isset($_POST['param_usuUsuario']))
    $param['param_usuUsuario'] = $_POST['param_usuUsuario'];
if (isset($_POST['param_usuClave']))
    $param['param_usuClave'] = $_POST['param_usuClave'];
if (isset($_POST['param_usuEstado']))
    $param['param_usuEstado'] = $_POST['param_usuEstado'];
$Tree = new Tree_Model();
echo $Tree->gestionar($param, NULL);
?>
