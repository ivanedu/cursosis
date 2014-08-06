var pagoprecongresoMascaraUniversidadRender;
var pagoprecongresoMascaraPersona;

var pagoprecongresoStoreUniversidadRender = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: 'controlador/controladorUniversidad.php',
        method: 'POST'
    }), baseParams: {
        opcion: 'listarTodo'
    },
    reader: new Ext.data.JsonReader({
        root: 'datos',
        totalProperty: 'total',
        id: 'dni',
        fields: [{
                name: 'param_idUNIVERSIDAD',
                type: 'number',
                mapping: 'idUNIVERSIDAD'
            }, {
                name: 'param_nombre',
                type: 'string',
                mapping: 'nombre'
            }]
    })
});
var pagoprecongresoStorePersona = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: 'controlador/controladorPersona.php',
        method: 'POST'
    }), baseParams: {
        opcion: 'listarPaginaIns',
        start: 0,
        limit: 10
    },
    reader: new Ext.data.JsonReader({
        root: 'datos',
        totalProperty: 'total',
        id: 'dni',
        fields: [{
                name: 'param_dni',
                type: 'string',
                mapping: 'dni'
            }, {
                name: 'param_nombre',
                type: 'string',
                mapping: 'nombre'
            }, {
                name: 'param_ape_paterno',
                type: 'string',
                mapping: 'ape_paterno'
            }, {
                name: 'param_ape_materno',
                type: 'string',
                mapping: 'ape_materno'
            }, {
                name: 'param_email',
                type: 'number',
                mapping: 'email'
            }, {
                name: 'param_telefono',
                type: 'string',
                mapping: 'telefono'
            }, {
                name: 'param_codigoUni',
                type: 'string',
                mapping: 'codigoUni'
            }, {
                name: 'param_direccion',
                type: 'string',
                mapping: 'direccion'
            }, {
                name: 'param_idUNIVERSIDAD',
                type: 'number',
                mapping: 'idUNIVERSIDAD'
            }, {  
                name: 'param_tipo',
                type: 'number',
                mapping: 'tipo'
            }]
    })
});

var pagoprecongresoEnlaceInicial = true;
pagoprecongresoStoreUniversidadRender.on('beforeload', function(my, e) {
    pagoprecongresoMascaraUniversidadRender.show();
});
pagoprecongresoStoreUniversidadRender.on('load', function(my, e) {
    pagoprecongresoMascaraUniversidadRender.hide();
    if(pagoprecongresoEnlaceInicial)pagoprecongresoStorePersona.load();
});
pagoprecongresoStorePersona.on('beforeload', function(my, e) {
    pagoprecongresoMascaraPersona.show();
});
pagoprecongresoStorePersona.on('load', function(my, e) {
    pagoprecongresoMascaraPersona.hide();
    if(pagoprecongresoEnlaceInicial)pagcongresoEnlaceInicial = false;
});

function pagoprecongresoCargadoInicial()
{
    pagoprecongresoEnlaceInicial= true;
    pagoprecongresoStoreUniversidadRender.load();
}