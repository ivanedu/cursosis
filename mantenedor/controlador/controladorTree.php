<?php

$arbolEstatico = '';
$arbolEstatico.='[';
$arbolEstatico.='    {';
$arbolEstatico.='        "id":"1",';
$arbolEstatico.='        "idParent":"0",';
$arbolEstatico.='        "text":"Mantenedor",';
$arbolEstatico.='        "orderNumber":null,';
$arbolEstatico.='        "description":"",';
$arbolEstatico.='        "draggable":false,';
$arbolEstatico.='        "hidden":false,';
$arbolEstatico.='        "leaf":false,';
$arbolEstatico.='        "children":';
$arbolEstatico.='        [';
$arbolEstatico.='            {';
$arbolEstatico.='                "id":"2",';
$arbolEstatico.='                "idParent":"1",';
$arbolEstatico.='                "text":"Persona",';
$arbolEstatico.='                "orderNumber":null,';
$arbolEstatico.='                "description":"",';
$arbolEstatico.='                "draggable":false,';
$arbolEstatico.='                "hidden":false,';
$arbolEstatico.='                "leaf":true';
$arbolEstatico.='            },{';
$arbolEstatico.='                "id":"3",';
$arbolEstatico.='                "idParent":"1",';
$arbolEstatico.='                "text":"Tipo Relacion",';
$arbolEstatico.='                "orderNumber":null,';
$arbolEstatico.='                "description":"",';
$arbolEstatico.='                "draggable":false,';
$arbolEstatico.='                "hidden":false,';
$arbolEstatico.='                "leaf":true';
$arbolEstatico.='            }';
$arbolEstatico.='        ]';
$arbolEstatico.='    }';
$arbolEstatico.=']';
echo $arbolEstatico;
?>