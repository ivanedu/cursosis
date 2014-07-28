function getVistaPersona() {

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
                text: 'Persona',
                tooltip: 'Crear Persona',
                iconCls: 'add'
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
                        header: 'Codigo Persona',
                        dataIndex: 'param_perId',
                        sortable: true,
                        width: 200
                    },
                    {
                        header: 'Nombre',
                        dataIndex: 'param_perNombre',
                        sortable: true,
                        width: 300
                    }]
    });
    
    var panelPersona = new Ext.Panel({
        layout: 'fit',
        border: false,
        items: gridPersona
    });

    return panelPersona;
}