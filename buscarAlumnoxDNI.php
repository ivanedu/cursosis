<?php
session_start();
include_once 'conexion.php';
$cn = new conexion();
if (isset($_SESSION["validado"])) {
    $cn->conectar('congresodb');
    $DNIvou = mysql_real_escape_string(trim($_REQUEST['DNIvou']));
    if ($_SESSION["validado"] == "si") {
        if ($DNIvou > 9999999 && $DNIvou < 100000000) {
            
            $sql = "SELECT * FROM persona inner join universidad on persona.universidad_iduniversidad=universidad.universidad_iduniversidad where persona.dni=" . $DNIvou . " order by persona.ape_paterno asc";

            $res = $cn->consulta($sql);

            $cont = 0;
            if ($res != null) {
                while ($row = mysql_fetch_row($res)) {
                    ?>
                    <tr>
                        <td><?php echo utf8_encode($row[0]); ?></td>
                        <td><?php echo utf8_encode($row[1]); ?></td>
                        <td><?php echo utf8_encode($row[2]); ?></td>
                        <td><?php echo utf8_encode($row[3]); ?></td>
                        <td><?php echo utf8_encode($row[2]); ?></td>
                        <td><?php echo utf8_encode($row[2]); ?></td>
                        <td><?php echo utf8_encode($row[2]); ?></td>
                    </tr>
                    <?php
                    $cont++;
                    if (($row = mysql_fetch_row($res))) {
                        ?>
                        <tr class="alt">
                            <td><?php echo utf8_encode($row[1]); ?></td>
                            <td><?php echo utf8_encode($row[2]); ?></td>
                            <td><?php echo utf8_encode($row[3]); ?></td>
                        </tr>
                        <?php
                        $cont++;
                    }
                }
            }
        }
        echo "<tr><td colspan='4'> total: " . $cont . "<td><tr>";
    } else {
        header("location:salir.php");
    }
} else {
    header("location:salir.php");
}
?>
