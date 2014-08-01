<?php
include_once '../modelo/mantenedor/modeloPersona.php';

$param = array();

$param['opcion']='';
$param['inicio']=0;
$param['final']=10;
$param['consulta']='';
$param['dni']='';
$param['nombre']='';
$param['ape_paterno']='';
$param['ape_materno']='';
$param['email']='';
$param['telefono']='';
$param['codigoUni']='';
$param['direccion']='';
$param['idUNIVERSIDAD']=0;
$param['pass']='';

if (isset($_POST['opcion']))
    $param['opcion'] = $_POST['opcion'];
if (isset($_POST['start']))
    $param['inicio'] = $_POST['start'];
if (isset($_POST['limit']))
    $param['final'] = $_POST['limit'];
if (isset($_POST['query']))
    $param['consulta'] = $_POST['query'];
if (isset($_POST['dni']))
    $param['dni'] = $_POST['dni'];
if (isset($_POST['nombre']))
    $param['nombre'] = $_POST['nombre'];
if (isset($_POST['ape_paterno']))
    $param['ape_paterno'] = $_POST['ape_paterno'];
if (isset($_POST['ape_materno']))
    $param['ape_materno'] = $_POST['ape_materno'];
if (isset($_POST['email']))
    $param['email'] = $_POST['email'];
if (isset($_POST['email']))
    $param['email'] = $_POST['email'];
if (isset($_POST['telefono']))
    $param['telefono'] = $_POST['telefono'];
if (isset($_POST['codigoUni']))
    $param['codigoUni'] = $_POST['codigoUni'];
if (isset($_POST['direccion']))
    $param['direccion'] = $_POST['direccion'];
if (isset($_POST['idUNIVERSIDAD']))
    $param['idUNIVERSIDAD'] = $_POST['idUNIVERSIDAD'];
if (isset($_POST['pass']))
    $param['pass'] = $_POST['pass'];

$modeloPersona=new ModeloPersona();
echo $modeloPersona->gestionar($param);

?>

