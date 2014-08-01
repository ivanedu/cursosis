var personaMascaraPersona;
var personaMascaraUniversidad;
var personaMascaraUniveridadRender;

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
                name: 'param_pass',
                type: 'string',
                mapping: 'pass'
            }]
    })
});

var personaStoreUniversidad = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: 'controlador/controladorUniversidad.php',
        method: 'POST'
    }), baseParams: {
        opcion: 'listarTodo',
        start: 0,
        limit: 10
    },
    reader: new Ext.data.JsonReader({
        root: 'datos',
        totalProperty: 'total',
        id: 'dni',
        fields: [{
                name: 'param_idUNIVERSIDAD',
                type: 'string',
                mapping: 'idUNIVERSIDAD'
            }, {
                name: 'param_nombre',
                type: 'string',
                mapping: 'nombre'
            }]
    })
});

var personaStoreUniversidadRender = new Ext.data.Store({
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


var personaEnlaceInicial=true;
personaStoreUniversidad.on('beforeload', function(my, e) {
    personaMascaraUniversidad.show();
});
personaStoreUniversidad.on('load', function(my, e) {
    personaMascaraUniversidad.hide();
    if(personaEnlaceInicial)personaStoreUniversidadRender.load();
});

personaStoreUniversidadRender.on('beforeload', function(my, e) {
    personaMascaraUniveridadRender.show();
});
personaStoreUniversidadRender.on('load', function(my, e) {
    personaMascaraUniveridadRender.hide();
    if(personaEnlaceInicial)personaStorePersona.load();
});


personaStorePersona.on('beforeload', function(my, e) {
    personaMascaraPersona.show();
});
personaStorePersona.on('load', function(my, e) {
    personaMascaraPersona.hide();
    if(personaEnlaceInicial)personaEnlaceInicial=false;
});

function personaCargadoInicial(){
    personaEnlaceInicial=true;
    personaStoreUniversidad.load();
}