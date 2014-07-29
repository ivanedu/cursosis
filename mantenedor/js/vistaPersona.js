function getVistaPersona() {
    var ventanaPopupRegistroPersona;
    var ventanaPopupEdicionPersona;
    var formularioRegistroPersona;
    var formularioEdicionPersona;
    
    personaMascaraPersona = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Persona : Store Persona..."});

    personaCargadoInicial();


    var gridPersona = new Ext.grid.GridPanel({
        title: 'Persona',
        store: personaStorePersona,
        border: false,
        stripeRows: true,
        itemSelector: true,
        height : 400,
        tbar: [{
                text: 'Registrar',
                tooltip: 'Registrar Persona',
                iconCls: 'add',
                handler: function() {
                    abrirFormularioRegistroPersona();
                    ventanaPopupRegistroPersona.show();
                }
            }, '-', {
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
            }
        ],
        bbar: new Ext.PagingToolbar({
            store: personaStorePersona,
            displayInfo: true,
            autoWidth: true,
            beforePageText: 'Página',
            afterPageText: 'de {0}',
            displayMsg: '{0} - {1} de {2} Personas',
            emptyMsg: 'No hay Personas para mostrar',
            pageSize: 20
        }),
        columns:
                [new Ext.grid.RowNumberer(),
                    {
                        header: 'Codigo',
                        dataIndex: 'param_perId',
                        sortable: true,
                        width: 50
                    },{
                        header: 'Nombre',
                        dataIndex: 'param_perNombre',
                        sortable: true,
                        width: 150
                    },{
                        header: 'Apellido Paterno',
                        dataIndex: 'param_perApePaterno',
                        sortable: true,
                        width: 150
                    },{
                        header: 'Apellido Materno',
                        dataIndex: 'param_perApeMaterno',
                        sortable: true,
                        width: 150
                    },{
                        header: 'Edad',
                        dataIndex: 'param_perEdad',
                        sortable: true,
                        width: 50
                    },{
                        header: 'Sexo',
                        dataIndex: 'param_perSexo',
                        sortable: true,
                        width: 50
                    }]
    });
    
    var panelPersona = new Ext.Panel({
        layout: 'fit',
        border: false,
        items: gridPersona
    });

    return panelPersona;
}