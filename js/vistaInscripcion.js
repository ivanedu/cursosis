function getVistaInscripcion() {

    inscripcionMascaraInscripcion = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Inscripcion : Store Inscripcion..."});
    inscripcionMascaraUniversidad = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Universidad : Store InscripcionUniversidad..."});
    inscripcionMascaraUniveridadRender = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando UniversidadRender : Store InscripcionUniversidadRender..."});
    inscripcionMascaraDepartamento = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Departamento : Store InscripcionDepartamento..."});
    inscripcionCargadoInicial();
    
    var ins_dni = new Ext.form.NumberField({
        fieldLabel: '<span>Dni</span><span style="color:red;font-weight:bold">*</span>',
        id: 'ins_dni',
        width: 150,
        allowBlank: false,
        enableKeyEvents: true,
        maxLength: 8,
        minLength: 8,
        maxLengthText: 'Max 8 dígitos',
        minLengthText: 'min 8 dígitos',
        listeners: {
            keypress: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    //
                }
            }
        }
    });
    var ins_btnBuscar = new Ext.Button({
        id: 'ins_btnBuscar',
        width: 100,
        iconCls: 'search',
        iconAlign: 'left',
        text: 'Buscar',
        listeners: {
            click: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    //
                }
            }
        }
    });
    var ins_btnIncorrecto = new Ext.Button({
        id: 'ins_btnIncorrecto',
        width: 100,
        iconCls: 'delete',
        iconAlign: 'left',
        text: 'Incorrecto',
        listeners: {
            click: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    //
                }
            }
        }
    });
    var ins_nombre = new Ext.form.TextField({
        fieldLabel: '<span>Nombre</span><span style="color:red;font-weight:bold">*</span>',
        id: 'ins_nombre',
        width: '150',
        allowBlank: false,
        enableKeyEvents: true,
        maxLength: 30,
        minLength: 3,
        maxLengthText: 'Max 30 caracteres',
        minLengthText: 'min 3 caracteres',
        listeners: {
            keypress: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    guardarRegistroPersona();
                } else {
                    var ascii = evt.getKey();
                    if (!((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122) || ascii == evt.SPACE || ascii == evt.DELETE) || ascii == 46)
                    {
                        evt.stopEvent();
                    }
                }
            }
        }
    });
    var ins_ape_paterno = new Ext.form.TextField({
        fieldLabel: '<span>Apellido Paterno</span><span style="color:red;font-weight:bold">*</span>',
        id: 'ins_ape_paterno',
        width: '150',
        allowBlank: false,
        enableKeyEvents: true,
        maxLength: 30,
        minLength: 3,
        maxLengthText: 'Max 30 caracteres',
        minLengthText: 'min 3 caracteres',
        listeners: {
            keypress: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    guardarRegistroPersona();
                } else {
                    var ascii = evt.getKey();
                    if (!((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122) || ascii == evt.SPACE || ascii == evt.DELETE) || ascii == 46)
                    {
                        evt.stopEvent();
                    }
                }
            }
        }
    });
    var ins_ape_materno = new Ext.form.TextField({
        fieldLabel: '<span>Apellido Materno</span><span style="color:red;font-weight:bold">*</span>',
        id: 'ins_ape_materno',
        width: '150',
        allowBlank: false,
        enableKeyEvents: true,
        maxLength: 30,
        minLength: 3,
        maxLengthText: 'Max 30 caracteres',
        minLengthText: 'min 3 caracteres',
        listeners: {
            keypress: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    guardarRegistroPersona();
                } else {
                    var ascii = evt.getKey();
                    if (!((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122) || ascii == evt.SPACE || ascii == evt.DELETE) || ascii == 46)
                    {
                        evt.stopEvent();
                    }
                }
            }
        }
    });
    var ins_email = new Ext.form.TextField({
        fieldLabel: '<span>Email</span><span style="color:red;font-weight:bold">*</span>',
        id: 'ins_email',
        width: '150',
        allowBlank: false,
        enableKeyEvents: true,
        maxLength: 30,
        minLength: 0,
        maxLengthText: 'Max 30 caracteres',
        minLengthText: 'min 0 caracteres',
        listeners: {
            keypress: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    guardarRegistroPersona();
                } else {
                    var ascii = evt.getKey();
                    if (!((ascii >= 64 && ascii <= 90) || (ascii >= 48 && ascii <= 57) || (ascii >= 45 && ascii <= 46) || (ascii == 95) || (ascii >= 97 && ascii <= 122) || ascii == evt.SPACE || ascii == evt.DELETE) || ascii == 46)
                    {
                        evt.stopEvent();
                    }
                }
            }
        }
    });
    var ins_telefono = new Ext.form.TextField({
        fieldLabel: '<span>Telefono</span><span style="color:red;font-weight:bold">*</span>',
        id: 'ins_telefono',
        width: '150',
        allowBlank: false,
        enableKeyEvents: true,
        maxLength: 30,
        minLength: 0,
        maxLengthText: 'Max 30 caracteres',
        minLengthText: 'min 0 caracteres',
        listeners: {
            keypress: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    guardarRegistroPersona();
                } else {
                    var ascii = evt.getKey();
                    if (!((ascii >= 48 && ascii <= 57) || (ascii == 35) || (ascii == 42) || (ascii == 45) || ascii == evt.SPACE || ascii == evt.DELETE) || ascii == 46)
                    {
                        evt.stopEvent();
                    }
                }
            }
        }
    });
    var ins_tipo_estudiante = new Ext.form.Radio({
        boxLabel: 'Estudiante',
        width: 150,
        name: 'tipo',
        inputValue: 0
    });
    var ins_tipo_profesional = new Ext.form.Radio({
        boxLabel: 'Profesional',
        width: 150,
        name: 'tipo',
        inputValue: 1
    });
    var ins_tipo = new Ext.form.RadioGroup({
        fieldLabel: '<span>Tipo</span><span style="color:red;font-weight:bold">*</span>',
        id: 'ins_tipo',
        allowBlank: false,
        items: [
            ins_tipo_estudiante,
            ins_tipo_profesional
        ]
    });
    var ins_codigoUni = new Ext.form.NumberField({
        fieldLabel: '<span>Codigo Universitario</span><span style="color:red;font-weight:bold">*</span>',
        id: 'ins_codigoUni',
        width: '150',
        allowBlank: false,
        enableKeyEvents: true,
        maxLength: 20,
        minLength: 5,
        maxLengthText: 'Max 20 dígitos',
        minLengthText: 'min 5 dígitos',
        listeners: {
            keypress: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    guardarRegistroPersona();
                }
            }
        }
    });
    var ins_tpl_idUniversidad = new Ext.XTemplate('<tpl for="."><div class="search-item"><div class="name">{param_nombre}</div></div></tpl>');
    var ins_idUniversidad = new Ext.form.ComboBox({
        id: 'ins_idUniversidad',
        fieldLabel: '<span>Universidad</span><span style="color:red;font-weight:bold">*</span>',
        store: inscripcionStoreUniversidad,
        valueField: 'param_idUNIVERSIDAD',
        displayField: 'param_nombre',
        emptyText: 'Seleccione...',
        forceSelection: true,
        autoScroll: true,
        allowBlank: false,
        triggerAction: 'all',
        width: 160,
        maxHeight: 100,
        minChars: 1,
        tpl: ins_tpl_idUniversidad,
        itemSelector: 'div.search-item'
    });
    var ins_tpl_idDepartamento = new Ext.XTemplate('<tpl for="."><div class="search-item"><div class="name">{param_nombre}</div></div></tpl>');
    var ins_idDepartamento = new Ext.form.ComboBox({
        id: 'ins_idDepartamento',
        fieldLabel: '<span>Departamento</span><span style="color:red;font-weight:bold">*</span>',
        store: inscripcionStoreDepartamento,
        valueField: 'param_idUNIVERSIDAD',
        displayField: 'param_nombre',
        emptyText: 'Seleccione...',
        forceSelection: true,
        autoScroll: true,
        allowBlank: false,
        triggerAction: 'all',
        width: 160,
        maxHeight: 100,
        minChars: 1,
        tpl: ins_tpl_idDepartamento,
        itemSelector: 'div.search-item'
    });

    var formularioVistaInscripcion = new Ext.form.FormPanel({
        title: 'Formulario Registro Inscripcion',
        padding: '10px 10px 10px 10px',
        labelAlign: 'left',
        items: [
            {
                border: false,
                layout: 'column',
                padding: '5px 0px 20px 5px',
                items: [
                    {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_dni]
                    }, {
                        border: false,
                        width: 150,
                        layout: 'form',
                        items: [ins_btnBuscar]
                    }, {
                        border: false,
                        width: 150,
                        layout: 'form',
                        items: [ins_btnIncorrecto]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 20px 5px',
                items: [
                    {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_nombre]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 20px 5px',
                items: [
                    {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_ape_paterno]
                    }, {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_ape_materno]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 20px 5px',
                items: [
                    {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_email]
                    }, {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_telefono]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 20px 5px',
                items: [
                    {
                        border: false,
                        width: 400,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_tipo]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 20px 5px',
                items: [
                    {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_codigoUni]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 20px 5px',
                items: [
                    {
                        border:false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_idDepartamento]
                    },{
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 110,
                        items: [ins_idUniversidad]
                    }
                ]
            }
        ],
        buttonAlign: 'center',
        buttons: [{
                text: 'Guardar',
                iconCls: 'aceptar',
                width: 100,
                handler: function() {
                }
            }, {
                text: 'Cancelar',
                iconCls: 'close',
                width: 100,
                handler: function() {
                }
            }]
    });
    var panelVistaInscripcion = new Ext.Panel({
        layout: 'fit',
        border: false,
        items: formularioVistaInscripcion
    });
    return panelVistaInscripcion;
}
