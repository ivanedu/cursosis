<?php
session_start();
include_once 'conexion.php';
$cn = new conexion();
if (isset($_SESSION["validado"])) {
    if ($_SESSION["validado"] == "si") {

        $cn->conectar('congresodb');
        $sql = "SELECT * FROM departamento order by nombre asc";
        $res = $cn->consulta($sql);
        ?>
        <option value="0">-Seleccionar Departamento-</option>

        <?php
        if ($res != null) {
            while (($row = mysql_fetch_row($res)) != null) {
                ?>
                <option value="<?php echo $row[0]; ?>"> <?php echo utf8_encode($row[1] . ' - ' . $row[2]); ?></option>
                <?php
            }
        }
    } else {
        header("location:salir.php");
    }
} else {
    header("location:salir.php");
}
?>