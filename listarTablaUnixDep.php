<?php

session_start();
include_once 'conexion.php';
$cn = new conexion();
if (isset($_SESSION["validado"])) {
    if ($_SESSION["validado"] == "si" and $_REQUEST['busDepUni']!=0) {
        
        $cn->conectar('congresodb');
        $sql = "SELECT * FROM universidad where DEPARTAMENTO_idDEPARTAMENTO=". $_REQUEST['busDepUni']." order by nombre asc";
        
        $res = $cn->consulta($sql);
        
        $cont=0;
if($res!=null){
        while ($row=mysql_fetch_row($res)) {
            ?>
            <tr>
                <td><?php echo utf8_encode($row[1]);  ?></td>
                <td><?php echo utf8_encode($row[2]);  ?></td>
                <td><?php echo utf8_encode($row[3]);  ?></td>
            </tr>
            <?php
            $cont++;
            if(($row=mysql_fetch_row($res))){
            ?>
            <tr class="alt">
                <td><?php echo utf8_encode($row[1]);  ?></td>
                <td><?php echo utf8_encode($row[2]);  ?></td>
                <td><?php echo utf8_encode($row[3]);  ?></td>
            </tr>
            <?php
            $cont++;
            }
        }
    }
echo "<tr><td colspan='4'> total: ".$cont."<td><tr>";
    } else {
        header("location:salir.php");
    }
} else {
    header("location:salir.php");
}
?>
