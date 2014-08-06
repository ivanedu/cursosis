function getVistaEntregaMateriales()
{
    var entmat_ventanaPopupBuscar;

    entregamaterialesMascaraUniveridadRender = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Entrega Materiales : Store UniversidadRender..."});
    entregamaterialesMascaraPersonasPresenciales = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Entrega Materiales : Store Personas Presenciales..."});
    entregamaterialesMascaraPersona = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Entrega : Store Persona..."});

    entregamaterialesCargadoInicial();

    var entmat_dni = new Ext.form.NumberField({
        fieldLabel: '<span>Dni</span><span style="color:red;font-weight:bold">*</span>',
        id: 'entmat_dni',
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
                    entmat_buscarPresenciales();
                }
            }
        }
    });
    var entmat_btnBuscar = new Ext.Button({
        id: 'entmat_btnBuscar',
        width: 150,
        iconCls: 'search',
        iconAlign: 'left',
        text: 'Buscar',
        listeners: {
            click: function(my, evt) {
                entregamaterialesStorePersona.setBaseParam('nombre', '');
                entregamaterialesStorePersona.setBaseParam('ape_paterno', '');
                entregamaterialesStorePersona.setBaseParam('ape_materno', '');
                entregamaterialesStorePersona.load();
                entmat_abrirFormularioBuscar();
                entmat_ventanaPopupBuscar.show();
            }
        }
    });
    var entmat_btnLimpiar = new Ext.Button({
        id: 'entmat_btnLimpiar',
        width: 100,
        iconCls: 'clear',
        iconAlign: 'left',
        text: 'Limpiar',
        listeners: {
            click: function(my, evt) {
                entmat_limpiar();
            }
        }
    });
    var entmat_gridPersonasPresenciales = new Ext.grid.GridPanel({
        title: 'Personas Inscritas ',
        region: 'south',
        store: entregamaterialesStorePersonasPresenciales,
        border: false,
        stripeRows: true,
        itemSelector: true,
        height: 400,
        tbar: [
            entmat_btnLimpiar
        ],
        bbar: new Ext.PagingToolbar({
            store: entregamaterialesStorePersonasPresenciales,
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
                            var records = entregamaterialesStoreUniversidadRender.getRange();
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
                        header: 'Materiales',
                        dataIndex: 'param_materiales',
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
                        tooltip: 'Entregar Materiales',
                        icon: 'img/entregar.png',
                        handler: function(gridRol, rowIndex, colIndex) {
                            var rec = entregamaterialesStorePersonasPresenciales.getAt(rowIndex);
                            if (rec.get('param_materiales') == 2)
                            {
                                verMessageBoxError('Ya ha sido entregado');
                            } else {
                                entmat_entregarmateriales(rec.get('param_dni'));
                            }
                        }
                    }],
        selModel: new Ext.grid.RowSelectionModel({singleSelect: true})
    });
    var entmat_formularioEntregaMateriales = new Ext.form.FormPanel({
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
                        items: [entmat_dni]
                    }, {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [entmat_btnBuscar]
                    }
                ]
            }
        ]
    });
    function entmat_buscarPresenciales()
    {
        entregamaterialesStorePersonasPresenciales.setBaseParam('dni', entmat_dni.getValue());
        entregamaterialesStorePersonasPresenciales.load();
    }
    function entmat_limpiar()
    {
        entregamaterialesStorePersonasPresenciales.setBaseParam('dni', '');
        entregamaterialesStorePersonasPresenciales.load();
        entmat_dni.reset();
        entmat_dni.focus();
    }
    function entmat_entregarmateriales(dni)
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
                            opcion: "registromateriales",
                            dni: dni,
                            materiales: 2
                        },
                        success: function(response) {
                            var datos = Ext.util.JSON.decode(response.responseText);
                            if (datos.resultado)
                            {
                                verMessageBoxExito(datos.mensaje)
                                entregamaterialesStorePersonasPresenciales.reload();
                            } else {
                                verMessageBoxError(datos.mensaje)
                            }

                        },
                    });
                }
            }
        });
    }
    function entmat_abrirFormularioBuscar() {
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
                        entregamaterialesStorePersona.setBaseParam('nombre', Ext.getCmp('param_nombre2').getValue());
                        entregamaterialesStorePersona.setBaseParam('ape_paterno', Ext.getCmp('param_ape_paterno2').getValue());
                        entregamaterialesStorePersona.setBaseParam('ape_materno', Ext.getCmp('param_ape_materno2').getValue());
                        entregamaterialesStorePersona.load();

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
                        entregamaterialesStorePersona.setBaseParam('nombre', Ext.getCmp('param_nombre2').getValue());
                        entregamaterialesStorePersona.setBaseParam('ape_paterno', Ext.getCmp('param_ape_paterno2').getValue());
                        entregamaterialesStorePersona.setBaseParam('ape_materno', Ext.getCmp('param_ape_materno2').getValue());
                        entregamaterialesStorePersona.load();

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
                        entregamaterialesStorePersona.setBaseParam('nombre', Ext.getCmp('param_nombre2').getValue());
                        entregamaterialesStorePersona.setBaseParam('ape_paterno', Ext.getCmp('param_ape_paterno2').getValue());
                        entregamaterialesStorePersona.setBaseParam('ape_materno', Ext.getCmp('param_ape_materno2').getValue());
                        entregamaterialesStorePersona.load();

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
            store: entregamaterialesStorePersona,
            border: false,
            stripeRows: true,
            itemSelector: true,
            height: 200,
            tbar: [
            ],
            listeners: {
                rowdblclick: function(objecto, rowIndex, objecto) {
                    var dniSelec = param_gridPersona.getStore().getAt(rowIndex).get('param_dni');
                    entmat_ventanaPopupBuscar.close();
                    entmat_dni.setValue(dniSelec);
                    entmat_dni.focus();
                }
            },
            bbar: new Ext.PagingToolbar({
                store: entregamaterialesStorePersona,
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
                                var records = entregamaterialesStoreUniversidadRender.getRange();
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
                        entregamaterialesStorePersona.setBaseParam('nombre', Ext.getCmp('param_nombre2').getValue());
                        entregamaterialesStorePersona.setBaseParam('ape_paterno', Ext.getCmp('param_ape_paterno2').getValue());
                        entregamaterialesStorePersona.setBaseParam('ape_materno', Ext.getCmp('param_ape_materno2').getValue());
                        entregamaterialesStorePersona.load();

                    }
                }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    width: 100,
                    handler: function() {
                        //aqui
                        entmat_ventanaPopupBuscar.close();
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
        entmat_ventanaPopupBuscar = new Ext.Window({
            title: 'Buscar Inscripcion',
            closable: false,
            modal: true,
            width: 700,
            constrain: true,
            resizable: false,
            items: [param_panelBuscarInscripcion]
        });

    }


    var entmat_panelEntregaMateriales = new Ext.Panel({
        labelAlign: 'top',
        bodyStyle: 'padding: 10px;',
        widthLabel: 100,
        width: 700,
        height: 400,
        title: 'Panel Entrega Materiales',
        layout: 'border',
        items: [
            entmat_formularioEntregaMateriales, entmat_gridPersonasPresenciales
        ]
    });
    return entmat_panelEntregaMateriales;
}