
<?php
include_once 'cabecera.php';
?>
<section class="cuerpo">
    <section class="registro">
        <div class="mensaje" id="msjUni">Registro grabado</div>
        <form id="formRegUniversidad" >
            GRABAR UNIVERSIDAD
            <table >
                <tr>
                    <td><label for="nomUni" class="etiqueta">Nombre: </label></td>
                    <td><input id="nomUni" name="nomUni" type="text" required="required"></td>
                </tr>
                <tr>
                    <td><label for="abrevUni" class="etiqueta">Abreviación: </label></td>
                    <td><input id="abrevUni" name="abrevUni" type="text" required="required"></td>
                </tr>
                <tr>
                    <td><label for="dirUni" class="etiqueta">Dirección: </label></td>
                    <td><input id="dirUni" name="dirUni" type="text" required="required"></td>
                </tr>
                <tr>
                    <td><label for="depUni" class="etiqueta">Departamento: </label></td>
                    <td>
                        <select id="depUni" name="depUni">
                            <option value="0">-Seleccionar Departamento-</option>

                        </select>
                    </td>
                </tr>
                <tr>
                    <td colspan="2"><input type="submit" value="Grabar"></td>
                </tr>
            </table>
        </form>
    </section>
    <section class="lista">
                        
        <div class="datagrid">
            UNIVERSIDADES - EJEMPLO
            <table >
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Abreviación</th>
                        <th>Dirección</th>
                        <th>Departamento</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Universidad Nacional de Trujillo - Trujillo</td>
                        <td>UNT-Trujillo</td>
                        <td>Av. Juan Pablo II S/N Ciudad universitaria - Trujillo</td>
                        <td>La libertat-Perú</td>
                    </tr>
                </tbody>
            </table>
        </div><br>
        <div class="buscarUni">
            Buscar por departamento (seleccionar en el comboBox del formulario) :
            
        </div>
        <div class="datagrid">
            UNIVERSIDADES
            <table id="tabUni">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Abreviación</th>
                        <th>Dirección</th>
                        
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    </section>
    <div class="clear"></div>
</section>
</body>
</html>
