function getVistaPagoCongreso(){
    
    var formularioVistaPagoCongreso = new Ext.form.FormPanel({
            border: false,
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [
            ],
            buttons: [{
                    text: 'Guardar',
                    iconCls: 'aceptar',
                    handler: function() {
                    }
                }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    handler: function() {
                    }
                }]
        });
    var panelVistaPagoCongreso = new Ext.Panel({
        layout: 'fit',
        border: false,
        items: []
    });
    return panelVistaPagoCongreso;
}