function getVistaTipoRelacion() {
    var ventanaPopupRegitroTipoRelacion;
    var ventanaPopupEdicionTipoRelacion;
    var formularioRegistroTipoRelacion;
    var formularioEdicionTipoRelacion;
    
    tiporelacionMascaraTipoRelacion = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Tipo Relacion : Store Tipo Relacion..."});
    tiporelacionCargadoInicial();
    
    var gridTipoRelacion = new Ext.grid.GridPanel({
        title: 'Tipo Relacion',
        store: tiporelacionStoreTipoRelacion,
        border: false,
        stripeRows: true,
        itemSelector: true,
        tbar: [{
                text: 'Registrar',
                tooltip: 'Registrar Tipo Relacion',
                iconCls: 'add',
                handler: function() {
                    abrirFormularioRegistroTipoRelacion();
                    ventanaPopupRegitroTipoRelacion.show();
                }
            }, '-', {
                ref: '../btnEditarTipoRelacion',
                text: 'Editar',
                tooltip: 'Editar Tipo Relacion',
                iconCls: 'edit',
                disabled: true,
                listeners: {
                    click: function() {
                        var seleccionFila = gridTipoRelacion.getSelectionModel().getSelections();
                        if (seleccionFila.length <= 0) {
                            verMessageBoxAdvertencia("Debes seleccionar una fila");
                        } else {
                            abrirFormularioEdicionTipoRelacion();
                            Ext.getCmp('paramedi_tiprelId').setValue(seleccionFila[0].get('param_tiprelId'));
                            Ext.getCmp('paramedi_tiprelNombre').setValue(seleccionFila[0].get('param_tiprelNombre'));
                            ventanaPopupEdicionTipoRelacion.show();
                        }
                    }
                }
            }, '-', {
                ref: '../btnEliminarTipoRelacion',
                text: 'Eliminar',
                tooltip: 'Eliminar Tipo Relacion',
                iconCls: 'remove',
                disabled: true,
                listeners: {
                    click: function() {
                        var seleccionFila = gridTipoRelacion.getSelectionModel().getSelections();
                        if (seleccionFila.length <= 0) {
                            verMessageBoxAdvertencia("Debes seleccionar una fila");
                        } else {
                            guardarEliminacionTipoRelacion(seleccionFila[0].get('param_tiprelId'));
                        }
                    }
                }
            }
        ],
        bbar: new Ext.PagingToolbar({
            store: tiporelacionStoreTipoRelacion,
            displayInfo: true,
            autoWidth: true,
            beforePageText: 'Página',
            afterPageText: 'de {0}',
            displayMsg: '{0} - {1} de {2} Tipo Relacion',
            emptyMsg: 'No hay Tipo Relacion para mostrar',
            pageSize: 10
        }),
        columns:
                [new Ext.grid.RowNumberer(),
                    {
                        header: 'Codigo',
                        dataIndex: 'param_tiprelId',
                        sortable: true,
                        width: 50
                    },
                    {
                        header: 'Nombre',
                        dataIndex: 'param_tiprelNombre',
                        sortable: true,
                        width: 300
                    }],
        selModel: new Ext.grid.RowSelectionModel({singleSelect: true})
    });
    
    gridTipoRelacion.getSelectionModel().on('selectionchange', function(sm) {
        gridTipoRelacion.btnEditarTipoRelacion.setDisabled(sm.getCount() < 1);
        gridTipoRelacion.btnEliminarTipoRelacion.setDisabled(sm.getCount() < 1);
    });
    
    function guardarRegistroTipoRelacion()
    {
        Ext.MessageBox.wait('Espere por favor...', "REGISTRO");
        if (formularioRegistroTipoRelacion.getForm().isValid())
        {
            Ext.Ajax.request({
                url: 'controlador/controladorTipoRelacion.php',
                params: {
                    opcion: "registrar",
                    tiprelNombre: Ext.getCmp('paramreg_tiprelNombre').getValue()
                },
                success: function(response) {
                    var datos = Ext.util.JSON.decode(response.responseText);
                    if (datos.resultado)
                    {
                        verMessageBoxExito(datos.mensaje);
                        tiporelacionStoreTipoRelacion.reload();
                        formularioRegistroTipoRelacion.getForm().reset();
                        ventanaPopupRegitroTipoRelacion.close();
                    } else {
                        verMessageBoxError(datos.mensaje);
                    }

                }
            });
        }
        else
        {
            verMessageBoxAdvertencia("Digite campo(s) requerido(s)");
        }
    }

    function abrirFormularioRegistroTipoRelacion()
    {
        var paramreg_tiprelNombre = new Ext.form.TextField({
            fieldLabel: '<span>Nombre</span><span style="color:red;font-weight:bold">*</span>',
            id: 'paramreg_tiprelNombre',
            width: '150',
            allowBlank: false,
            enableKeyEvents: true,
            listeners: {
                keypress: function(my, evt) {
                    if (evt.getKey() == evt.ENTER)
                    {
                        guardarRegistroTipoRelacion();
                    }
                }
            }
        });
        formularioRegistroTipoRelacion = new Ext.form.FormPanel({
            border: false,
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [
                paramreg_tiprelNombre
            ],
            buttons: [{
                    text: 'Guardar',
                    iconCls: 'aceptar',
                    handler: function(){
                        guardarRegistroTipoRelacion();
                    }
                }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    handler: function() {
                        ventanaPopupRegitroTipoRelacion.close();
                    }
                }]
        });
        var panelRegistroTipoRelacion = new Ext.Panel({
            labelAlign: 'top',
            border: false,
            items: formularioRegistroTipoRelacion
        });
        ventanaPopupRegitroTipoRelacion = new Ext.Window({
            title: 'Registro Tipo Relacion',
            closable: false,
            modal: true,
            width: 350,
            constrain:true,
            resizable : false,
            items: panelRegistroTipoRelacion
        });
    }

    function guardarEdicionTipoRelacion()
    {
        Ext.MessageBox.wait('Espere por favor...', "EDICION");
        if (formularioEdicionTipoRelacion.getForm().isValid())
        {
            Ext.Ajax.request({
                url: 'controlador/controladorTipoRelacion.php',
                params: {
                    opcion: "editar",
                    tiprelId: Ext.getCmp('paramedi_tiprelId').getValue(),
                    tiprelNombre: Ext.getCmp('paramedi_tiprelNombre').getValue()
                },
                success: function(response) {
                    var datos = Ext.util.JSON.decode(response.responseText);
                    if (datos.resultado)
                    {
                        verMessageBoxExito(datos.mensaje)
                        tiporelacionStoreTipoRelacion.reload();
                        ventanaPopupEdicionTipoRelacion.close();
                    } else {
                        verMessageBoxError(datos.mensaje)
                    }

                },
            });
        }
        else
        {
            verMessageBoxAdvertencia("Digite campo(s) requerido(s)");
        }
    }
    function abrirFormularioEdicionTipoRelacion()
    {
        var paramedi_tiprelId = new Ext.form.TextField({
            fieldLabel: '<span>Codigo</span><span style="color:red;font-weight:bold">*</span>',
            id: 'paramedi_tiprelId',
            width: '150',
            allowBlank: false,
            enableKeyEvents: true,
            hidden:true,
            listeners: {
                keypress: function(my, evt) {
                    if (evt.getKey() == evt.ENTER)
                    {
                        guardarFormularioEdicionTipoRelacion();
                    }
                }
            }
        });
        var paramedi_tiprelNombre = new Ext.form.TextField({
            fieldLabel: '<span>Nombre</span><span style="color:red;font-weight:bold">*</span>',
            id: 'paramedi_tiprelNombre',
            width: '150',
            allowBlank: false,
            enableKeyEvents: true,
            listeners: {
                keypress: function(my, evt) {
                    if (evt.getKey() == evt.ENTER)
                    {
                        guardarEdicionTipoRelacion();
                    }
                }
            }
        });
        formularioEdicionTipoRelacion = new Ext.form.FormPanel({
            border: false,
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [
                paramedi_tiprelId,
                paramedi_tiprelNombre
            ],
            buttons: [{
                    text: 'Guardar',
                    iconCls: 'aceptar',
                    handler: function(){
                        guardarEdicionTipoRelacion()
                    }
                }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    handler: function() {
                        ventanaPopupEdicionTipoRelacion.close();
                    }
                }]
        });

        var panelEdicionTipoRelacion = new Ext.Panel({
            labelAlign: 'top',
            border: false,
            items: formularioEdicionTipoRelacion
        });
        ventanaPopupEdicionTipoRelacion = new Ext.Window({
            title: 'Editar Color',
            closeAction: 'hide',
            closable: false,
            modal: true,
            width: 350,
            constrain:true,
            resizable : false,
            items: panelEdicionTipoRelacion
        });

    }
    
    function guardarEliminacionTipoRelacion(tiprelId)
    {
        Ext.Msg.show({
            title: 'ADVERTENCIA',
            msg: '¿Esta seguro que desea eliminar?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.MessageBox.WARNING,
            fn:function(btn,text){
                if(btn=='yes')
                {
                    Ext.MessageBox.wait('Espere por favor...', "ELIMINACION");
                    Ext.Ajax.request({
                        url: 'controlador/controladorTipoRelacion.php',
                        params: {
                            opcion: "eliminar",
                            tiprelId: tiprelId
                        },
                        success: function(response) {
                            var datos = Ext.util.JSON.decode(response.responseText);
                            if (datos.resultado)
                            {
                                verMessageBoxExito(datos.mensaje)
                                tiporelacionStoreTipoRelacion.reload();
                            } else {
                                verMessageBoxError(datos.mensaje)
                            }

                        },
                    });
                }
            }
        });
    }

    var panelTipoRelacion = new Ext.Panel({
        layout: 'fit',
        border: false,
        items: gridTipoRelacion
    });

    return panelTipoRelacion;
}