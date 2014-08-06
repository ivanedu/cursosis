function getVistaPagoCongreso() {
    
    var pagcon_ventanaPopupBuscar;

    pagocongresoMascaraUniversidadRender = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Pago Congreso : Store UniversidadRender..."});
    pagocongresoMascaraPersona = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Pago Congreso : Store Persona..."});

    pagocongresoCargadoInicial();

    var pagcon_dni = new Ext.form.NumberField({
        fieldLabel: '<span>Dni</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_dni',
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
                    pagcon_buscarpagocongreso();
                }
            }
        }
    });
    var pagcon_btnBuscar = new Ext.Button({
        id: 'pagcon_btnBuscar',
        width: 100,
        iconCls: 'search',
        iconAlign: 'left',
        text: 'Buscar',
        listeners: {
            click: function(my, evt) {
                pagocongresoStorePersona.setBaseParam('nombre', '');
                pagocongresoStorePersona.setBaseParam('ape_paterno', '');
                pagocongresoStorePersona.setBaseParam('ape_materno', '');
                pagocongresoStorePersona.load();
                pagcon_abrirFormularioBuscar();
                pagcon_ventanaPopupBuscar.show();
            }
        }
    });
    var pagcon_idINSCRIPCION = new Ext.form.NumberField({
        fieldLabel: '<span>Nro Inscripción</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_idINSCRIPCION',
        width: 150,
        allowBlank: false,
        disabled: true,
        disabledClass: 'classDisabled'
    });
    var pagcon_perNombreCompleto = new Ext.form.TextField({
        fieldLabel: '<span>Nombre Completo</span><span style="color:red;font-weight:bold"></span>',
        id: 'pagcon_perNombreCompleto',
        width: 300,
        enableKeyEvents: true,
        disabled: true,
        disabledClass: 'classDisabled',
        listeners: {
            keypress: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    //
                }
            }
        }
    });
    var pagocon_tipo_sinpago = new Ext.form.Radio({
        boxLabel: 'Sin Pago',
        width: 150,
        checked: true,
        name: 'tipo',
        inputValue: 0
    });
    var pagocon_tipo_boleta = new Ext.form.Radio({
        boxLabel: 'Boleta',
        width: 150,
        name: 'tipo',
        inputValue: 1
    });
    var pagocon_tipo_voucher = new Ext.form.Radio({
        boxLabel: 'Voucher',
        width: 150,
        name: 'tipo',
        inputValue: 2
    });
    var pagcon_tipo = new Ext.form.RadioGroup({
        fieldLabel: '<span>Tipo Doc Pago</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_tipo',
        items: [
            pagocon_tipo_sinpago,
            pagocon_tipo_boleta,
            pagocon_tipo_voucher
        ],
        listeners: {
            change: function(objeto, checked) {
                switch (parseInt(checked.getGroupValue()))
                {
                    case 0:
                        pagcon_monto.setDisabled(true);
                        pagcon_fecha_fecha.setDisabled(true);
                        pagcon_fecha_tiempo.setDisabled(true);
                        pagcon_numComprobante.setDisabled(true);
                        pagcon_agente.setDisabled(true);
                        pagcon_nroOperacion.setDisabled(true);
                        pagcon_nombreBancario.setDisabled(true);
                        pagcon_enFisico.setDisabled(true);
                        pagcon_imagen.setDisabled(true);
                        pagcon_presencial.setDisabled(true);
                        break;
                    case 1:
                        pagcon_monto.setDisabled(false);
                        pagcon_fecha_fecha.setDisabled(false);
                        pagcon_fecha_tiempo.setDisabled(false);
                        pagcon_numComprobante.setDisabled(false);
                        pagcon_agente.setDisabled(true);
                        pagcon_nroOperacion.setDisabled(true);
                        pagcon_nombreBancario.setDisabled(true);
                        pagcon_enFisico.setDisabled(true);
                        pagcon_imagen.setDisabled(true);
                        pagcon_presencial.setDisabled(false);
                        break;
                    case 2:
                        pagcon_monto.setDisabled(false);
                        pagcon_fecha_fecha.setDisabled(false);
                        pagcon_fecha_tiempo.setDisabled(false);
                        pagcon_numComprobante.setDisabled(true);
                        pagcon_agente.setDisabled(false);
                        pagcon_nroOperacion.setDisabled(false);
                        pagcon_nombreBancario.setDisabled(false);
                        pagcon_enFisico.setDisabled(false);
                        pagcon_imagen.setDisabled(false);
                        pagcon_presencial.setDisabled(false);
                        break;
                    default:
                        break;
                }
            }
        }
    });
    var pagcon_fecha_fecha = new Ext.form.DateField({
        fieldLabel: '<span>Fecha</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_fecha_fecha',
        width: 150,
        value: new Date(),
        maxValue: new Date(),
        disabled: true,
        disabledClass: 'classDisabled'
    });
    var pagcon_fecha_tiempo = new Ext.form.TimeField({
        fieldLabel: '<span>Hora</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_fecha_tiempo',
        width: 150,
        value: new Date(),
        increment: 1,
        disabled: true,
        disabledClass: 'classDisabled'
    });
    var pagcon_monto = new Ext.form.NumberField({
        fieldLabel: '<span>Monto</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_monto',
        width: 150,
        enableKeyEvents: true,
        disabled: true,
        disabledClass: 'classDisabled',
        listeners: {
            keypress: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    //
                }
            }
        }
    });
    var pagcon_numComprobante = new Ext.form.TextField({
        fieldLabel: '<span>Nro Comprobante</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_numComprobante',
        width: 150,
        enableKeyEvents: true,
        disabled: true,
        disabledClass: 'classDisabled',
        listeners: {
            keypress: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    //
                }
            }
        }
    });
    var pagocon_agente_no = new Ext.form.Radio({
        boxLabel: 'No',
        width: 150,
        checked: true,
        name: 'agente',
        inputValue: 1
    });
    var pagocon_agente_si = new Ext.form.Radio({
        boxLabel: 'Si',
        width: 150,
        name: 'agente',
        inputValue: 2
    });
    var pagcon_agente = new Ext.form.RadioGroup({
        fieldLabel: '<span>Agente</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_agente',
        disabled: true,
        disabledClass: 'classDisabled',
        items: [
            pagocon_agente_no,
            pagocon_agente_si
        ]
    });
    var pagcon_nroOperacion = new Ext.form.NumberField({
        fieldLabel: '<span>Nro Operacion</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_nroOperacion',
        width: 150,
        enableKeyEvents: true,
        disabled: true,
        disabledClass: 'classDisabled',
        listeners: {
            keypress: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    //
                }
            }
        }
    });
    var pagcon_nombreBancario = new Ext.form.TextField({
        fieldLabel: '<span>Entidad Bancaria</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_nombreBancario',
        width: 150,
        enableKeyEvents: true,
        disabled: true,
        disabledClass: 'classDisabled',
        listeners: {
            keypress: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    //
                }
            }
        }
    });
    var pagocon_enFisico_no = new Ext.form.Radio({
        boxLabel: 'No',
        width: 150,
        checked: true,
        name: 'enFisico',
        inputValue: 1
    });
    var pagocon_enFisico_si = new Ext.form.Radio({
        boxLabel: 'Si',
        width: 150,
        name: 'enFisico',
        inputValue: 2
    });
    var pagcon_enFisico = new Ext.form.RadioGroup({
        fieldLabel: '<span>Fisico</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_enFisico',
        disabled: true,
        disabledClass: 'classDisabled',
        items: [
            pagocon_enFisico_no,
            pagocon_enFisico_si
        ]
    });
    var pagcon_imagen = new Ext.form.TextField({
        fieldLabel: '<span>Imagen</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_imagen',
        width: 150,
        enableKeyEvents: true,
        disabled: true,
        disabledClass: 'classDisabled',
        listeners: {
            keypress: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    //
                }
            }
        }
    });
    var pagcon_presencial_no = new Ext.form.Radio({
        boxLabel: 'No',
        width: 150,
        checked: true,
        name: 'presencial',
        inputValue: 1
    });
    var pagcon_presencial_si = new Ext.form.Radio({
        boxLabel: 'Si',
        width: 150,
        name: 'presencial',
        inputValue: 2
    });
    var pagcon_presencial = new Ext.form.RadioGroup({
        fieldLabel: '<span>Presencial</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_presencial',
        disabled: true,
        disabledClass: 'classDisabled',
        items: [
            pagcon_presencial_no,
            pagcon_presencial_si
        ]
    });

    var formularioVistaPagoCongreso = new Ext.form.FormPanel({
        title: 'Formulario Registro Pago Congreso',
        padding: '10px 10px 10px 10px',
        labelAlign: 'left',
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            fields: [
                {
                    name: 'pagcon_idINSCRIPCION',
                    type: 'number',
                    mapping: 'idINSCRIPCION'
                }, {
                    name: 'pagcon_perNombreCompleto',
                    type: 'string',
                    mapping: 'perNombreCompleto'
                }, {
                    name: 'pagcon_tipo',
                    type: 'number',
                    mapping: 'tipo'
                }, {
                    name: 'pagcon_fecha_fecha',
                    type: 'date',
                    mapping: 'fecha'
                }, {
                    name: 'pagcon_fecha_tiempo',
                    type: 'date',
                    mapping: 'fecha'
                }, {
                    name: 'pagcon_monto',
                    type: 'number',
                    mapping: 'monto'
                }, {
                    name: 'pagcon_numComprobante',
                    type: 'number',
                    mapping: 'numComprobante'
                }, {
                    name: 'pagcon_numComprobante',
                    type: 'string',
                    mapping: 'numComprobante'
                }, {
                    name: 'pagcon_agente',
                    type: 'number',
                    mapping: 'agente'
                }, {
                    name: 'pagcon_nroOperacion',
                    type: 'number',
                    mapping: 'nroOperacion'
                }, {
                    name: 'pagcon_nombreBancario',
                    type: 'string',
                    mapping: 'nombreBancario'
                }, {
                    name: 'pagcon_enFisico',
                    type: 'number',
                    mapping: 'enFisico'
                }, {
                    name: 'pagcon_imagen',
                    type: 'string',
                    mapping: 'imagen'
                }, {
                    name: 'pagcon_presencial',
                    type: 'number',
                    mapping: 'presencial'
                }
            ]
        }),
        items: [
            {
                border: false,
                layout: 'column',
                padding: '5px 0px 10px 5px',
                items: [
                    {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 100,
                        items: [pagcon_dni]
                    }, {
                        border: false,
                        width: 300,
                        layout: 'form',
                        items: [pagcon_btnBuscar]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 10px 5px',
                items: [
                    {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 100,
                        items: [pagcon_idINSCRIPCION]
                    }, {
                        border: false,
                        width: 500,
                        layout: 'form',
                        labelWidth: 120,
                        items: [pagcon_perNombreCompleto]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 10px 5px',
                items: [
                    {
                        border: false,
                        width: 400,
                        layout: 'form',
                        labelWidth: 100,
                        items: [pagcon_tipo]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 10px 5px',
                items: [
                    {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 100,
                        items: [pagcon_fecha_fecha]
                    }, {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 100,
                        items: [pagcon_fecha_tiempo]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 10px 5px',
                items: [{
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 100,
                        items: [pagcon_monto]
                    }, {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 120,
                        items: [pagcon_numComprobante]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 10px 5px',
                items: [{
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 100,
                        items: [pagcon_agente]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 10px 5px',
                items: [{
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 100,
                        items: [pagcon_nroOperacion]
                    }, {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 120,
                        items: [pagcon_nombreBancario]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 10px 5px',
                items: [{
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 100,
                        items: [pagcon_enFisico]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 10px 5px',
                items: [{
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 100,
                        items: [pagcon_imagen]
                    }
                ]
            }, {
                border: false,
                layout: 'column',
                padding: '5px 0px 10px 5px',
                items: [{
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 100,
                        items: [pagcon_presencial]
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
                    pagcon_guardarPagoCongreso();
                }
            }, {
                text: 'Cancelar',
                iconCls: 'close',
                width: 100,
                handler: function() {
                    pagcon_limpiar();
                    pagcon_dni.reset();
                    pagcon_dni.focus();
                }
            }]
    });
    formularioVistaPagoCongreso.getForm().on({
        actioncomplete: {
            fn: function() {
                pagcon_dni.focus();
            }
        },
        actionfailed: {
            fn: function() {
                pagcon_dni.focus();
            }
        },
    });
    function pagcon_limpiar()
    {
        pagcon_monto.setDisabled(true);
        pagcon_fecha_fecha.setDisabled(true);
        pagcon_fecha_tiempo.setDisabled(true);
        pagcon_numComprobante.setDisabled(true);
        pagcon_agente.setDisabled(true);
        pagcon_nroOperacion.setDisabled(true);
        pagcon_nombreBancario.setDisabled(true);
        pagcon_enFisico.setDisabled(true);
        pagcon_imagen.setDisabled(true);
        pagcon_presencial.setDisabled(true);

        pagcon_idINSCRIPCION.reset();
        pagcon_perNombreCompleto.reset();
        pagcon_tipo.reset();
        pagcon_monto.reset();
        pagcon_fecha_fecha.reset();
        pagcon_fecha_tiempo.reset();
        pagcon_numComprobante.reset();
        pagcon_agente.reset();
        pagcon_nombreBancario.reset();
        pagcon_enFisico.reset();
        pagcon_imagen.reset();
        pagcon_presencial.reset();
        pagcon_nroOperacion.reset();
    }

    function pagcon_buscarpagocongreso() {
        pagcon_limpiar();
        formularioVistaPagoCongreso.getForm().load({
            url: 'controlador/controladorPersona.php',
            waitMsg: 'Cargando...',
            params: {
                opcion: "buscarpagocongreso",
                dni: pagcon_dni.getValue()
            }
        });
    }
    function pagcon_validarFormulario()
    {
        if (pagcon_dni.isValid())
        {
            if (!(pagcon_fecha_fecha.isValid() && pagcon_fecha_tiempo.isValid() &&
                    pagcon_fecha_fecha.getValue() != '' && pagcon_fecha_tiempo.getValue() != ''))
            {
                verMessageBoxError('Debe digitar una fecha y/o hora correcto');
                return false;
            }
            if (pagcon_idINSCRIPCION.getValue() != '')
            {
                if (pagcon_tipo.getValue().getGroupValue() == 0)
                {
                    if (pagcon_enFisico.getValue().getGroupValue() == 1)
                    {
                        if (pagcon_presencial.getValue().getGroupValue() == 1)
                        {
                            return true;
                        } else
                        {
                            verMessageBoxError('No se puede tener el estado \'presencial\' en \'si\' cuando no se ha pagado');
                        }
                    } else
                    {
                        verMessageBoxError('No se puede tener el estado \'en fisico\' en \'si\' cuando no se ha pagado');
                    }
                } else if (pagcon_tipo.getValue().getGroupValue() == 1)
                {
                    if (pagcon_monto.getValue() != '')
                    {
                        if (pagcon_numComprobante.getValue() != '')
                        {
                            return true;
                        } else {
                            verMessageBoxError('Debe digitar número de comprobante de la boleta');
                        }
                    } else {
                        verMessageBoxError('Debe digitar el monto del pago');
                    }
                } else {
                    if (pagcon_monto.getValue() != '')
                    {
                        if (pagcon_nroOperacion.getValue() != '')
                        {
                            if (pagcon_nombreBancario.getValue() != '')
                            {
                                return true;
                            } else
                            {
                                verMessageBoxError('Debe digitar el nombre de la entidad bancaria');
                            }
                        } else {
                            verMessageBoxError('Debe digitar número de operación del voucher');
                        }
                    } else {
                        verMessageBoxError('Debe digitar el monto del pago');
                    }
                }
            } else
            {
                verMessageBoxError('Digite un dni inscrito');
            }
        } else
        {
            verMessageBoxError("Digite un dni");
        }
        return false;
    }
    function pagcon_guardarPagoCongreso()
    {
        if (pagcon_validarFormulario())
        {
            Ext.MessageBox.wait('Espere por favor...', "REGISTRO");
            Ext.Ajax.request({
                url: 'controlador/controladorInscripcion.php',
                params: {
                    opcion: "registropago",
                    idINSCRIPCION: pagcon_idINSCRIPCION.getValue(),
                    tipo: pagcon_tipo.getValue().getGroupValue(),
                    presencial: pagcon_presencial.getValue().getGroupValue()
                },
                success: function(response) {
                    var datos = Ext.util.JSON.decode(response.responseText);
                    if (datos.resultado)
                    {
                        var fecha = new Date(pagcon_fecha_fecha.getValue());
                        var hora = pagcon_fecha_tiempo.getValue();
                        var fechaCompleta = new Date(fecha.toDateString() + " " + hora);
                        if (pagcon_tipo.getValue().getGroupValue() == 1)
                        {
                            //Boleta
                            Ext.Ajax.request({
                                url: 'controlador/controladorBoleta.php',
                                params: {
                                    opcion: "registropago",
                                    idINSCRIPCION: pagcon_idINSCRIPCION.getValue(),
                                    fecha: fechaCompleta,
                                    monto: pagcon_monto.getValue(),
                                    numComprobante: pagcon_numComprobante.getValue()
                                },
                                success: function(response) {
                                    var datos = Ext.util.JSON.decode(response.responseText);
                                    if (datos.resultado)
                                    {
                                        verMessageBoxExito(datos.mensaje);
                                        pagcon_limpiar();
                                        pagcon_dni.reset();
                                        pagcon_dni.focus();
                                    } else {
                                        verMessageBoxError(datos.mensaje);
                                    }
                                }
                            });
                        } else if (pagcon_tipo.getValue().getGroupValue() == 2) {
                            Ext.Ajax.request({
                                url: 'controlador/controladorVoucher.php',
                                params: {
                                    opcion: "registropago",
                                    nroOperacion: pagcon_nroOperacion.getValue(),
                                    fecha: fechaCompleta,
                                    monto: pagcon_monto.getValue(),
                                    agente: pagcon_agente.getValue().getGroupValue(),
                                    nombreBancario: pagcon_nombreBancario.getValue(),
                                    imagen: pagcon_imagen.getValue(),
                                    enFisico: pagcon_enFisico.getValue().getGroupValue(),
                                    idINSCRIPCION: pagcon_idINSCRIPCION.getValue()
                                },
                                success: function(response) {
                                    var datos = Ext.util.JSON.decode(response.responseText);
                                    if (datos.resultado)
                                    {
                                        verMessageBoxExito(datos.mensaje);
                                        pagcon_limpiar();
                                        pagcon_dni.reset();
                                        pagcon_dni.focus();
                                    } else {
                                        verMessageBoxError(datos.mensaje);
                                    }
                                }
                            });
                        }
                    } else {
                        verMessageBoxError(datos.mensaje);
                    }
                }
            }
            );
        }
    }
    
    
    function pagcon_abrirFormularioBuscar() {
        var param_nombre2 = new Ext.form.TextField({
            fieldLabel: '<span>Nombre</span><span style="color:red;font-weight:bold">*</span>',
            id: 'param_nombre2',
            width: 150,
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
                        pagocongresoStorePersona.setBaseParam('nombre', Ext.getCmp('param_nombre2').getValue());
                        pagocongresoStorePersona.setBaseParam('ape_paterno', Ext.getCmp('param_ape_paterno2').getValue());
                        pagocongresoStorePersona.setBaseParam('ape_materno', Ext.getCmp('param_ape_materno2').getValue());
                        pagocongresoStorePersona.load();
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
        var param_ape_paterno2 = new Ext.form.TextField({
            fieldLabel: '<span>Apellido Paterno</span><span style="color:red;font-weight:bold">*</span>',
            id: 'param_ape_paterno2',
            width: 150,
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
                        pagocongresoStorePersona.setBaseParam('nombre', Ext.getCmp('param_nombre2').getValue());
                        pagocongresoStorePersona.setBaseParam('ape_paterno', Ext.getCmp('param_ape_paterno2').getValue());
                        pagocongresoStorePersona.setBaseParam('ape_materno', Ext.getCmp('param_ape_materno2').getValue());
                        pagocongresoStorePersona.load();
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
        var param_ape_materno2 = new Ext.form.TextField({
            fieldLabel: '<span>Apellido Materno</span><span style="color:red;font-weight:bold">*</span>',
            id: 'param_ape_materno2',
            width: 150,
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
                        pagocongresoStorePersona.setBaseParam('nombre', Ext.getCmp('param_nombre2').getValue());
                        pagocongresoStorePersona.setBaseParam('ape_paterno', Ext.getCmp('param_ape_paterno2').getValue());
                        pagocongresoStorePersona.setBaseParam('ape_materno', Ext.getCmp('param_ape_materno2').getValue());
                        pagocongresoStorePersona.load();
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
        var param_gridPersona = new Ext.grid.GridPanel({
            title: 'Persona',
            region: 'south',
            store: pagocongresoStorePersona,
            border: false,
            stripeRows: true,
            itemSelector: true,
            height: 200,
            tbar: [
            ],
            listeners: {
                rowdblclick: function(objecto, rowIndex, objecto) {
                    var dniSelec = param_gridPersona.getStore().getAt(rowIndex).get('param_dni');
                    pagcon_ventanaPopupBuscar.close();
                    pagcon_dni.setValue(dniSelec);
                    pagcon_dni.focus();
                }
            },
            bbar: new Ext.PagingToolbar({
                store: pagocongresoStorePersona,
                displayInfo: true,
                autoWidth: true,
                beforePageText: 'Página',
                afterPageText: 'de {0}',
                displayMsg: '{0} - {1} de {2} Personas',
                emptyMsg: 'No hay Personas para mostrar',
                pageSize: 10
            }),
            columns:
                    [new Ext.grid.RowNumberer(),
                        {
                            header: 'DNI',
                            dataIndex: 'param_dni',
                            sortable: true,
                            width: 60
                        }, {
                            header: 'Nombre',
                            dataIndex: 'param_nombre',
                            sortable: true,
                            width: 150
                        }, {
                            header: 'Apellido Paterno',
                            dataIndex: 'param_ape_paterno',
                            sortable: true,
                            width: 100
                        }, {
                            header: 'Apellido Materno',
                            dataIndex: 'param_ape_materno',
                            sortable: true,
                            width: 100
                        }, {
                            header: 'Universidad',
                            dataIndex: 'param_idUNIVERSIDAD',
                            sortable: true,
                            //hidden:true,
                            width: 200,
                            renderer: function(val) {
                                var records = pagocongresoStoreUniversidadRender.getRange();
                                var valor = '';
                                for (var i = 0; i < records.length; i++) {
                                    if (records[i].get('param_idUNIVERSIDAD') == val) {
                                        valor = records[i].get('param_nombre');
                                        break;
                                    }
                                }
                                return valor;
                            }
                        }],
            selModel: new Ext.grid.RowSelectionModel({singleSelect: true})
        });
        var param_formularioBuscarInscripcion = new Ext.form.FormPanel({
            border: false,
            region: 'center',
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [
                {
                    border: false,
                    layout: 'column',
                    padding: '5px 0px 10px 5px',
                    items: [
                        {
                            border: false,
                            width: 250,
                            layout: 'form',
                            labelWidth: 110,
                            items: [param_ape_paterno2]
                        }, {
                            border: false,
                            width: 250,
                            layout: 'form',
                            labelWidth: 110,
                            items: [param_ape_materno2]
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
                            items: [param_nombre2]
                        }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [{
                    text: 'Buscar',
                    iconCls: 'search',
                    width: 100,
                    handler: function() {
                        pagocongresoStorePersona.setBaseParam('nombre', Ext.getCmp('param_nombre2').getValue());
                        pagocongresoStorePersona.setBaseParam('ape_paterno', Ext.getCmp('param_ape_paterno2').getValue());
                        pagocongresoStorePersona.setBaseParam('ape_materno', Ext.getCmp('param_ape_materno2').getValue());
                        pagocongresoStorePersona.load();

                    }
                }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    width: 100,
                    handler: function() {
                        //aqui
                        pagcon_ventanaPopupBuscar.close();
                    }
                }

            ]
        });
        var param_panelBuscarInscripcion = new Ext.Panel({
            labelAlign: 'top',
            //border: false,
            bodyStyle: 'padding: 10px;',
            widthLabel: 100,
            width: 700,
            height: 400,
            title: 'Panel',
            layout: 'border',
            items: [
                param_formularioBuscarInscripcion, param_gridPersona
            ]
        });
        pagcon_ventanaPopupBuscar = new Ext.Window({
            title: 'Buscar Inscripcion',
            closable: false,
            modal: true,
            width: 700,
            constrain: true,
            resizable: false,
            items: [param_panelBuscarInscripcion]
        });

    }
    var panelVistaPagoCongreso = new Ext.Panel({
        layout: 'fit',
        border: false,
        items: formularioVistaPagoCongreso
    }
    );
    return panelVistaPagoCongreso;
}