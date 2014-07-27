
<?php
include_once('cabecera.php');
?>
<h2>Registrar pago con Voucher</h2>
<section class="cuerpo">
    <section class="registro">
        <div class="mensaje" id="msjvou">Registro grabado</div>
        <form id="formRegVoucher">
            <b>Registrar Voucher</b>
            <table >
                <tr>
                    <td><label for="idDocvou" class="etiqueta">*ID Documento de Pago (DNI):</label></td>
                    <td><input id="idDocvou" name="idDocvou" type="text" required="required"></td>
                </tr>
                <tr>
                    <td><label for="nroOpvou" class="etiqueta">*nroOp:</label></td>
                    <td><input id="nroOpvou" name="nroOpvou" type="number" required="required"></td>
                </tr>
                <tr>
                    <td><label for="fechVou" class="etiqueta">*fecha voucher: </label></td>
                    <td><input id="fechVou" name="fechVou" type="date" required="required"></td>
                </tr>
                <tr>
                    <td>Agente<input type="radio" name="boolAgenvou" value="1" checked ></td>
                    <td>Ventanilla<input type="radio" name="boolAgenvou" value="0"></td>
                </tr>
                <tr>
                    <td><label for="nomAgenvou" class="etiqueta">*nombre - tra: </label></td>
                    <td><input id="nomAgenvou" name="nomAgenvou" type="text" required="required"></td>
                </tr>
                <tr>
                    <td><label for="montoVou" class="etiqueta">*monto: </label></td>
                    <td><input id="montoVou" name="montoVou" type="number" required="required"></td>
                </tr>
                <tr>
                    <td>Individual<input type="radio" name="boolmultiplevou" value="0" checked ></td>
                    <td>Múltiple<input type="radio" name="boolmultiplevou" value="1"></td>
                </tr>
                <tr>
                    <td><label for="imgVou" class="etiqueta">*imagen: </label></td>
                    <td><input id="imgVou" name="imgVou" type="text"></td>
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
            <table id="tabVouxID">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>nroOp</th>
                        <th>fecha</th>
                        <th>nombre</th>
                        <th>monto</th>
                        <th>imagen</th>
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
                    </tr>
                    <tr  class="alt">
                        <td>72887025</td>
                        <td>124353</td>
                        <td>23-12-2014</td>
                        <td>servicios libreria</td>
                        <td>S/.100</td>
                        <td>72881025</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="buscarUni">
            Buscar por nroOP:                    
        </div>                
        <div class="datagrid">
            <table id="tabVouxNOP">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>nroOp</th>
                        <th>fecha</th>
                        <th>nombre</th>
                        <th>monto</th>
                        <th>imagen</th>
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
                    </tr>
                    <tr  class="alt">
                        <td>72887025</td>
                        <td>124353</td>
                        <td>23-12-2014</td>
                        <td>servicios libreria</td>
                        <td>S/.100</td>
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
        <div class="mensaje" id="msjpervou">Registro grabado</div>
        <form id="formRegPersonaVou">
            <b>Registrar Persona</b>
            <table >
                <tr>
                    <td><label for="DNIvou" class="etiqueta">*DNI:</label></td>
                    <td><input id="DNIvou" name="DNIvou" type="number" required="required"></td>
                </tr>
                <tr>
                    <td><label for="apePatvou" class="etiqueta">*Apellido Paterno: </label></td>
                    <td><input id="apePatvou" name="apePatvou" type="text" required="required"></td>
                </tr>
                <tr>
                    <td><label for="apeMatvou" class="etiqueta">*Apellido Materno: </label></td>
                    <td><input id="apeMatvou" name="apeMatvou" type="text" required="required"></td>
                </tr>
                <tr>
                    <td><label for="nomPervou" class="etiqueta">*Nombre completo:</label></td>
                    <td><input id="nomPervou" name="nomPervou" type="text" required="required"></td>
                </tr>
                <tr>
                    <td><label for="emailPervou" class="etiqueta">email: </label></td>
                    <td><input id="emailPervou" name="emailPervou" type="email"></td>
                </tr>
                <tr>
                    <td><label for="depPervou" class="etiqueta">Departamento uni: </label></td>
                    <td>
                        <select id="depPervou" name="depPervou">
                            <option value="0">-Seleccionar Departamento-</option>

                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label for="uniPervou" class="etiqueta">Universidad: </label></td>
                    <td>
                        <select id="uniPervou" name="uniPervou">
                            <option value="0">-Seleccionar Universidad-</option>

                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label for="codUnivou" class="etiqueta">codigoUni: </label></td>
                    <td><input id="codUnivou" name="codUnivou" type="text"></td>
                </tr>                                           
                <tr>
                    <td colspan="2"><input type="submit" value="Grabar" ></td>
                </tr>
            </table>
        </form>
    </section>
    <section class="lista">
        <div class="buscarUni">
            Buscar por DNI:                    
        </div>                
        <div class="datagrid">
            <table id="tabPervou">
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Ape Paterno</th>
                        <th>Ape Materno</th>
                        <th>email</th>
                        <th>Universidad</th>
                        <th>codigoUni</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>



    </section>
    <div class="clear"></div>
</section>
<section class="cuerpo">
    <section class="registro">
        <div class="mensaje" id="msjmatvou">Registro grabado</div>
        <form id="formRegMatrVouch">
            <b>Registrar Matrícula</b>
            <table id="tabMatvou">
                <tr>
                    <td><label for="DNImatvou" class="etiqueta">DNI persona:</label></td>
                    <td><input id="DNImatvou" name="DNImatvou" type="number" required="required"></td>
                </tr>
                <tr>
                    <td><label for="docmatvou" class="etiqueta">Doc pago(dni):</label></td>
                    <td><input id="docmatvou" name="docmatvou" type="text" required="required"></td>
                </tr>
                <tr>
                    <td colspan="2"><input type="submit" value="Grabar"></td>
                </tr>
            </table>
            <input type="hidden" id="multiplematvou" class="multiplematvou" value="0">
        </form>
    </section>
    <section class="lista">
        <div class="buscarUni">
            Buscar por DNI:                    
        </div>                
        <div class="datagrid">
            <table id="tabMatvouxDNI">
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Ape Paterno</th>
                        <th>Ape Materno</th>
                        <th>Documento</th>
                        <th>nroOP</th>
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
                        <td>S/.100</td>
                        <td>72881025</td>
                    </tr>
                    <tr class="alt">
                        <td>72887025</td>
                        <td>dsadas</td>
                        <td>124353</td>
                        <td>23-12-2014</td>
                        <td>servicios libreria</td>
                        <td>S/.100</td>
                        <td>72881025</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="buscarUni">
            Buscar por codigo Documento :                    
        </div>                
        <div class="datagrid">
            <table id="tabMatvouxDoc">
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Ape Paterno</th>
                        <th>Ape Materno</th>
                        <th>Documento</th>
                        <th>nroOP</th>
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
                        <td>S/.100</td>
                        <td>72881025</td>
                    </tr>
                    <tr class="alt">
                        <td>72887025</td>
                        <td>dsadas</td>
                        <td>124353</td>
                        <td>23-12-2014</td>
                        <td>servicios libreria</td>
                        <td>S/.100</td>
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
