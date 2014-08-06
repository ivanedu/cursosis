function getVistaEntregaCarnet()
{
    var entcar_ventanaPopupBuscar;

    entregacarnetMascaraUniveridadRender = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Entrega Carnet : Store UniversidadRender..."});
    entregacarnetMascaraPersonasPresenciales = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Entrega Carnet : Store Personas Presenciales..."});
    entregacarnetMascaraPersona = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Entrega : Store Persona..."});

    entregacarnetCargadoInicial();

    var entcar_dni = new Ext.form.NumberField({
        fieldLabel: '<span>Dni</span><span style="color:red;font-weight:bold">*</span>',
        id: 'entcar_dni',
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
                    entcar_buscarPresenciales();
                }
            }
        }
    });
    var entcar_btnBuscar = new Ext.Button({
        id: 'entcar_btnBuscar',
        width: 150,
        iconCls: 'search',
        iconAlign: 'left',
        text: 'Buscar',
        listeners: {
            click: function(my, evt) {
                entregacarnetStorePersona.setBaseParam('nombre', '');
                entregacarnetStorePersona.setBaseParam('ape_paterno', '');
                entregacarnetStorePersona.setBaseParam('ape_materno', '');
                entregacarnetStorePersona.load();
                entcar_abrirFormularioBuscar();
                entcar_ventanaPopupBuscar.show();
            }
        }
    });
    var entcar_btnLimpiar = new Ext.Button({
        id: 'entcar_btnLimpiar',
        width: 100,
        iconCls: 'clear',
        iconAlign: 'left',
        text: 'Limpiar',
        listeners: {
            click: function(my, evt) {
                entcar_limpiar();
            }
        }
    });
    var entcar_gridPersonasPresenciales = new Ext.grid.GridPanel({
        title: 'Personas Inscritas ',
        region: 'south',
        store: entregacarnetStorePersonasPresenciales,
        border: false,
        stripeRows: true,
        itemSelector: true,
        height: 400,
        tbar: [
            entcar_btnLimpiar
        ],
        bbar: new Ext.PagingToolbar({
            store: entregacarnetStorePersonasPresenciales,
            displayInfo: true,
            autoWidth: true,
            beforePageText: 'Página',
            afterPageText: 'de {0}',
            displayMsg: '{0} - {1} de {2} Personas Presenciales',
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
                            var records = entregacarnetStoreUniversidadRender.getRange();
                            var valor = '';
                            for (var i = 0; i < records.length; i++) {
                                if (records[i].get('param_idUNIVERSIDAD') == val) {
                                    valor = records[i].get('param_nombre');
                                    break;
                                }
                            }
                            return valor;
                        }
                    }, {
                        header: 'Carnet',
                        dataIndex: 'param_carnet',
                        sortable: true,
                        renderer: function(val) {
                            var valorCambiado = 0;
                            if (val == 2)
                                valorCambiado = 1;
                            return estadoRenderer(valorCambiado);
                        },
                        width: 100
                    }, {
                        xtype: 'actioncolumn',
                        header: 'Entrega',
                        width: 100,
                        tooltip: 'Entregar Carnet',
                        icon: 'img/entregar.png',
                        handler: function(gridRol, rowIndex, colIndex) {
                            var rec = entregacarnetStorePersonasPresenciales.getAt(rowIndex);
                            if (rec.get('param_carnet') == 2)
                            {
                                verMessageBoxError('Ya ha sido entregado');
                            } else {
                                entcar_entregarcarnet(rec.get('param_dni'));
                            }
                        }
                    }],
        selModel: new Ext.grid.RowSelectionModel({singleSelect: true})
    });
    var entcar_formularioEntregaCarnet = new Ext.form.FormPanel({
        border: false,
        region: 'center',
        padding: '10px 10px 10px 10px',
        labelAlign: 'left',
        items: [
            {
                border: false,
                layout: 'column',
                padding: '5px 0px 10px 5px',
                items: [
                    {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [entcar_dni]
                    }, {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [entcar_btnBuscar]
                    }
                ]
            }
        ]
    });
    function entcar_buscarPresenciales()
    {
        entregacarnetStorePersonasPresenciales.setBaseParam('dni', entcar_dni.getValue());
        entregacarnetStorePersonasPresenciales.load();
    }
    function entcar_limpiar()
    {
        entregacarnetStorePersonasPresenciales.setBaseParam('dni', '');
        entregacarnetStorePersonasPresenciales.load();
        entcar_dni.reset();
        entcar_dni.focus();
    }
    function entcar_entregarcarnet(dni)
    {
        Ext.Msg.show({
            title: 'ADVERTENCIA',
            msg: '¿Entrega?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.MessageBox.WARNING,
            fn: function(btn, text) {
                if (btn == 'yes')
                {
                    Ext.MessageBox.wait('Espere por favor...', "REGISTRO");
                    Ext.Ajax.request({
                        url: 'controlador/controladorInscripcion.php',
                        params: {
                            opcion: "registrocarnet",
                            dni: dni,
                            carnet: 2
                        },
                        success: function(response) {
                            var datos = Ext.util.JSON.decode(response.responseText);
                            if (datos.resultado)
                            {
                                verMessageBoxExito(datos.mensaje)
                                entregacarnetStorePersonasPresenciales.reload();
                            } else {
                                verMessageBoxError(datos.mensaje)
                            }

                        },
                    });
                }
            }
        });
    }
    function entcar_abrirFormularioBuscar() {
        var param_nombre2 = new Ext.form.TextField({
            fieldLabel: '<span>Nombre</span><span style="color:red;font-weight:bold">*</span>',
            id: 'param_nombre2',
            width: 150,
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
                        entregacarnetStorePersona.setBaseParam('nombre', Ext.getCmp('param_nombre2').getValue());
                        entregacarnetStorePersona.setBaseParam('ape_paterno', Ext.getCmp('param_ape_paterno2').getValue());
                        entregacarnetStorePersona.setBaseParam('ape_materno', Ext.getCmp('param_ape_materno2').getValue());
                        entregacarnetStorePersona.load();
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
        var param_ape_paterno2 = new Ext.form.TextField({
            fieldLabel: '<span>Apellido Paterno</span><span style="color:red;font-weight:bold">*</span>',
            id: 'param_ape_paterno2',
            width: 150,
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
                        entregacarnetStorePersona.setBaseParam('nombre', Ext.getCmp('param_nombre2').getValue());
                        entregacarnetStorePersona.setBaseParam('ape_paterno', Ext.getCmp('param_ape_paterno2').getValue());
                        entregacarnetStorePersona.setBaseParam('ape_materno', Ext.getCmp('param_ape_materno2').getValue());
                        entregacarnetStorePersona.load();
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
        var param_ape_materno2 = new Ext.form.TextField({
            fieldLabel: '<span>Apellido Materno</span><span style="color:red;font-weight:bold">*</span>',
            id: 'param_ape_materno2',
            width: 150,
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
                        entregacarnetStorePersona.setBaseParam('nombre', Ext.getCmp('param_nombre2').getValue());
                        entregacarnetStorePersona.setBaseParam('ape_paterno', Ext.getCmp('param_ape_paterno2').getValue());
                        entregacarnetStorePersona.setBaseParam('ape_materno', Ext.getCmp('param_ape_materno2').getValue());
                        entregacarnetStorePersona.load();
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
        var param_gridPersona = new Ext.grid.GridPanel({
            title: 'Persona',
            region: 'south',
            store: entregacarnetStorePersona,
            border: false,
            stripeRows: true,
            itemSelector: true,
            height: 200,
            tbar: [
            ],
            listeners: {
                rowdblclick: function(objecto, rowIndex, objecto) {
                    var dniSelec = param_gridPersona.getStore().getAt(rowIndex).get('param_dni');
                    entcar_ventanaPopupBuscar.close();
                    entcar_dni.setValue(dniSelec);
                    entcar_dni.focus();
                }
            },
            bbar: new Ext.PagingToolbar({
                store: entregacarnetStorePersona,
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
                                var records = entregacarnetStoreUniversidadRender.getRange();
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
        var param_formularioBuscarInscripcion = new Ext.form.FormPanel({
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
                            items: [param_ape_paterno2]
                        }, {
                            border: false,
                            width: 250,
                            layout: 'form',
                            labelWidth: 110,
                            items: [param_ape_materno2]
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
                            items: [param_nombre2]
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
                        entregacarnetStorePersona.setBaseParam('nombre', Ext.getCmp('param_nombre2').getValue());
                        entregacarnetStorePersona.setBaseParam('ape_paterno', Ext.getCmp('param_ape_paterno2').getValue());
                        entregacarnetStorePersona.setBaseParam('ape_materno', Ext.getCmp('param_ape_materno2').getValue());
                        entregacarnetStorePersona.load();

                    }
                }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    width: 100,
                    handler: function() {
                        //aqui
                        entcar_ventanaPopupBuscar.close();
                    }
                }

            ]
        });
        var param_panelBuscarInscripcion = new Ext.Panel({
            labelAlign: 'top',
            //border: false,
            bodyStyle: 'padding: 10px;',
            widthLabel: 100,
            width: 700,
            height: 400,
            title: 'Panel',
            layout: 'border',
            items: [
                param_formularioBuscarInscripcion, param_gridPersona
            ]
        });
        entcar_ventanaPopupBuscar = new Ext.Window({
            title: 'Buscar Inscripcion',
            closable: false,
            modal: true,
            width: 700,
            constrain: true,
            resizable: false,
            items: [param_panelBuscarInscripcion]
        });

    }


    var entcar_panelEntregaCarnet = new Ext.Panel({
        labelAlign: 'top',
        bodyStyle: 'padding: 10px;',
        widthLabel: 100,
        width: 700,
        height: 400,
        title: 'Panel Entrega Carnet',
        layout: 'border',
        items: [
            entcar_formularioEntregaCarnet, entcar_gridPersonasPresenciales
        ]
    });
    return entcar_panelEntregaCarnet;
}