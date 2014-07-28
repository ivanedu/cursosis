var personaMascaraPersona;

var personaStorePersona = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: 'controlador/controladorPersona.php',
        method: 'POST'
    }), baseParams: {
        opcion: 'listar',
        start: 0,
        limit: 20
    },
    reader: new Ext.data.JsonReader({
        root: 'datos',
        totalProperty: 'total',
        id: 'perId',
        fields: [{
                name: 'param_perId',
                type: 'string',
                mapping: 'perId'
            }, {
                name: 'param_perNombre',
                type: 'string',
                mapping: 'perNombre'
            }]
    })
});

personaStorePersona.on('beforeload', function(my, e) {
    personaMascaraPersona.show();
});
personaStorePersona.on('load', function(my, e) {
    personaMascaraPersona.hide();
});

function personaCargadoInicial(){
    personaStorePersona.load();
}
