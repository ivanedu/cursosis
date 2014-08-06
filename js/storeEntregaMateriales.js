var entregamaterialesMascaraUniveridadRender;
var entregamaterialesMascaraPersonasPresenciales;
var entregamaterialesMascaraPersona;

var entregamaterialesStoreUniversidadRender = new Ext.data.Store({
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
var entregamaterialesStorePersonasPresenciales = new Ext.data.Store({
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
                name: 'param_materiales',
                type: 'number',
                mapping: 'materiales'
            }, {
                name: 'param_materiales',
                type: 'number',
                mapping: 'materiales'
            }]
    })
});
var entregamaterialesStorePersona = new Ext.data.Store({
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

var entregamaterialesEnlaceInicial=true;

entregamaterialesStoreUniversidadRender.on('beforeload', function(my, e) {
    entregamaterialesMascaraUniveridadRender.show();
});
entregamaterialesStoreUniversidadRender.on('load', function(my, e) {
    entregamaterialesMascaraUniveridadRender.hide();
    if(entregamaterialesEnlaceInicial)entregamaterialesStorePersonasPresenciales.load();
});
entregamaterialesStorePersonasPresenciales.on('beforeload', function(my, e) {
    entregamaterialesMascaraPersonasPresenciales.show();
});
entregamaterialesStorePersonasPresenciales.on('load', function(my, e) {
    entregamaterialesMascaraPersonasPresenciales.hide();
    if(entregamaterialesEnlaceInicial)entregamaterialesStorePersona.load();
});
entregamaterialesStorePersona.on('beforeload', function(my, e) {
    entregamaterialesMascaraPersona.show();
});
entregamaterialesStorePersona.on('load', function(my, e) {
    entregamaterialesMascaraPersona.hide();
    if(entregamaterialesEnlaceInicial)entregamaterialesEnlaceInicial=false;
});

function entregamaterialesCargadoInicial(){
    entregamaterialesEnlaceInicial=true;
    entregamaterialesStoreUniversidadRender.load();
}