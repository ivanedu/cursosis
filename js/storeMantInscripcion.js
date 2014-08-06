var mantenedorMascaraInscripcion;

var mantenedorStoreInscripcion = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: 'controlador/controladorInscripcion.php',
        method: 'POST'
    }), baseParams: {
        opcion: 'listarPagina',
        start: 0,
        limit: 10
    },
    reader: new Ext.data.JsonReader({
        root: 'datos',
        totalProperty: 'total',
        id: 'idINSCRIPCION',
        fields: [{
                name: 'param_idINSCRIPCION',
                type: 'number',
                mapping: 'idINSCRIPCION'
            }, {
                name: 'param_presencial',
                type: 'number',
                mapping: 'presencial'
            }, {
                name: 'param_carnet',
                type: 'number',
                mapping: 'carnet'
            }, {
                name: 'param_materiales',
                type: 'number',
                mapping: 'materiales'
            }, {
                name: 'param_fecha',
                type: 'string',
                mapping: 'fecha'
            }, {
                name: 'param_certificado',
                type: 'string',
                mapping: 'certificado'
            }, {
                name: 'param_dni',
                type: 'string',
                mapping: 'dni'
            }, {
                name: 'param_tipo',
                type: 'number',
                mapping: 'tipo'
            }]
    })
});

mantenedorStoreInscripcion.on('beforeload', function(my, e) {
    mantenedorMascaraInscripcion.show();
});
mantenedorStoreInscripcion.on('load', function(my, e) {
    mantenedorMascaraInscripcion.hide();
    if(inscripcionEnlaceInicial)inscripcionEnlaceInicial=false;
});


function mantInscripcionCargadoInicial(){
    inscripcionEnlaceInicial=true;
    mantenedorStoreInscripcion.load();
}
