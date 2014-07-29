function getVistaRelacion() {
    var ventanaPopupRegistroRelacion;
    var ventanaPopupEdicionRelacion;
    var formularioRegistroRelacion;
    var formularioEdicionRelacion;

    relacionMascaraPersonaRelacionador = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Relacion : Store Persona Relacionador..."});
    relacionMascaraPersonaRelacionadorRender = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Relacion : Store Persona Relacionador Render..."});
    relacionMascaraPersonaRelacionado = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Relacion : Store Persona Relacionado..."});
    relacionMascaraPersonaRelacionadoRender = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Relacion : Store Persona Relacionado Render..."});
    relacionMascaraTipoRelacion = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Relacion : Store Tipo Relacion..."});
    relacionMascaraTipoRelacionRender = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Relacion : Store Tipo Relacion Render..."});
    relacionMascaraRelacion = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Relacion : Store Relacion..."});
    relacionCargadoInicial();

    var gridRelacion = new Ext.grid.GridPanel({
        title: 'Relacion',
        store: relacionStoreRelacion,
        border: false,
        stripeRows: true,
        itemSelector: true,
        tbar: [{
                text: 'Registrar',
                tooltip: 'Registrar Relacion',
                iconCls: 'add',
                handler: function() {
                    abrirFormularioRegistroRelacion();
                    ventanaPopupRegistroRelacion.show();
                }
            }, '-', {
                ref: '../btnEditarRelacion',
                text: 'Editar',
                tooltip: 'Editar Relacion',
                iconCls: 'edit',
                disabled: true,
                listeners: {
                    click: function() {
                        var seleccionFila = gridRelacion.getSelectionModel().getSelections();
                        if (seleccionFila.length <= 0) {
                            verMessageBoxAdvertencia("Debes seleccionar una fila");
                        } else {
                            abrirFormularioEdicionRelacion();
                            relacionStorePersonaRelacionado.setBaseParam('perId', seleccionFila[0].get('param_perIdRelacionador'));
                            Ext.getCmp('paramedi_relId').setValue(seleccionFila[0].get('param_relId'));
                            Ext.getCmp('paramedi_perIdRelacionador').setValue(seleccionFila[0].get('param_perIdRelacionador'));
                            Ext.getCmp('paramedi_perIdRelacionado').setValue(seleccionFila[0].get('param_perIdRelacionado'));
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
            }
        ],
        bbar: new Ext.PagingToolbar({
            store: relacionStoreRelacion,
            displayInfo: true,
            autoWidth: true,
            beforePageText: 'Página',
            afterPageText: 'de {0}',
            displayMsg: '{0} - {1} de {2} Relacion',
            emptyMsg: 'No hay Relacion para mostrar',
            pageSize: 10
        }),
        columns:
                [new Ext.grid.RowNumberer(),
                    {
                        header: 'Codigo',
                        dataIndex: 'param_relId',
                        sortable: true,
                        width: 50
                    }, {
                        header: 'Persona Relacionador',
                        dataIndex: 'param_perIdRelacionador',
                        sortable: true,
                        width: 300,
                        renderer: function(val) {
                            var records = relacionStorePersonaRelacionadorRender.getRange();
                            var valor = '';
                            for (var i = 0; i < records.length; i++) {
                                if (records[i].get('param_perId') == val) {
                                    valor = records[i].get('param_perNombreCompleto');
                                    break;
                                }
                            }
                            return valor;
                        }
                    }, {
                        header: 'Persona Relacionada',
                        dataIndex: 'param_perIdRelacionado',
                        sortable: true,
                        width: 300,
                        renderer: function(val) {
                            var records = relacionStorePersonaRelacionadoRender.getRange();
                            var valor = '';
                            for (var i = 0; i < records.length; i++) {
                                if (records[i].get('param_perId') == val) {
                                    valor = records[i].get('param_perNombreCompleto');
                                    break;
                                }
                            }
                            return valor;
                        }
                    }, {
                        header: 'Tipo Relacion',
                        dataIndex: 'param_tiprelId',
                        sortable: true,
                        width: 80,
                        renderer: function(val) {
                            var records = relacionStoreTipoRelacionRender.getRange();
                            var valor = '';
                            for (var i = 0; i < records.length; i++) {
                                if (records[i].get('param_tiprelId') == val) {
                                    valor = records[i].get('param_tiprelNombre');
                                    break;
                                }
                            }
                            return valor;
                        }
                    }],
        selModel: new Ext.grid.RowSelectionModel({singleSelect: true})
    });

    gridRelacion.getSelectionModel().on('selectionchange', function(sm) {
        gridRelacion.btnEditarRelacion.setDisabled(sm.getCount() < 1);
        gridRelacion.btnEliminarRelacion.setDisabled(sm.getCount() < 1);
    });

    function guardarRegistroRelacion()
    {
        Ext.MessageBox.wait('Espere por favor...', "REGISTRO");
        if (formularioRegistroRelacion.getForm().isValid())
        {
            Ext.Ajax.request({
                url: 'controlador/controladorRelacion.php',
                params: {
                    opcion: "registrar",
                    perIdRelacionador: Ext.getCmp('paramreg_perIdRelacionador').getValue(),
                    perIdRelacionado: Ext.getCmp('paramreg_perIdRelacionado').getValue(),
                    tiprelId: Ext.getCmp('paramreg_tiprelId').getValue()
                },
                success: function(response) {
                    var datos = Ext.util.JSON.decode(response.responseText);
                    if (datos.resultado)
                    {
                        verMessageBoxExito(datos.mensaje);
                        relacionStoreRelacion.reload();
                        formularioRegistroRelacion.getForm().reset();
                        ventanaPopupRegistroRelacion.close();
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

    function abrirFormularioRegistroRelacion()
    {
        var paramtpl_perIdRelacionador = new Ext.XTemplate('<tpl for="."><div class="search-item"><div class="name">{param_perNombreCompleto}</div></div></tpl>');
        var paramreg_perIdRelacionador = new Ext.form.ComboBox({
            id: 'paramreg_perIdRelacionador',
            fieldLabel: '<span>Persona Relacionador</span><span style="color:red;font-weight:bold">*</span>',
            store: relacionStorePersonaRelacionador,
            valueField: 'param_perId',
            displayField: 'param_perNombreCompleto',
            emptyText: 'Seleccione...',
            forceSelection: true,
            autoScroll: true,
            allowBlank: false,
            triggerAction: 'all',
            width: 180,
            maxHeight: 100,
            minChars: 1,
            tpl: paramtpl_perIdRelacionador,
            itemSelector: 'div.search-item',
            listeners: {
                select: function(combo, record, index) {
                    paramreg_perIdRelacionado.enable();
                    paramreg_perIdRelacionado.clearValue();
                    relacionStorePersonaRelacionado.setBaseParam('perId', record.get('param_perId'));
                    relacionStorePersonaRelacionado.load();
                }
            }
        });
        var paramtpl_perIdRelacionado = new Ext.XTemplate('<tpl for="."><div class="search-item"><div class="name">{param_perNombreCompleto}</div></div></tpl>');
        var paramreg_perIdRelacionado = new Ext.form.ComboBox({
            id: 'paramreg_perIdRelacionado',
            fieldLabel: '<span>Persona Relacionado</span><span style="color:red;font-weight:bold">*</span>',
            store: relacionStorePersonaRelacionado,
            valueField: 'param_perId',
            displayField: 'param_perNombreCompleto',
            emptyText: 'Seleccione...',
            disabled: true,
            forceSelection: true,
            autoScroll: true,
            allowBlank: false,
            triggerAction: 'all',
            width: 180,
            maxHeight: 100,
            minChars: 1,
            tpl: paramtpl_perIdRelacionado,
            itemSelector: 'div.search-item',
        });
        var paramtpl_tiprelId = new Ext.XTemplate('<tpl for="."><div class="search-item"><div class="name">{param_tiprelNombre}</div></div></tpl>');
        var paramreg_tiprelId = new Ext.form.ComboBox({
            id: 'paramreg_tiprelId',
            fieldLabel: '<span>Tipo Relacion</span><span style="color:red;font-weight:bold">*</span>',
            store: relacionStoreTipoRelacion,
            valueField: 'param_tiprelId',
            displayField: 'param_tiprelNombre',
            emptyText: 'Seleccione...',
            forceSelection: true,
            autoScroll: true,
            allowBlank: false,
            triggerAction: 'all',
            width: 180,
            maxHeight: 100,
            minChars: 1,
            tpl: paramtpl_tiprelId,
            itemSelector: 'div.search-item',
        });
        formularioRegistroRelacion = new Ext.form.FormPanel({
            border: false,
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [
                paramreg_perIdRelacionador,
                paramreg_perIdRelacionado,
                paramreg_tiprelId
            ],
            buttons: [{
                    text: 'Guardar',
                    iconCls: 'aceptar',
                    handler: function() {
                        guardarRegistroRelacion();
                    }
                }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    handler: function() {
                        ventanaPopupRegistroRelacion.close();
                    }
                }]
        });
        var panelRegistroRelacion = new Ext.Panel({
            labelAlign: 'top',
            border: false,
            items: formularioRegistroRelacion
        });
        ventanaPopupRegistroRelacion = new Ext.Window({
            title: 'Registro Relacion',
            closable: false,
            modal: true,
            width: 350,
            constrain: true,
            resizable: false,
            items: panelRegistroRelacion
        });
    }

    function guardarEdicionRelacion()
    {
        Ext.MessageBox.wait('Espere por favor...', "EDICION");
        if (formularioEdicionRelacion.getForm().isValid())
        {
            Ext.Ajax.request({
                url: 'controlador/controladorRelacion.php',
                params: {
                    opcion: "editar",
                    relId: Ext.getCmp('paramedi_relId').getValue(),
                    perIdRelacionador: Ext.getCmp('paramedi_perIdRelacionador').getValue(),
                    perIdRelacionado: Ext.getCmp('paramedi_perIdRelacionado').getValue(),
                    tiprelId: Ext.getCmp('paramedi_tiprelId').getValue()
                },
                success: function(response) {
                    var datos = Ext.util.JSON.decode(response.responseText);
                    if (datos.resultado)
                    {
                        verMessageBoxExito(datos.mensaje);
                        relacionStoreRelacion.reload();
                        ventanaPopupEdicionRelacion.close();
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
    function abrirFormularioEdicionRelacion()
    {
        var paramedi_relId = new Ext.form.TextField({
            fieldLabel: '<span>Codigo</span><span style="color:red;font-weight:bold">*</span>',
            id: 'paramedi_relId',
            width: '150',
            allowBlank: false,
            enableKeyEvents: true,
            hidden: true,
            listeners: {
                keypress: function(my, evt) {
                    if (evt.getKey() == evt.ENTER)
                    {
                        guardarFormularioEdicionRelacion();
                    }
                }
            }
        });
        var paramtpl_perIdRelacionador = new Ext.XTemplate('<tpl for="."><div class="search-item"><div class="name">{param_perNombreCompleto}</div></div></tpl>');
        var paramedi_perIdRelacionador = new Ext.form.ComboBox({
            id: 'paramedi_perIdRelacionador',
            fieldLabel: '<span>Persona Relacionador</span><span style="color:red;font-weight:bold">*</span>',
            store: relacionStorePersonaRelacionador,
            valueField: 'param_perId',
            displayField: 'param_perNombreCompleto',
            emptyText: 'Seleccione...',
            disabled:true,
            forceSelection: true,
            autoScroll: true,
            allowBlank: false,
            triggerAction: 'all',
            width: 180,
            maxHeight: 100,
            minChars: 1,
            tpl: paramtpl_perIdRelacionador,
            itemSelector: 'div.search-item',
            listeners: {
                select: function(combo, record, index) {
                    paramedi_perIdRelacionado.enable();
                    paramedi_perIdRelacionado.clearValue();
                    relacionStorePersonaRelacionado.setBaseParam('perId', record.get('param_perId'));
                    relacionStorePersonaRelacionado.load();
                }
            }
        });
        var paramtpl_perIdRelacionado = new Ext.XTemplate('<tpl for="."><div class="search-item"><div class="name">{param_perNombreCompleto}</div></div></tpl>');
        var paramedi_perIdRelacionado = new Ext.form.ComboBox({
            id: 'paramedi_perIdRelacionado',
            fieldLabel: '<span>Persona Relacionado</span><span style="color:red;font-weight:bold">*</span>',
            store: relacionStorePersonaRelacionado,
            valueField: 'param_perId',
            displayField: 'param_perNombreCompleto',
            emptyText: 'Seleccione...',
            forceSelection: true,
            autoScroll: true,
            allowBlank: false,
            triggerAction: 'all',
            width: 180,
            maxHeight: 100,
            minChars: 1,
            tpl: paramtpl_perIdRelacionado,
            itemSelector: 'div.search-item',
        });
        var paramtpl_tiprelId = new Ext.XTemplate('<tpl for="."><div class="search-item"><div class="name">{param_tiprelNombre}</div></div></tpl>');
        var paramedi_tiprelId = new Ext.form.ComboBox({
            id: 'paramedi_tiprelId',
            fieldLabel: '<span>Tipo Relacion</span><span style="color:red;font-weight:bold">*</span>',
            store: relacionStoreTipoRelacion,
            valueField: 'param_tiprelId',
            displayField: 'param_tiprelNombre',
            emptyText: 'Seleccione...',
            forceSelection: true,
            autoScroll: true,
            allowBlank: false,
            triggerAction: 'all',
            width: 180,
            maxHeight: 100,
            minChars: 1,
            tpl: paramtpl_tiprelId,
            itemSelector: 'div.search-item',
        });
        formularioEdicionRelacion = new Ext.form.FormPanel({
            border: false,
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [
                paramedi_relId,
                paramedi_perIdRelacionador,
                paramedi_perIdRelacionado,
                paramedi_tiprelId
            ],
            buttons: [{
                    text: 'Guardar',
                    iconCls: 'aceptar',
                    handler: function() {
                        guardarEdicionRelacion()
                    }
                }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    handler: function() {
                        ventanaPopupEdicionRelacion.close();
                    }
                }]
        });

        var panelEdicionRelacion = new Ext.Panel({
            labelAlign: 'top',
            border: false,
            items: formularioEdicionRelacion
        });
        ventanaPopupEdicionRelacion = new Ext.Window({
            title: 'Editar Relacion',
            closeAction: 'hide',
            closable: false,
            modal: true,
            width: 350,
            constrain: true,
            resizable: false,
            items: panelEdicionRelacion
        });

    }

    function guardarEliminacionRelacion(relId,perIdRelacionador)
    {
        Ext.Msg.show({
            title: 'ADVERTENCIA',
            msg: '¿Esta seguro que desea eliminar?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.MessageBox.WARNING,
            fn: function(btn, text) {
                if (btn == 'yes')
                {
                    Ext.MessageBox.wait('Espere por favor...', "ELIMINACION");
                    Ext.Ajax.request({
                        url: 'controlador/controladorRelacion.php',
                        params: {
                            opcion: "eliminar",
                            relId: relId,
                            perIdRelacionador : perIdRelacionador
                        },
                        success: function(response) {
                            var datos = Ext.util.JSON.decode(response.responseText);
                            if (datos.resultado)
                            {
                                verMessageBoxExito(datos.mensaje)
                                relacionStoreRelacion.reload();
                            } else {
                                verMessageBoxError(datos.mensaje)
                            }

                        },
                    });
                }
            }
        });
    }

    var panelRelacion = new Ext.Panel({
        layout: 'fit',
        border: false,
        items: gridRelacion
    });

    return panelRelacion;
}