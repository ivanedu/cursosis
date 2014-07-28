var tiporelacionMascaraTipoRelacion;

var tiporelacionStoreTipoRelacion = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: 'controlador/controladorTipoRelacion.php',
        method: 'POST'
    }), baseParams: {
        opcion: 'listarpagina',
        start: 0,
        limit: 10
    },
    reader: new Ext.data.JsonReader({
        root: 'datos',
        totalProperty: 'total',
        id: 'tiprelId',
        fields: [{
                name: 'param_tiprelId',
                type: 'number',
                mapping: 'tiprelId'
            }, {
                name: 'param_tiprelNombre',
                type: 'string',
                mapping: 'tiprelNombre'
            }]
    })
});

tiporelacionStoreTipoRelacion.on('beforeload', function(my, e) {
    tiporelacionMascaraTipoRelacion.show();
});
tiporelacionStoreTipoRelacion.on('load', function(my, e) {
    tiporelacionMascaraTipoRelacion.hide();
});

function tiporelacionCargadoInicial(){
    tiporelacionStoreTipoRelacion.load();
}
