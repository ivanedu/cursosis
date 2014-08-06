var pagocongresoMascaraUniversidadRender;
var pagocongresoMascaraPersona;

var pagocongresoStoreUniversidadRender = new Ext.data.Store({
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
var pagocongresoStorePersona = new Ext.data.Store({
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

var pagocongresoEnlaceInicial = true;
pagocongresoStoreUniversidadRender.on('beforeload', function(my, e) {
    pagocongresoMascaraUniversidadRender.show();
});
pagocongresoStoreUniversidadRender.on('load', function(my, e) {
    pagocongresoMascaraUniversidadRender.hide();
    if(pagocongresoEnlaceInicial)pagocongresoStorePersona.load();
});
pagocongresoStorePersona.on('beforeload', function(my, e) {
    pagocongresoMascaraPersona.show();
});
pagocongresoStorePersona.on('load', function(my, e) {
    pagocongresoMascaraPersona.hide();
    if(pagocongresoEnlaceInicial)pagcongresoEnlaceInicial = false;
});

function pagocongresoCargadoInicial()
{
    pagocongresoEnlaceInicial= true;
    pagocongresoStoreUniversidadRender.load();
}