var inscripcionMascaraInscripcion;
var inscripcionMascaraUniversidad;
var inscripcionMascaraUniveridadRender;
var inscripcionMascaraDepartamento;
var inscripcionMascaraPersona;

var inscripcionStoreInscripcion = new Ext.data.Store({
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
                type: 'number',
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

var inscripcionStoreUniversidad = new Ext.data.Store({
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

var inscripcionStoreUniversidadRender = new Ext.data.Store({
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

var inscripcionStoreDepartamento = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: 'controlador/controladorDepartamento.php',
        method: 'POST'
    }), baseParams: {
        opcion: 'listarTodo'
    },
    reader: new Ext.data.JsonReader({
        root: 'datos',
        totalProperty: 'total',
        id: 'dni',
        fields: [{
                name: 'param_idDEPARTAMENTO',
                type: 'string',
                mapping: 'idDEPARTAMENTO'
            }, {
                name: 'param_nombre',
                type: 'string',
                mapping: 'nombre'
            }]
    })
});

var inscripcionStorePersona = new Ext.data.Store({
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

inscripcionStoreDepartamento.on('beforeload', function(my, e) {
    inscripcionMascaraDepartamento.show();
});
inscripcionStoreDepartamento.on('load', function(my, e) {
    inscripcionMascaraDepartamento.hide();
    if(inscripcionEnlaceInicial)inscripcionStoreUniversidad.load();
});
inscripcionStoreUniversidad.on('beforeload', function(my, e) {
    inscripcionMascaraUniversidad.show();
});
inscripcionStoreUniversidad.on('load', function(my, e) {
    inscripcionMascaraUniversidad.hide();
    if(inscripcionEnlaceInicial)inscripcionStorePersona.load();
});
inscripcionStorePersona.on('beforeload', function(my, e) {
    inscripcionMascaraPersona.show();
});
inscripcionStorePersona.on('load', function(my, e) {
    inscripcionMascaraPersona.hide();
    if(inscripcionEnlaceInicial)inscripcionStoreUniversidadRender.load();
});
inscripcionStoreUniversidadRender.on('beforeload', function(my, e) {
    inscripcionMascaraUniveridadRender.show();
});
inscripcionStoreUniversidadRender.on('load', function(my, e) {
    inscripcionMascaraUniveridadRender.hide();
    if(inscripcionEnlaceInicial)inscripcionStoreInscripcion.load();
});
inscripcionStoreInscripcion.on('beforeload', function(my, e) {
    inscripcionMascaraInscripcion.show();
});
inscripcionStoreInscripcion.on('load', function(my, e) {
    inscripcionMascaraInscripcion.hide();
    if(inscripcionEnlaceInicial)inscripcionEnlaceInicial=false;
});


function inscripcionCargadoInicial(){
    inscripcionEnlaceInicial=true;
    inscripcionStoreDepartamento.load();
}