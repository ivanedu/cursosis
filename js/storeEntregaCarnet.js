var entregacarnetMascaraUniveridadRender;
var entregacarnetMascaraPersonasPresenciales;
var entregacarnetMascaraPersona;

var entregacarnetStoreUniversidadRender = new Ext.data.Store({
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
var entregacarnetStorePersonasPresenciales = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: 'controlador/controladorPersona.php',
        method: 'POST'
    }), baseParams: {
        opcion: 'listarpresenciales',
        start:0,
        limit:10
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
                name: 'param_idUNIVERSIDAD',
                type: 'number',
                mapping: 'idUNIVERSIDAD'
            }, {
                name: 'param_carnet',
                type: 'number',
                mapping: 'carnet'
            }, {
                name: 'param_materiales',
                type: 'number',
                mapping: 'materiales'
            }]
    })
});
var entregacarnetStorePersona = new Ext.data.Store({
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

var entregacarnetEnlaceInicial=true;

entregacarnetStoreUniversidadRender.on('beforeload', function(my, e) {
    entregacarnetMascaraUniveridadRender.show();
});
entregacarnetStoreUniversidadRender.on('load', function(my, e) {
    entregacarnetMascaraUniveridadRender.hide();
    if(entregacarnetEnlaceInicial)entregacarnetStorePersonasPresenciales.load();
});
entregacarnetStorePersonasPresenciales.on('beforeload', function(my, e) {
    entregacarnetMascaraPersonasPresenciales.show();
});
entregacarnetStorePersonasPresenciales.on('load', function(my, e) {
    entregacarnetMascaraPersonasPresenciales.hide();
    if(entregacarnetEnlaceInicial)entregacarnetStorePersona.load();
});
entregacarnetStorePersona.on('beforeload', function(my, e) {
    entregacarnetMascaraPersona.show();
});
entregacarnetStorePersona.on('load', function(my, e) {
    entregacarnetMascaraPersona.hide();
    if(entregacarnetEnlaceInicial)entregacarnetEnlaceInicial=false;
});

function entregacarnetCargadoInicial(){
    entregacarnetEnlaceInicial=true;
    entregacarnetStoreUniversidadRender.load();
}