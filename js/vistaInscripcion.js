function getVistaInscripcion() {
    var ventanaPopupBuscarInscripcion;

    inscripcionMascaraInscripcion = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Inscripcion : Store Inscripcion..."});
    inscripcionMascaraUniversidad = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Universidad : Store InscripcionUniversidad..."});
    inscripcionMascaraUniveridadRender = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando UniversidadRender : Store InscripcionUniversidadRender..."});
    inscripcionMascaraDepartamento = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Departamento : Store InscripcionDepartamento..."});
    inscripcionMascaraPersona = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Persona : Store InscripcionPersona..."});
    inscripcionCargadoInicial();

    function ins_limpiar(){
        ins_nombre.reset();
        ins_ape_paterno.reset();
        ins_ape_materno.reset();
        ins_email.reset();
        ins_telefono.reset();
        ins_tipo_estudiante.reset();
        ins_tipo_profesional.reset();
        ins_codigoUni.reset();
        ins_idUniversidad.reset();
        ins_idDepartamento.reset();
        ins_direccion.reset();
    }
    function ins_buscarPorDni(){
        ins_limpiar();
        formularioVistaInscripcion.getForm().load({
            url: 'controlador/controladorInscripcion.php',
            waitMsg: 'Cargando...',
            params: {
                opcion: "buscarPorDni",
                dni: ins_dni.getValue()
            }
        });
    }
    function ins_buscarPorNombre(){
        formularioVistaInscripcion.getForm().load({
            url: 'controlador/controladorInscripcion.php',
            waitMsg: 'Cargando...',
            params: {
                opcion: "buscarPorNombre",
                nombre: ins_nombre2.getValue(),
                ape_patterno: ins_ape_paterno2.getValue()
            }
        });
    }
    var ins_dni = new Ext.form.NumberField({
        fieldLabel: '<span>Dni</span><span style="color:red;font-weight:bold">*</span>',
        id: 'ins_dni',
        width: 150,
        allowBlank: false,
        enableKeyEvents: true,
        maxLength: 8,
        minLength: 8,
        maxLengthText: 'Max 8 dígitos',
        minLengthText: 'min 8 dígitos',
        listeners: {
            keypress: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    ins_buscarPorDni();
                }
            }
        }
    });
    var ins_btnBuscar = new Ext.Button({
        id: 'ins_btnBuscar',
        width: 100,
        iconCls: 'search',
        iconAlign: 'left',
        text: 'Buscar',
        listeners: {
            click: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    //
                }
            }
        },
        handler: function() {
            abrirFormularioBuscarInscripcion();
            ventanaPopupBuscarInscripcion.show();
        }
    });
    var ins_btnIncorrecto = new Ext.Button({
        id: 'ins_btnIncorrecto',
        width: 100,
        iconCls: 'delete',
        iconAlign: 'left',
        text: 'Incorrecto',
        listeners: {
            click: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    //
                }
            }
        }
    });
    var ins_nombre = new Ext.form.TextField({
        fieldLabel: '<span>Nombre</span><span style="color:red;font-weight:bold">*</span>',
        id: 'ins_nombre',
        width: '150',
        allowBlank: false,
        enableKeyEvents: true,
        maxLength: 30,
        minLength: 3,
        maxLengthText: 'Max 30 caracteres',
        minLengthText: 'min 3 caracteres',
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
    var ins_ape_paterno = new Ext.form.TextField({
        fieldLabel: '<span>Apellido Paterno</span><span style="color:red;font-weight:bold">*</span>',
        id: 'ins_ape_paterno',
        width: '150',
        allowBlank: false,
        enableKeyEvents: true,
        maxLength: 30,
        minLength: 3,
        maxLengthText: 'Max 30 caracteres',
        minLengthText: 'min 3 caracteres',
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
    var ins_ape_materno = new Ext.form.TextField({
        fieldLabel: '<span>Apellido Materno</span><span style="color:red;font-weight:bold">*</span>',
        id: 'ins_ape_materno',
        width: '150',
        allowBlank: false,
        enableKeyEvents: true,
        maxLength: 30,
        minLength: 3,
        maxLengthText: 'Max 30 caracteres',
        minLengthText: 'min 3 caracteres',
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
    var ins_email = new Ext.form.TextField({
        fieldLabel: '<span>Email</span><span style="color:red;font-weight:bold"></span>',
        id: 'ins_email',
        width: '150',
        //allowBlank: false,
        enableKeyEvents: true,
        maxLength: 30,
        minLength: 0,
        maxLengthText: 'Max 30 caracteres',
        minLengthText: 'min 0 caracteres',
        listeners: {
            keypress: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    guardarRegistroPersona();
                } else {
                    var ascii = evt.getKey();
                    if (!((ascii >= 64 && ascii <= 90) || (ascii >= 48 && ascii <= 57) || (ascii >= 45 && ascii <= 46) || (ascii == 95) || (ascii >= 97 && ascii <= 122) || ascii == evt.SPACE || ascii == evt.DELETE) || ascii == 46)
                    {
                        evt.stopEvent();
                    }
                }
            }
        }
    });
    var ins_telefono = new Ext.form.TextField({
        fieldLabel: '<span>Telefono</span><span style="color:red;font-weight:bold"></span>',
        id: 'ins_telefono',
        width: '150',
        //allowBlank: false,
        enableKeyEvents: true,
        maxLength: 30,
        minLength: 0,
        maxLengthText: 'Max 30 caracteres',
        minLengthText: 'min 0 caracteres',
        listeners: {
            keypress: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    guardarRegistroPersona();
                } else {
                    var ascii = evt.getKey();
                    if (!((ascii >= 48 && ascii <= 57) || (ascii == 35) || (ascii == 42) || (ascii == 45) || ascii == evt.SPACE || ascii == evt.DELETE) || ascii == 46)
                    {
                        evt.stopEvent();
                    }
                }
            }
        }
    });
    var ins_tipo_estudiante = new Ext.form.Radio({
        boxLabel: 'Estudiante',
        width: 150,
        name: 'tipo',
        checked: true,
        inputValue: 0
    });
    var ins_tipo_profesional = new Ext.form.Radio({
        boxLabel: 'Profesional',
        width: 150,
        name: 'tipo',
        inputValue: 1
    });
    var ins_tipo = new Ext.form.RadioGroup({
        fieldLabel: '<span>Tipo</span><span style="color:red;font-weight:bold">*</span>',
        id: 'ins_tipo',
        allowBlank: false,
        items: [
            ins_tipo_estudiante,
            ins_tipo_profesional
        ],
        listeners: {
            change: function(objeto, checked) {
                if (checked.getGroupValue() == 0) {
                    ins_direccion.setDisabled(true);
                    ins_codigoUni.setDisabled(false);
                } else {
                    ins_direccion.setDisabled(false);
                    ins_codigoUni.setDisabled(true);
                }
            }
        }
    });
    var ins_codigoUni = new Ext.form.NumberField({
        fieldLabel: '<span>Codigo Universitario</span><span style="color:red;font-weight:bold">*</span>',
        id: 'ins_codigoUni',
        width: '150',
        allowBlank: false,
        enableKeyEvents: true,
        maxLength: 20,
        minLength: 5,
        maxLengthText: 'Max 20 dígitos',
        minLengthText: 'min 5 dígitos',
        listeners: {
            keypress: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    guardarRegistroPersona();
                }
            }
        }
    });
    var ins_tpl_idUniversidad = new Ext.XTemplate('<tpl for="."><div class="search-item"><div class="name">{param_nombre}</div></div></tpl>');
    var ins_idUniversidad = new Ext.form.ComboBox({
        id: 'ins_idUniversidad',
        fieldLabel: '<span>Universidad</span><span style="color:red;font-weight:bold">*</span>',
        store: inscripcionStoreUniversidad,
        valueField: 'param_idUNIVERSIDAD',
        displayField: 'param_nombre',
        emptyText: 'Seleccione...',
        forceSelection: true,
        autoScroll: true,
        allowBlank: false,
        triggerAction: 'all',
        width: 160,
        maxHeight: 100,
        minChars: 1,
        tpl: ins_tpl_idUniversidad,
        itemSelector: 'div.search-item'
    });
    var ins_tpl_idDepartamento = new Ext.XTemplate('<tpl for="."><div class="search-item"><div class="name">{param_nombre}</div></div></tpl>');
    var ins_idDepartamento = new Ext.form.ComboBox({
        id: 'ins_idDepartamento',
        fieldLabel: '<span>Departamento</span><span style="color:red;font-weight:bold">*</span>',
        store: inscripcionStoreDepartamento,
        valueField: 'param_idDEPARTAMENTO',
        displayField: 'param_nombre',
        emptyText: 'Seleccione...',
        forceSelection: true,
        autoScroll: true,
        allowBlank: false,
        //disabled: true,
        triggerAction: 'all',
        width: 160,
        maxHeight: 100,
        minChars: 1,
        tpl: ins_tpl_idDepartamento,
        itemSelector: 'div.search-item',
        listeners: {
            select: function(combo, record, index) {
                ins_idUniversidad.clearValue();
                inscripcionStoreUniversidad.setBaseParam('idDEPARTAMENTO', record.get('param_idDEPARTAMENTO'));
                inscripcionStoreUniversidad.load();
            }
        }
    });
    var ins_direccion = new Ext.form.TextField({
        fieldLabel: '<span>Direccion</span><span style="color:red;font-weight:bold">*</span>',
        id: 'ins_direccion',
        width: '150',
        allowBlank: false,
        disabled: true,
        enableKeyEvents: true,
        maxLength: 50,
        minLength: 0,
        maxLengthText: 'Max 50 caracteres',
        minLengthText: 'min 0 caracteres',
        listeners: {
            keypress: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    guardarRegistroPersona();
                } else {
                    var ascii = evt.getKey();
                    if (!((ascii >= 65 && ascii <= 90) || (ascii >= 48 && ascii <= 57) || (ascii >= 45 && ascii <= 46) || (ascii == 95) || (ascii >= 97 && ascii <= 122) || ascii == evt.SPACE || ascii == evt.DELETE) || ascii == 46)
                    {
                        evt.stopEvent();
                    }
                }
            }
        }
    });
    function abrirFormularioBuscarInscripcion() {
        var ins_nombre2 = new Ext.form.TextField({
            fieldLabel: '<span>Nombre</span><span style="color:red;font-weight:bold">*</span>',
            id: 'ins_nombre2',
            width: '150',
            allowBlank: false,
            enableKeyEvents: true,
            maxLength: 30,
            minLength: 3,
            maxLengthText: 'Max 30 caracteres',
            minLengthText: 'min 3 caracteres',
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
        var ins_ape_paterno2 = new Ext.form.TextField({
            fieldLabel: '<span>Apellido Paterno</span><span style="color:red;font-weight:bold">*</span>',
            id: 'ins_ape_paterno2',
            width: '150',
            allowBlank: false,
            enableKeyEvents: true,
            maxLength: 30,
            minLength: 3,
            maxLengthText: 'Max 30 caracteres',
            minLengthText: 'min 3 caracteres',
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
        var ins_ape_materno2 = new Ext.form.TextField({
            fieldLabel: '<span>Apellido Materno</span><span style="color:red;font-weight:bold">*</span>',
            id: 'ins_ape_materno2',
            width: '150',
            allowBlank: false,
            enableKeyEvents: true,
            maxLength: 30,
            minLength: 3,
            maxLengthText: 'Max 30 caracteres',
            minLengthText: 'min 3 caracteres',
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
        var gridPersona = new Ext.grid.GridPanel({
            title: 'Persona',
            region: 'south',
            store: inscripcionStorePersona,
            border: false,
            stripeRows: true,
            itemSelector: true,
            height: 200,
            tbar: [
            ],
            bbar: new Ext.PagingToolbar({
                store: inscripcionStorePersona,
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
                            width: 60
                        }, {
                            header: 'Nombre',
                            dataIndex: 'param_nombre',
                            sortable: true,
                            width: 150
                        }, {
                            header: 'Apellido Paterno',
                            dataIndex: 'param_ape_paterno',
                            sortable: true,
                            width: 100
                        }, {
                            header: 'Apellido Materno',
                            dataIndex: 'param_ape_materno',
                            sortable: true,
                            width: 100
                        }, {
                            header: 'Universidad',
                            dataIndex: 'param_idUNIVERSIDAD',
                            sortable: true,
                            //hidden:true,
                            width: 200,
                             renderer: function(val) {
                             var records = inscripcionStoreUniversidadRender.getRange();
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
        var formularioBuscarInscripcion = new Ext.form.FormPanel({
            border: false,
            region: 'center',
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [
                {
                    border: false,
                    layout: 'column',
                    padding: '5px 0px 10px 5px',
                    items: [
                        {
                            border: false,
                            width: 250,
                            layout: 'form',
                            labelWidth: 110,
                            items: [ins_ape_paterno2]
                        }, {
                            border: false,
                            width: 250,
                            layout: 'form',
                            labelWidth: 110,
                            items: [ins_ape_materno2]
                        }
                    ]
                }, {
                    border: false,
                    layout: 'column',
                    padding: '5px 0px 20px 5px',
                    items: [
                        {
                            border: false,
                            width: 300,
                            layout: 'form',
                            labelWidth: 110,
                            items: [ins_nombre2]
                        }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [{
                    text: 'Buscar',
                    iconCls: 'search',
                    width: 100,
                    handler: function() {
                        ins_buscarPorNombre();
                    }
                }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    width: 100,
                    handler: function() {
                        //aqui
                        ventanaPopupBuscarInscripcion.close();
                    }
                }

            ]
        });
        /*var panelBuscarInscripcion = new Ext.Panel({
         labelAlign: 'top',
         border: false,
         items: panel
         });*/
        var panelBuscarInscripcion = new Ext.Panel({
            labelAlign: 'top',
            //border: false,
            bodyStyle: 'padding: 10px;',
            widthLabel: 100,
            width: 700,
            height: 400,
            title: 'Panek',
            layout: 'border',
            /*defaults: {
             split: true
             },*/
            items: [
                formularioBuscarInscripcion, gridPersona
            ]
        });
        ventanaPopupBuscarInscripcion = new Ext.Window({
            title: 'Buscar Inscripcion',
            closable: false,
            modal: true,
            width: 700,
            constrain: true,
            resizable: false,
            items: [panelBuscarInscripcion]
        });

    }
    var formularioVistaInscripcion = new Ext.form.FormPanel({
        title: 'Formulario Registro Inscripcion',
        padding: '10px 10px 10px 10px',
        labelAlign: 'left',
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            fields: [
                {
                    name: 'ins_nombre',
                    type: 'string',
                    mapping: 'nombre'
                }, {
                    name: 'ins_ape_paterno',
                    type: 'string',
                    mapping: 'ape_paterno'
                },{
                    name: 'ins_ape_materno',
                    type: 'string',
                    mapping: 'ape_materno'
                },{
                    name: 'ins_email',
                    type: 'string',
                    mapping: 'email'
                }, {
                    name: 'ins_telefono',
                    type: 'string',
                    mapping: 'telefono'
                }, {
                    name: 'ins_tipo',
                    type: 'number',
                    mapping: 'perTipo'
                }, {
                    name: 'ins_codigoUni',
                    type: 'string',
                    mapping: 'codigoUni'
                }, {
                    name: 'ins_idUniversidad',
                    type: 'number',
                    mapping: 'idUNIVERSIDAD'
                }, {
                    name: 'ins_idDepartamento',
                    type: 'number',
                    mapping: 'idDEPARTAMENTO'
                }, {
                    name: 'ins_direccion',
                    type: 'string',
                    mapping: 'direccion'
                }
            ]
        }),
        items: [
            {
                border: false,
                layout: 'column',
                padding: '5px 0px 20px 5px',
                items: [
                    {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_dni]
                    }, {
                        border: false,
                        width: 150,
                        layout: 'form',
                        items: [ins_btnBuscar]
                    }, {
                        border: false,
                        width: 150,
                        layout: 'form',
                        items: [ins_btnIncorrecto]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 20px 5px',
                items: [
                    {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_nombre]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 20px 5px',
                items: [
                    {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_ape_paterno]
                    }, {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_ape_materno]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 20px 5px',
                items: [
                    {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_email]
                    }, {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_telefono]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 20px 5px',
                items: [
                    {
                        border: false,
                        width: 400,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_tipo]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 20px 5px',
                items: [
                    {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_codigoUni]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 20px 5px',
                items: [
                    {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_idDepartamento]
                    }, {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_idUniversidad]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 20px 5px',
                items: [
                    {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_direccion]
                    }
                ]
            }
        ],
        buttonAlign: 'center',
        buttons: [{
                text: 'Nuevo',
                iconCls: 'nuevo',
                width: 100,
                handler: function() {
                }
            }, {
                text: 'Guardar',
                iconCls: 'aceptar',
                width: 100,
                handler: function() {
                }
            }, {
                text: 'Cancelar',
                iconCls: 'close',
                width: 100,
                handler: function() {
                    ins_dni.reset();
                    ins_limpiar();
                }
            }]
    });
    var panelVistaInscripcion = new Ext.Panel({
        layout: 'fit',
        border: false,
        items: formularioVistaInscripcion
    });
    return panelVistaInscripcion;
}
