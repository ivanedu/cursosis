
<?php
include_once('cabecera.php');
?>
<h2>Registrar pago con Boleta a la comisión de contabilidad</h2>
<section class="cuerpo">
    <section class="registro">
        <div class="mensaje" id="msjbol">Registro grabado</div>
        <form id="formRegBoleta">
            <b>Registrar Boleta</b>
            <table id="tabBol">
                <tr>
                    <td><label for="idDocebol" class="etiqueta">ID Documento de Pago (DNI):</label></td>
                    <td><input id="idDocebol" name="idDocebol" type="number" required="required"></td>
                </tr>
                <tr>
                    <td><label for="nrocombol" class="etiqueta">nroComprobante:</label></td>
                    <td><input id="nrocombol" name="nrocombol" type="text" ></td>
                </tr>
                <tr>
                    <td><label for="fechebol" class="etiqueta">fecha pago: </label></td>
                    <td><input id="fechebol" name="fechebol" type="date" ></td>
                </tr>
                <tr>
                    <td><label for="montoebol" class="etiqueta">monto: </label></td>
                    <td><input id="montoebol" name="montoebol" type="number" ></td>
                </tr>                                       
                <tr>
                    <td colspan="2"><input type="submit" value="Grabar"></td>
                </tr>
            </table>
        </form>
    </section>
    <section class="lista">
        <div class="buscarUni">
            Buscar por ID:                    
        </div>                
        <div class="datagrid">
            <table id="tabBol" >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>nro comprobante</th>
                        <th>fecha</th>
                        <th>monto</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>72887025</td>
                        <td>124353</td>
                        <td>23-12-2014</td>
                        <td>S/.100</td>
                    </tr>
                    <tr  class="alt">
                        <td>72887025</td>
                        <td>124353</td>
                        <td>23-12-2014</td>
                        <td>S/.100</td>
                    </tr>
                </tbody>
            </table>
        </div>

        
    </section>
    <div class="clear"></div>
</section>
<section class="cuerpo">
    <section class="registro">
        <div class="mensaje" id="msjperbol">Registro grabado</div>
        <form id="formRegPersonaBol">
            <b>Registrar Persona</b>
            <table >
                <tr>
                    <td><label for="DNIBol" class="etiqueta">DNI:</label></td>
                    <td><input id="DNIBol" name="DNIBol" type="number" required="required"></td>
                </tr>
                <tr>
                    <td><label for="nomPerBol" class="etiqueta">Nombre completo:</label></td>
                    <td><input id="nomPerBol" name="nomPerBol" type="text" required="required"></td>
                </tr>
                <tr>
                    <td><label for="apePatBol" class="etiqueta">Apellido Paterno: </label></td>
                    <td><input id="apePatBol" name="apePatBol" type="text" required="required"></td>
                </tr>
                <tr>
                    <td><label for="apeMatBol" class="etiqueta">Apellido Materno: </label></td>
                    <td><input id="apeMatBol" name="apeMatBol" type="text" required="required"></td>
                </tr>
                <tr>
                    <td><label for="emailPerBol" class="etiqueta">email: </label></td>
                    <td><input id="emailPerBol" name="emailPerBol" type="email"></td>
                </tr>
                <tr>
                    <td><label for="telPerBol" class="etiqueta">teléfono: </label></td>
                    <td><input id="telPerBol" name="telPerBol" type="text"></td>
                </tr>
                <tr>
                    <td><label for="depPervbol" class="etiqueta">Departamento uni: </label></td>
                    <td>
                        <select id="depPervbol" name="depPervbol">
                            <option value="0">-Seleccionar Departamento-</option>

                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label for="uniPerBol" class="etiqueta">Universidad: </label></td>
                    <td>
                        <select id="uniPerBol" name="uniPerBol">
                            <option value="0">-Seleccionar Universidad-</option>

                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label for="codUniBol" class="etiqueta">codigoUni: </label></td>
                    <td><input id="codUniBol" name="codUniBol" type="text"></td>
                </tr>
                <tr>
                    <td><label for="dirPerBol" class="etiqueta">dirección: </label></td>
                    <td><input id="dirPerBol" name="dirPerBol" type="text"></td>
                </tr>                                           
                <tr>
                    <td colspan="2"><input type="submit" value="Grabar"></td>
                </tr>
            </table>
        </form>
    </section>
    <section class="lista">
        <div class="buscarUni">
            Buscar por DNI:                    
        </div>                
        <div class="datagrid">
            <table id="tabPerBol">
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Ape Paterno</th>
                        <th>Ape Materno</th>
                        <th>email</th>
                        <th>telf</th>
                        <th>Universidad</th>
                        <th>codigoUni</th>
                        <th>dirección</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>72887025</td>
                        <td>124353</td>
                        <td>23-12-2014</td>
                        <td>servicios libreria</td>
                        <td>S/.100</td>
                        <td>72881025</td>
                        <td>72881025</td>
                        <td>72881025</td>
                        <td>72881025</td>
                    </tr>
                    <tr  class="alt">
                        <td>72887025</td>
                        <td>124353</td>
                        <td>23-12-2014</td>
                        <td>servicios libreria</td>
                        <td>S/.100</td>
                        <td>72881025</td>
                        <td>72881025</td>
                        <td>72881025</td>
                        <td>72881025</td>

                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    <div class="clear"></div>
</section>
<section class="cuerpo">
    <section class="registro">
        <div class="mensaje" id="msjmatbol">Registro grabado</div>
        <form id="formRegMatrBol">
            <b>Registrar Matrícula</b>
            <table >
                <tr>
                    <td><label for="DNImatvouBol" class="etiqueta">DNI persona:</label></td>
                    <td><input id="DNImatvouBol" name="DNImatvouBol" type="number" required="required"></td>
                </tr>
                <tr>
                    <td><label for="docmatBol" class="etiqueta">Doc pago(dni):</label></td>
                    <td><input id="docmatBol" name="docmatBol" type="text" required="required"></td>
                </tr>
                <tr>
                    <td colspan="2"><input type="submit" value="Grabar"></td>
                </tr>
            </table>
        </form>
    </section>
    <section class="lista">
        <div class="buscarUni">
            Buscar por DNI:                    
        </div>                
        <div class="datagrid">
            <table id="tabMatBol">
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Ape Paterno</th>
                        <th>Ape Materno</th>
                        <th>Documento</th>
                        <th>fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>72887025</td>
                        <td>dsadas</td>
                        <td>124353</td>
                        <td>23-12-2014</td>
                        <td>servicios libreria</td>                        
                        <td>72881025</td>
                    </tr>
                    <tr class="alt">
                        <td>72887025</td>
                        <td>dsadas</td>
                        <td>124353</td>
                        <td>23-12-2014</td>
                        <td>servicios libreria</td>
                        <td>72881025</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    <div class="clear"></div>
</section>
</body>
</html>
<script src="js/pagoContabilidad.js">
</script>