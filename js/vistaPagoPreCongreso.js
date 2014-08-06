function getVistaPagoPreCongreso() {
    var pagprecon_ventanaPopupBuscar;

    pagoprecongresoMascaraUniversidadRender = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Pago Pre Congreso : Store UniversidadRender..."});
    pagoprecongresoMascaraPersona = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando Pago Pre Congreso : Store Persona..."});

    pagoprecongresoCargadoInicial();
    
    var pagprecon_dni = new Ext.form.NumberField({
        fieldLabel: '<span>Dni</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagprecon_dni',
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
                    pagprecon_buscarpagoprecongreso();
                }
            }
        }
    });
    var pagprecon_btnBuscar = new Ext.Button({
        id: 'pagprecon_btnBuscar',
        width: 100,
        iconCls: 'search',
        iconAlign: 'left',
        text: 'Buscar',
        listeners: {
            click: function(my, evt) {
                pagoprecongresoStorePersona.setBaseParam('nombre', '');
                pagoprecongresoStorePersona.setBaseParam('ape_paterno', '');
                pagoprecongresoStorePersona.setBaseParam('ape_materno', '');
                pagoprecongresoStorePersona.load();
                pagprecon_abrirFormularioBuscar();
                pagprecon_ventanaPopupBuscar.show();
            }
        }
    });
    var pagprecon_idINSCRIPCION = new Ext.form.NumberField({
        fieldLabel: '<span>Nro Inscripción</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagprecon_idINSCRIPCION',
        width: 150,
        allowBlank: false,
        disabled: true,
        disabledClass: 'classDisabled'
    });
    var pagprecon_perNombreCompleto = new Ext.form.TextField({
        fieldLabel: '<span>Nombre Completo</span><span style="color:red;font-weight:bold"></span>',
        id: 'pagprecon_perNombreCompleto',
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
    var pagprecon_tipo_sinpago = new Ext.form.Radio({
        boxLabel: 'Sin Pago',
        width: 150,
        checked: true,
        name: 'tipo',
        inputValue: 0
    });
    var pagprecon_tipo_boleta = new Ext.form.Radio({
        boxLabel: 'Boleta',
        width: 150,
        name: 'tipo',
        inputValue: 1
    });
    var pagprecon_tipo_voucher = new Ext.form.Radio({
        boxLabel: 'Voucher',
        width: 150,
        name: 'tipo',
        inputValue: 2
    });
    var pagprecon_tipo = new Ext.form.RadioGroup({
        fieldLabel: '<span>Tipo Doc Pago</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagprecon_tipo',
        items: [
            pagprecon_tipo_sinpago,
            pagprecon_tipo_boleta,
            pagprecon_tipo_voucher
        ],
        listeners: {
            change: function(objeto, checked) {
                switch (parseInt(checked.getGroupValue()))
                {
                    case 0:
                        pagprecon_monto.setDisabled(true);
                        pagprecon_fecha_fecha.setDisabled(true);
                        pagprecon_fecha_tiempo.setDisabled(true);
                        pagprecon_numComprobante.setDisabled(true);
                        pagprecon_agente.setDisabled(true);
                        pagprecon_nroOperacion.setDisabled(true);
                        pagprecon_nombreBancario.setDisabled(true);
                        pagprecon_imagen.setDisabled(true);
                        break;
                    case 1:
                        pagprecon_monto.setDisabled(false);
                        pagprecon_fecha_fecha.setDisabled(false);
                        pagprecon_fecha_tiempo.setDisabled(false);
                        pagprecon_numComprobante.setDisabled(false);
                        pagprecon_agente.setDisabled(true);
                        pagprecon_nroOperacion.setDisabled(true);
                        pagprecon_nombreBancario.setDisabled(true);
                        pagprecon_imagen.setDisabled(true);
                        break;
                    case 2:
                        pagprecon_monto.setDisabled(false);
                        pagprecon_fecha_fecha.setDisabled(false);
                        pagprecon_fecha_tiempo.setDisabled(false);
                        pagprecon_numComprobante.setDisabled(true);
                        pagprecon_agente.setDisabled(false);
                        pagprecon_nroOperacion.setDisabled(false);
                        pagprecon_nombreBancario.setDisabled(false);
                        pagprecon_imagen.setDisabled(false);
                        break;
                    default:
                        break;
                }
            }
        }
    });
    var pagprecon_fecha_fecha = new Ext.form.DateField({
        fieldLabel: '<span>Fecha</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagprecon_fecha_fecha',
        width: 150,
        value: new Date(),
        maxValue: new Date(),
        disabled: true,
        disabledClass: 'classDisabled'
    });
    var pagprecon_fecha_tiempo = new Ext.form.TimeField({
        fieldLabel: '<span>Hora</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagprecon_fecha_tiempo',
        width: 150,
        value: new Date(),
        increment: 1,
        disabled: true,
        disabledClass: 'classDisabled'
    });
    var pagprecon_monto = new Ext.form.NumberField({
        fieldLabel: '<span>Monto</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagprecon_monto',
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
    var pagprecon_numComprobante = new Ext.form.TextField({
        fieldLabel: '<span>Nro Comprobante</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagprecon_numComprobante',
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
    var pagprecon_agente_no = new Ext.form.Radio({
        boxLabel: 'No',
        width: 150,
        checked: true,
        name: 'agente',
        inputValue: 1
    });
    var pagprecon_agente_si = new Ext.form.Radio({
        boxLabel: 'Si',
        width: 150,
        name: 'agente',
        inputValue: 2
    });
    var pagprecon_agente = new Ext.form.RadioGroup({
        fieldLabel: '<span>Agente</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagprecon_agente',
        disabled: true,
        disabledClass: 'classDisabled',
        items: [
            pagprecon_agente_no,
            pagprecon_agente_si
        ]
    });
    var pagprecon_nroOperacion = new Ext.form.NumberField({
        fieldLabel: '<span>Nro Operacion</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagprecon_nroOperacion',
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
    var pagprecon_nombreBancario = new Ext.form.TextField({
        fieldLabel: '<span>Entidad Bancaria</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagprecon_nombreBancario',
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
    var pagprecon_imagen = new Ext.form.TextField({
        fieldLabel: '<span>Imagen</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagprecon_imagen',
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


    var formularioVistaPagoPreCongreso = new Ext.form.FormPanel({
        title: 'Formulario Registro Pago PreCongreso',
        padding: '10px 10px 10px 10px',
        labelAlign: 'left',
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            fields: [
                {
                    name: 'pagprecon_idINSCRIPCION',
                    type: 'number',
                    mapping: 'idINSCRIPCION'
                }, {
                    name: 'pagprecon_perNombreCompleto',
                    type: 'string',
                    mapping: 'perNombreCompleto'
                }, {
                    name: 'pagprecon_tipo',
                    type: 'number',
                    mapping: 'tipo'
                }, {
                    name: 'pagprecon_fecha_fecha',
                    type: 'date',
                    mapping: 'fecha'
                }, {
                    name: 'pagprecon_fecha_tiempo',
                    type: 'date',
                    mapping: 'fecha'
                }, {
                    name: 'pagprecon_monto',
                    type: 'number',
                    mapping: 'monto'
                }, {
                    name: 'pagprecon_numComprobante',
                    type: 'number',
                    mapping: 'numComprobante'
                }, {
                    name: 'pagprecon_numComprobante',
                    type: 'string',
                    mapping: 'numComprobante'
                }, {
                    name: 'pagprecon_agente',
                    type: 'number',
                    mapping: 'agente'
                }, {
                    name: 'pagprecon_nroOperacion',
                    type: 'number',
                    mapping: 'nroOperacion'
                }, {
                    name: 'pagprecon_nombreBancario',
                    type: 'string',
                    mapping: 'nombreBancario'
                }, {
                    name: 'pagprecon_enFisico',
                    type: 'number',
                    mapping: 'enFisico'
                }, {
                    name: 'pagprecon_imagen',
                    type: 'string',
                    mapping: 'imagen'
                }, {
                    name: 'pagprecon_presencial',
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
                        items: [pagprecon_dni]
                    }, {
                        border: false,
                        width: 300,
                        layout: 'form',
                        items: [pagprecon_btnBuscar]
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
                        items: [pagprecon_idINSCRIPCION]
                    }, {
                        border: false,
                        width: 500,
                        layout: 'form',
                        labelWidth: 120,
                        items: [pagprecon_perNombreCompleto]
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
                        items: [pagprecon_tipo]
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
                        items: [pagprecon_fecha_fecha]
                    }, {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 100,
                        items: [pagprecon_fecha_tiempo]
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
                        items: [pagprecon_monto]
                    }, {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 120,
                        items: [pagprecon_numComprobante]
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
                        items: [pagprecon_agente]
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
                        items: [pagprecon_nroOperacion]
                    }, {
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 120,
                        items: [pagprecon_nombreBancario]
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
                        items: [pagprecon_imagen]
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
                    pagprecon_guardarPagoPreCongreso();
                }
            }, {
                text: 'Cancelar',
                iconCls: 'close',
                width: 100,
                handler: function() {
                    pagprecon_limpiar();
                    pagprecon_dni.reset();
                    pagprecon_dni.focus();
                }
            }]
    });
    formularioVistaPagoPreCongreso.getForm().on({
        actioncomplete: {
            fn: function() {
                pagprecon_dni.focus();
            }
        },
        actionfailed: {
            fn: function() {
                pagprecon_dni.focus();
            }
        },
    });
    function pagprecon_limpiar()
    {
        pagprecon_monto.setDisabled(true);
        pagprecon_fecha_fecha.setDisabled(true);
        pagprecon_fecha_tiempo.setDisabled(true);
        pagprecon_numComprobante.setDisabled(true);
        pagprecon_agente.setDisabled(true);
        pagprecon_nroOperacion.setDisabled(true);
        pagprecon_nombreBancario.setDisabled(true);
        pagprecon_imagen.setDisabled(true);

        pagprecon_idINSCRIPCION.reset();
        pagprecon_perNombreCompleto.reset();
        pagprecon_tipo.reset();
        pagprecon_monto.reset();
        pagprecon_fecha_fecha.reset();
        pagprecon_fecha_tiempo.reset();
        pagprecon_numComprobante.reset();
        pagprecon_agente.reset();
        pagprecon_nombreBancario.reset();
        pagprecon_imagen.reset();
        pagprecon_nroOperacion.reset();
    }

    function pagprecon_buscarpagoprecongreso() {
        pagprecon_limpiar();
        formularioVistaPagoPreCongreso.getForm().load({
            url: 'controlador/controladorPersona.php',
            waitMsg: 'Cargando...',
            params: {
                opcion: "buscarpagocongreso",
                dni: pagprecon_dni.getValue()
            }
        });
    }
    function pagprecon_validarFormulario()
    {
        if (pagprecon_dni.isValid())
        {
            if (!(pagprecon_fecha_fecha.isValid() && pagprecon_fecha_tiempo.isValid() &&
                    pagprecon_fecha_fecha.getValue() != '' && pagprecon_fecha_tiempo.getValue() != ''))
            {
                verMessageBoxError('Debe digitar una fecha y/o hora correcto');
                return false;
            }
            if (pagprecon_idINSCRIPCION.getValue() != '')
            {
                if (pagprecon_tipo.getValue().getGroupValue() == 0)
                {
                    return true;
                } else if (pagprecon_tipo.getValue().getGroupValue() == 1)
                {
                    if (pagprecon_monto.getValue() != '')
                    {
                        if (pagprecon_numComprobante.getValue() != '')
                        {
                            return true;
                        } else {
                            verMessageBoxError('Debe digitar número de comprobante de la boleta');
                        }
                    } else {
                        verMessageBoxError('Debe digitar el monto del pago');
                    }
                } else {
                    if (pagprecon_monto.getValue() != '')
                    {
                        if (pagprecon_nroOperacion.getValue() != '')
                        {
                            if (pagprecon_nombreBancario.getValue() != '')
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
    function pagprecon_guardarPagoPreCongreso()
    {
        if (pagprecon_validarFormulario())
        {
            Ext.MessageBox.wait('Espere por favor...', "REGISTRO");
            Ext.Ajax.request({
                url: 'controlador/controladorInscripcion.php',
                params: {
                    opcion: "registropago",
                    idINSCRIPCION: pagprecon_idINSCRIPCION.getValue(),
                    tipo: pagprecon_tipo.getValue().getGroupValue(),
                    presencial: 1
                },
                success: function(response) {
                    var datos = Ext.util.JSON.decode(response.responseText);
                    if (datos.resultado)
                    {
                        var fecha = new Date(pagprecon_fecha_fecha.getValue());
                        var hora = pagprecon_fecha_tiempo.getValue();
                        var fechaCompleta = new Date(fecha.toDateString() + " " + hora);
                        if (pagprecon_tipo.getValue().getGroupValue() == 1)
                        {
                            //Boleta
                            Ext.Ajax.request({
                                url: 'controlador/controladorBoleta.php',
                                params: {
                                    opcion: "registropago",
                                    idINSCRIPCION: pagprecon_idINSCRIPCION.getValue(),
                                    fecha: fechaCompleta,
                                    monto: pagprecon_monto.getValue(),
                                    numComprobante: pagprecon_numComprobante.getValue()
                                },
                                success: function(response) {
                                    var datos = Ext.util.JSON.decode(response.responseText);
                                    if (datos.resultado)
                                    {
                                        verMessageBoxExito(datos.mensaje);
                                        pagprecon_limpiar();
                                        pagprecon_dni.reset();
                                        pagprecon_dni.focus();
                                    } else {
                                        verMessageBoxError(datos.mensaje);
                                    }
                                }
                            });
                        } else if (pagprecon_tipo.getValue().getGroupValue() == 2) {
                            Ext.Ajax.request({
                                url: 'controlador/controladorVoucher.php',
                                params: {
                                    opcion: "registropago",
                                    nroOperacion: pagprecon_nroOperacion.getValue(),
                                    fecha: fechaCompleta,
                                    monto: pagprecon_monto.getValue(),
                                    agente: pagprecon_agente.getValue().getGroupValue(),
                                    nombreBancario: pagprecon_nombreBancario.getValue(),
                                    imagen: pagprecon_imagen.getValue(),
                                    enFisico: 1,
                                    idINSCRIPCION: pagprecon_idINSCRIPCION.getValue()
                                },
                                success: function(response) {
                                    var datos = Ext.util.JSON.decode(response.responseText);
                                    if (datos.resultado)
                                    {
                                        verMessageBoxExito(datos.mensaje);
                                        pagprecon_limpiar();
                                        pagprecon_dni.reset();
                                        pagprecon_dni.focus();
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
    
    
    function pagprecon_abrirFormularioBuscar() {
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
                        pagoprecongresoStorePersona.setBaseParam('nombre', Ext.getCmp('param_nombre2').getValue());
                        pagoprecongresoStorePersona.setBaseParam('ape_paterno', Ext.getCmp('param_ape_paterno2').getValue());
                        pagoprecongresoStorePersona.setBaseParam('ape_materno', Ext.getCmp('param_ape_materno2').getValue());
                        pagoprecongresoStorePersona.load();
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
                        pagoprecongresoStorePersona.setBaseParam('nombre', Ext.getCmp('param_nombre2').getValue());
                        pagoprecongresoStorePersona.setBaseParam('ape_paterno', Ext.getCmp('param_ape_paterno2').getValue());
                        pagoprecongresoStorePersona.setBaseParam('ape_materno', Ext.getCmp('param_ape_materno2').getValue());
                        pagoprecongresoStorePersona.load();
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
                        pagoprecongresoStorePersona.setBaseParam('nombre', Ext.getCmp('param_nombre2').getValue());
                        pagoprecongresoStorePersona.setBaseParam('ape_paterno', Ext.getCmp('param_ape_paterno2').getValue());
                        pagoprecongresoStorePersona.setBaseParam('ape_materno', Ext.getCmp('param_ape_materno2').getValue());
                        pagoprecongresoStorePersona.load();
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
            store: pagoprecongresoStorePersona,
            border: false,
            stripeRows: true,
            itemSelector: true,
            height: 200,
            tbar: [
            ],
            listeners: {
                rowdblclick: function(objecto, rowIndex, objecto) {
                    var dniSelec = param_gridPersona.getStore().getAt(rowIndex).get('param_dni');
                    pagprecon_ventanaPopupBuscar.close();
                    pagprecon_dni.setValue(dniSelec);
                    pagprecon_dni.focus();
                }
            },
            bbar: new Ext.PagingToolbar({
                store: pagoprecongresoStorePersona,
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
                                var records = pagoprecongresoStoreUniversidadRender.getRange();
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
                        pagoprecongresoStorePersona.setBaseParam('nombre', Ext.getCmp('param_nombre2').getValue());
                        pagoprecongresoStorePersona.setBaseParam('ape_paterno', Ext.getCmp('param_ape_paterno2').getValue());
                        pagoprecongresoStorePersona.setBaseParam('ape_materno', Ext.getCmp('param_ape_materno2').getValue());
                        pagoprecongresoStorePersona.load();

                    }
                }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    width: 100,
                    handler: function() {
                        //aqui
                        pagprecon_ventanaPopupBuscar.close();
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
        pagprecon_ventanaPopupBuscar = new Ext.Window({
            title: 'Buscar Inscripcion',
            closable: false,
            modal: true,
            width: 700,
            constrain: true,
            resizable: false,
            items: [param_panelBuscarInscripcion]
        });

    }
    var panelVistaPagoPreCongreso = new Ext.Panel({
        layout: 'fit',
        border: false,
        items: formularioVistaPagoPreCongreso
    }
    );
    return panelVistaPagoPreCongreso;
}