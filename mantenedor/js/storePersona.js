var personaMascaraPersona;

var personaStorePersona = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: 'controlador/controladorPersona.php',
        method: 'POST'
    }), baseParams: {
        opcion: 'listarpagina',
        start: 0,
        limit: 10
    },
    reader: new Ext.data.JsonReader({
        root: 'datos',
        totalProperty: 'total',
        id: 'perId',
        fields: [{
                name: 'param_perId',
                type: 'number',
                mapping: 'perId'
            }, {
                name: 'param_perNombre',
                type: 'string',
                mapping: 'perNombre'
            }, {
                name: 'param_perApePaterno',
                type: 'string',
                mapping: 'perApePaterno'
            }, {
                name: 'param_perApeMaterno',
                type: 'string',
                mapping: 'perApeMaterno'
            }, {
                name: 'param_perEdad',
                type: 'number',
                mapping: 'perEdad'
            }, {
                name: 'param_perSexo',
                type: 'string',
                mapping: 'perSexo'
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
