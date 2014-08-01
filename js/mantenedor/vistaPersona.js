function getVistaPersona() {
    var ventanaPopupRegistroPersona;
    var ventanaPopupEdicionPersona;
    var formularioRegistroPersona;
    var formularioEdicionPersona;

    personaMascaraPersona = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Persona : Store Persona..."});
    personaMascaraUniversidad = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Universidad : Store PersonaUniversidad..."});
    personaMascaraUniveridadRender = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando UniversidadRender : Store PersonaUniversidadRender..."});


    personaCargadoInicial();

    var gridPersona = new Ext.grid.GridPanel({
        title: 'Persona',
        store: personaStorePersona,
        border: false,
        stripeRows: true,
        itemSelector: true,
        height: 400,
        tbar: [{
                text: 'Registrar',
                tooltip: 'Registrar Persona',
                iconCls: 'add',
                handler: function() {
                    abrirFormularioRegistroPersona();
                    ventanaPopupRegistroPersona.show();
                }
            }/*, '-', {
             ref: '../btnEditarRelacion',
             text: 'Editar',
             tooltip: 'Editar Relacion',
             iconCls: 'edit',
             disabled: true,
             listeners: {
             click: function() {
             var seleccionFila = gridPersona.getSelectionModel().getSelections();
             if (seleccionFila.length <= 0) {
             verMessageBoxAdvertencia("Debes seleccionar una fila");
             } else {
             abrirFormularioEdicionPersona();
             Ext.getCmp('paramedi_perId').setValue(seleccionFila[0].get('param_relId'));
             Ext.getCmp('paramedi_perNombre').setValue(seleccionFila[0].get('param_perIdRelacionador'));
             Ext.getCmp('paramedi_per').setValue(seleccionFila[0].get('param_perIdRelacionado'));
             Ext.getCmp('paramedi_tiprelId').setValue(seleccionFila[0].get('param_tiprelId'));
             ventanaPopupEdicionRelacion.show();
             }
             }
             }
             }, '-', {
             ref: '../btnEliminarRelacion',
             text: 'Eliminar',
             tooltip: 'Eliminar Relacion',
             iconCls: 'remove',
             disabled: true,
             listeners: {
             click: function() {
             var seleccionFila = gridRelacion.getSelectionModel().getSelections();
             if (seleccionFila.length <= 0) {
             verMessageBoxAdvertencia("Debes seleccionar una fila");
             } else {
             guardarEliminacionRelacion(seleccionFila[0].get('param_relId'), seleccionFila[0].get('param_perIdRelacionador'));
             }
             }
             }
             }*/
        ],
        bbar: new Ext.PagingToolbar({
            store: personaStorePersona,
            displayInfo: true,
            autoWidth: true,
            beforePageText: 'Página',
            afterPageText: 'de {0}',
            displayMsg: '{0} - {1} de {2} Personas',
            emptyMsg: 'No hay Personas para mostrar',
            pageSize: 10
        }),
        columns:
                [new Ext.grid.RowNumberer(),
                    {
                        header: 'DNI',
                        dataIndex: 'param_dni',
                        sortable: true,
                        width: 50
                    }, {
                        header: 'Nombre',
                        dataIndex: 'param_nombre',
                        sortable: true,
                        width: 150
                    }, {
                        header: 'Apellido Paterno',
                        dataIndex: 'param_ape_paterno',
                        sortable: true,
                        width: 150
                    }, {
                        header: 'Apellido Materno',
                        dataIndex: 'param_ape_materno',
                        sortable: true,
                        width: 150
                    }, {
                        header: 'Universidad',
                        dataIndex: 'param_idUNIVERSIDAD',
                        sortable: true,
                        //hidden:true,
                        width: 150,
                        renderer: function(val) {
                            var records = personaStoreUniversidadRender.getRange();
                            var valor = '';
                            for (var i = 0; i < records.length; i++) {
                                if (records[i].get('param_idUNIVERSIDAD') == val) {
                                    valor = records[i].get('param_nombre');
                                    break;
                                }
                            }
                            return valor;
                        }
                    }],
        selModel: new Ext.grid.RowSelectionModel({singleSelect: true})
    });

    function abrirFormularioRegistroPersona()
    {
        var paramtpl_idUniversidad = new Ext.XTemplate('<tpl for="."><div class="search-item"><div class="name">{param_nombre}</div></div></tpl>');
        var paramreg_idUniversidad = new Ext.form.ComboBox({
            id: 'paramreg_idUniversidad',
            fieldLabel: '<span>Universidad</span><span style="color:red;font-weight:bold">*</span>',
            store: personaStoreUniversidad,
            valueField: 'param_idUNIVERSIDAD',
            displayField: 'param_nombre',
            emptyText: 'Seleccione...',
            forceSelection: true,
            autoScroll: true,
            allowBlank: false,
            triggerAction: 'all',
            width: 180,
            maxHeight: 100,
            minChars: 1,
            tpl: paramtpl_idUniversidad,
            itemSelector: 'div.search-item',
        });
        var paramreg_dni = new Ext.form.NumberField({
            fieldLabel: '<span>Dni</span><span style="color:red;font-weight:bold">*</span>',
            id: 'paramreg_dni',
            width: '150',
            allowBlank: false,
            enableKeyEvents: true,
            maxLength:8,
            minLength:8,
            maxLengthText:'Max 8 dígitos',
            minLengthText:'min 8 dígitos',
            listeners: {
                keypress: function(my, evt) {
                    if (evt.getKey() == evt.ENTER)
                    {
                        guardarRegistroPersona();
                    }
                }
            }
        });
        var paramreg_nombre = new Ext.form.TextField({
            fieldLabel: '<span>Nombre</span><span style="color:red;font-weight:bold">*</span>',
            id: 'paramreg_nombre',
            width: '150',
            allowBlank: false,
            enableKeyEvents: true,
            maxLength:30,
            minLength:3,
            maxLengthText:'Max 30 caracteres',
            minLengthText:'min 3 caracteres',
            listeners: {
                keypress: function(my, evt) {
                    if (evt.getKey() == evt.ENTER)
                    {
                        guardarRegistroPersona();
                    } else {
                        var ascii = evt.getKey();
                        if (!((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122) || ascii == evt.SPACE || ascii == evt.DELETE) || ascii == 46)
                        {
                            evt.stopEvent();
                        }
                    }
                }
            }
        });
        var paramreg_ape_paterno = new Ext.form.TextField({
            fieldLabel: '<span>Apellido Paterno</span><span style="color:red;font-weight:bold">*</span>',
            id: 'paramreg_ape_paterno',
            width: '150',
            allowBlank: false,
            enableKeyEvents: true,
            maxLength:30,
            minLength:3,
            maxLengthText:'Max 30 caracteres',
            minLengthText:'min 3 caracteres',
            listeners: {
                keypress: function(my, evt) {
                    if (evt.getKey() == evt.ENTER)
                    {
                        guardarRegistroPersona();
                    } else {
                        var ascii = evt.getKey();
                        if (!((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122) || ascii == evt.SPACE || ascii == evt.DELETE) || ascii == 46)
                        {
                            evt.stopEvent();
                        }
                    }
                }
            }
        });
        var paramreg_ape_materno = new Ext.form.TextField({
            fieldLabel: '<span>Apellido Materno</span><span style="color:red;font-weight:bold">*</span>',
            id: 'paramreg_ape_materno',
            width: '150',
            allowBlank: false,
            enableKeyEvents: true,
            maxLength:30,
            minLength:3,
            maxLengthText:'Max 30 caracteres',
            minLengthText:'min 3 caracteres',
            listeners: {
                keypress: function(my, evt) {
                    if (evt.getKey() == evt.ENTER)
                    {
                        guardarRegistroPersona();
                    } else {
                        var ascii = evt.getKey();
                        if (!((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122) || ascii == evt.SPACE || ascii == evt.DELETE) || ascii == 46)
                        {
                            evt.stopEvent();
                        }
                    }
                }
            }
        });
        var paramreg_email = new Ext.form.TextField({
            fieldLabel: '<span>Email</span><span style="color:red;font-weight:bold">*</span>',
            id: 'paramreg_email',
            width: '150',
            allowBlank: false,
            enableKeyEvents: true,
            maxLength:30,
            minLength:0,
            maxLengthText:'Max 30 caracteres',
            minLengthText:'min 0 caracteres',
            listeners: {
                keypress: function(my, evt) {
                    if (evt.getKey() == evt.ENTER)
                    {
                        guardarRegistroPersona();
                    } else {
                        var ascii = evt.getKey();
                        if (!((ascii >= 64 && ascii <= 90)||(ascii >= 48 && ascii <= 57) ||(ascii>=45 && ascii<=46)|| (ascii==95) || (ascii >= 97 && ascii <= 122) || ascii == evt.SPACE || ascii == evt.DELETE) || ascii == 46)
                        {
                            evt.stopEvent();
                        }
                    }
                }
            }
        });
        var paramreg_telefono = new Ext.form.TextField({
            fieldLabel: '<span>Telefono</span><span style="color:red;font-weight:bold">*</span>',
            id: 'paramreg_telefono',
            width: '150',
            allowBlank: false,
            enableKeyEvents: true,
            maxLength:30,
            minLength:0,
            maxLengthText:'Max 30 caracteres',
            minLengthText:'min 0 caracteres',
            listeners: {
                keypress: function(my, evt) {
                    if (evt.getKey() == evt.ENTER)
                    {
                        guardarRegistroPersona();
                    } else {
                        var ascii = evt.getKey();
                        if (!((ascii >= 48 && ascii <= 57) ||(ascii==35)|| (ascii==42) || (ascii==45) || ascii == evt.SPACE || ascii == evt.DELETE) || ascii == 46)
                        {
                            evt.stopEvent();
                        }
                    }
                }
            }
        });
        var paramreg_codigoUni = new Ext.form.NumberField({
            fieldLabel: '<span>Codigo Universitario</span><span style="color:red;font-weight:bold">*</span>',
            id: 'paramreg_codigoUni',
            width: '150',
            allowBlank: false,
            enableKeyEvents: true,
            maxLength:20,
            minLength:5,
            maxLengthText:'Max 20 dígitos',
            minLengthText:'min 5 dígitos',
            listeners: {
                keypress: function(my, evt) {
                    if (evt.getKey() == evt.ENTER)
                    {
                        guardarRegistroPersona();
                    }
                }
            }
        });
        var paramreg_direccion = new Ext.form.TextField({
            fieldLabel: '<span>Direccion</span><span style="color:red;font-weight:bold">*</span>',
            id: 'paramreg_direccion',
            width: '150',
            allowBlank: false,
            enableKeyEvents: true,
            maxLength:50,
            minLength:0,
            maxLengthText:'Max 50 caracteres',
            minLengthText:'min 0 caracteres',
            listeners: {
                keypress: function(my, evt) {
                    if (evt.getKey() == evt.ENTER)
                    {
                        guardarRegistroPersona();
                    } else {
                        var ascii = evt.getKey();
                        if (!((ascii >= 65 && ascii <= 90)||(ascii >= 48 && ascii <= 57) ||(ascii>=45 && ascii<=46)|| (ascii==95) || (ascii >= 97 && ascii <= 122) || ascii == evt.SPACE || ascii == evt.DELETE) || ascii == 46)
                        {
                            evt.stopEvent();
                        }
                    }
                }
            }
        });
        formularioRegistroPersona = new Ext.form.FormPanel({
            border: false,
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [
                paramreg_idUniversidad,
                paramreg_dni,
                paramreg_nombre,
                paramreg_ape_paterno,
                paramreg_ape_materno,
                paramreg_email,
                paramreg_telefono,
                paramreg_codigoUni,
                paramreg_direccion
            ],
            buttons: [{
                    text: 'Guardar',
                    iconCls: 'aceptar',
                    handler: function() {
                        guardarRegistroPersona();
                    }
                }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    handler: function() {
                        ventanaPopupRegistroPersona.close();
                    }
                }]
        });
        var panelRegistroPersona = new Ext.Panel({
            labelAlign: 'top',
            border: false,
            items: formularioRegistroPersona
        });
        ventanaPopupRegistroPersona = new Ext.Window({
            title: 'Registro Persona',
            closable: false,
            modal: true,
            width: 350,
            constrain: true,
            resizable: false,
            items: panelRegistroPersona
        });
    }

    var panelPersona = new Ext.Panel({
        layout: 'fit',
        border: false,
        items: [
            gridPersona
        ]
    });

    return panelPersona;
}
;
