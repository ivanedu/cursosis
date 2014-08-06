function getVistaMantInscripcion(){
    
    mantenedorMascaraInscripcion = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Inscripcion : Store Inscripcion..."});
    
    mantInscripcionCargadoInicial();
    
    var gridMantInscripcion = new Ext.grid.GridPanel({
        title: 'Mant-Inscripcion',
        store: mantenedorStoreInscripcion,
        border: false,
        stripeRows: true,
        itemSelector: true,
        height: 400,
        tbar: [
        ],
        bbar: new Ext.PagingToolbar({
            store: mantenedorStoreInscripcion,
            displayInfo: true,
            autoWidth: true,
            beforePageText: 'Página',
            afterPageText: 'de {0}',
            displayMsg: '{0} - {1} de {2} Inscripciones',
            emptyMsg: 'No hay Inscripciones para mostrar',
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
                        header: 'idInscrip',
                        dataIndex: 'param_idINSCRIPCION',
                        sortable: true,
                        width: 150
                    }, {
                        header: 'Presencial',
                        dataIndex: 'param_presencial',
                        sortable: true,
                        width: 150
                    }, {
                        header: 'Carnet',
                        dataIndex: 'param_carnet',
                        sortable: true,
                        width: 150
                    }, {
                        header: 'Materiales',
                        dataIndex: 'param_materiales',
                        sortable: true,
                        //hidden:true,
                        width: 150
                    }, {
                        header: 'Fecha',
                        dataIndex: 'param_fecha',
                        sortable: true,
                        width: 150
                    }, {
                        header: 'Certificado',
                        dataIndex: 'param_certificado',
                        sortable: true,
                        width: 150
                    }, {
                        header: 'Tipo',
                        dataIndex: 'param_tipo',
                        sortable: true,
                        width: 150
                    }],
        selModel: new Ext.grid.RowSelectionModel({singleSelect: true})
    });

    var panelMantInscripcion = new Ext.Panel({
        layout: 'fit',
        border: false,
        items: [
            gridMantInscripcion
        ]
    });

    return panelMantInscripcion;
}
