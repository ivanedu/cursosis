var relacionMascaraPersonaRelacionador;
var relacionMascaraPersonaRelacionadorRender;
var relacionMascaraPersonaRelacionado;
var relacionMascaraPersonaRelacionadoRender;
var relacionMascaraTipoRelacion;
var relacionMascaraTipoRelacionRender;
var relacionMascaraRelacion;

var relacionStorePersonaRelacionador = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: 'controlador/controladorPersona.php',
        method: 'POST'
    }), baseParams: {
        opcion: 'listartodo'
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
                name: 'param_perNombreCompleto',
                type: 'string',
                mapping: 'perNombreCompleto'
            }]
    })
});
var relacionStorePersonaRelacionadorRender = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: 'controlador/controladorPersona.php',
        method: 'POST'
    }), baseParams: {
        opcion: 'listartodo'
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
                name: 'param_perNombreCompleto',
                type: 'string',
                mapping: 'perNombreCompleto'
            }]
    })
});
var relacionStorePersonaRelacionado = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: 'controlador/controladorPersona.php',
        method: 'POST'
    }), baseParams: {
        opcion: 'listartodo'
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
                name: 'param_perNombreCompleto',
                type: 'string',
                mapping: 'perNombreCompleto'
            }]
    })
});
var relacionStorePersonaRelacionadoRender = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: 'controlador/controladorPersona.php',
        method: 'POST'
    }), baseParams: {
        opcion: 'listartodo'
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
                name: 'param_perNombreCompleto',
                type: 'string',
                mapping: 'perNombreCompleto'
            }]
    })
});
var relacionStoreTipoRelacion = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: 'controlador/controladorTipoRelacion.php',
        method: 'POST'
    }), baseParams: {
        opcion: 'listartodo'
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
var relacionStoreTipoRelacionRender = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: 'controlador/controladorTipoRelacion.php',
        method: 'POST'
    }), baseParams: {
        opcion: 'listartodo'
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
var relacionStoreRelacion = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: 'controlador/controladorRelacion.php',
        method: 'POST'
    }), baseParams: {
        opcion: 'listarpagina',
        start: 0,
        limit: 10
    },
    reader: new Ext.data.JsonReader({
        root: 'datos',
        totalProperty: 'total',
        id: 'id',//cuando tiene varios primary key, poner 'id'
        fields: [{
                name: 'param_relId',
                type: 'number',
                mapping: 'relId'
            }, {
                name: 'param_perIdRelacionador',
                type: 'number',
                mapping: 'perIdRelacionador'
            }, {
                name: 'param_perIdRelacionado',
                type: 'number',
                mapping: 'perIdRelacionado'
            }, {
                name: 'param_tiprelId',
                type: 'number',
                mapping: 'tiprelId'
            }]
    })
});

var relacionEnlaceInicial=true;
relacionStorePersonaRelacionador.on('beforeload', function(my, e) {
    relacionMascaraPersonaRelacionador.show();
});
relacionStorePersonaRelacionador.on('load', function(my, e) {
    relacionMascaraPersonaRelacionador.hide();
    if(relacionEnlaceInicial)relacionStorePersonaRelacionadorRender.load();
});
relacionStorePersonaRelacionadorRender.on('beforeload', function(my, e) {
    relacionMascaraPersonaRelacionadorRender.show();
});
relacionStorePersonaRelacionadorRender.on('load', function(my, e) {
    relacionMascaraPersonaRelacionadorRender.hide();
    if(relacionEnlaceInicial)relacionStorePersonaRelacionado.load();
});
relacionStorePersonaRelacionado.on('beforeload', function(my, e) {
    relacionMascaraPersonaRelacionado.show();
});
relacionStorePersonaRelacionado.on('load', function(my, e) {
    relacionMascaraPersonaRelacionado.hide();
    if(relacionEnlaceInicial)relacionStorePersonaRelacionadoRender.load();
});
relacionStorePersonaRelacionadoRender.on('beforeload', function(my, e) {
    relacionMascaraPersonaRelacionadoRender.show();
});
relacionStorePersonaRelacionadoRender.on('load', function(my, e) {
    relacionMascaraPersonaRelacionadoRender.hide();
    if(relacionEnlaceInicial)relacionStoreTipoRelacion.load();
});
relacionStoreTipoRelacion.on('beforeload', function(my, e) {
    relacionMascaraTipoRelacion.show();
});
relacionStoreTipoRelacion.on('load', function(my, e) {
    relacionMascaraTipoRelacion.hide();
    if(relacionEnlaceInicial)relacionStoreTipoRelacionRender.load();
});
relacionStoreTipoRelacionRender.on('beforeload', function(my, e) {
    relacionMascaraTipoRelacionRender.show();
});
relacionStoreTipoRelacionRender.on('load', function(my, e) {
    relacionMascaraTipoRelacionRender.hide();
    if(relacionEnlaceInicial)relacionStoreRelacion.load();
});
relacionStoreRelacion.on('beforeload', function(my, e) {
    relacionMascaraRelacion.show();
});
relacionStoreRelacion.on('load', function(my, e) {
    relacionMascaraRelacion.hide();
    if(relacionEnlaceInicial)relacionEnlaceInicial=false;
});

function relacionCargadoInicial(){
    relacionEnlaceInicial=true;
    relacionStorePersonaRelacionador.load();
}
