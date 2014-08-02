function getVistaPagoCongreso() {
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
                    //
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
                if (evt.getKey() == evt.ENTER)
                {
                    //
                }
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
    var pagocon_tipo_sinpago = new Ext.form.Radio({
        boxLabel: 'Sin Pago',
        width: 150,
        checked: true,
        name:'tipo',
        inputValue: 0
    });
    var pagocon_tipo_boleta = new Ext.form.Radio({
        boxLabel: 'Boleta',
        width: 150,
        name:'tipo',
        inputValue: 1
    });
    var pagocon_tipo_voucher = new  Ext.form.Radio({
        boxLabel: 'Voucher',
        width: 150,
        name:'tipo',
        inputValue: 2
    });
    var pagcon_tipo = new Ext.form.RadioGroup({
        fieldLabel: '<span>Tipo Doc Pago</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_tipo',
        allowBlank: false,
        items:[
            pagocon_tipo_sinpago,
            pagocon_tipo_boleta,
            pagocon_tipo_voucher
        ]
    });
    var pagcon_fecha_fecha = new Ext.form.DateField({
        fieldLabel: '<span>Fecha</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_fecha_fecha',
        width: 150,
        value: new Date(),
        maxValue: new Date()
    });
    var pagcon_fecha_tiempo = new Ext.form.TimeField({
        fieldLabel: '<span>Hora</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_fecha_tiempo',
        width: 150,
        value: new Date(),
        increment: 1,
        maxValue: new Date()
    });
    var pagcon_monto = new Ext.form.NumberField({
        fieldLabel: '<span>Monto</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_monto',
        width: 150,
        allowBlank: false,
        enableKeyEvents: true,
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
        allowBlank: false,
        enableKeyEvents: true,
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
        name:'agente',
        inputValue: 1
    });
    var pagocon_agente_si = new  Ext.form.Radio({
        boxLabel: 'Si',
        width: 150,
        name:'agente',
        inputValue: 2
    });
    var pagcon_agente = new Ext.form.RadioGroup({
        fieldLabel: '<span>Agente</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_agente',
        allowBlank: false,
        items:[
            pagocon_agente_no,
            pagocon_agente_si
        ]
    });
     var pagcon_nroOperacion = new Ext.form.NumberField({
        fieldLabel: '<span>Nro Operacion</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_nroOperacion',
        width: 150,
        allowBlank: false,
        enableKeyEvents: true,
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
        allowBlank: false,
        enableKeyEvents: true,
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
        name:'enFisico',
        inputValue: 1
    });
    var pagocon_enFisico_si = new  Ext.form.Radio({
        boxLabel: 'Si',
        width: 150,
        name:'enFisico',
        inputValue: 2
    });
    var pagcon_enFisico = new Ext.form.RadioGroup({
        fieldLabel: '<span>Fisico</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_enFisico',
        allowBlank: false,
        items:[
            pagocon_enFisico_no,
            pagocon_enFisico_si
        ]
    });
    var pagcon_imagen = new Ext.form.TextField({
        fieldLabel: '<span>Imagen</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_imagen',
        width: 150,
        allowBlank: false,
        enableKeyEvents: true,
        listeners: {
            keypress: function(my, evt) {
                if (evt.getKey() == evt.ENTER)
                {
                    //
                }
            }
        }
    });
    var pagocon_presencial_no = new Ext.form.Radio({
        boxLabel: 'No',
        width: 150,
        checked: true,
        name:'presencial',
        inputValue: 1
    });
    var pagocon_presencial_si = new  Ext.form.Radio({
        boxLabel: 'Si',
        width: 150,
        name:'presencial',
        inputValue: 2
    });
    var pagcon_presencial = new Ext.form.RadioGroup({
        fieldLabel: '<span>Fisico</span><span style="color:red;font-weight:bold">*</span>',
        id: 'pagcon_presencial',
        allowBlank: false,
        items:[
            pagocon_presencial_no,
            pagocon_presencial_si
        ]
    });
    var formularioVistaPagoCongreso = new Ext.form.FormPanel({
        title: 'Formulario Registro Pago Congreso',
        padding: '10px 10px 10px 10px',
        labelAlign: 'left',
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
                    },{
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 100,
                        items: [pagcon_fecha_tiempo]
                    }
                ]
            },{
                border: false,
                layout: 'column',
                padding: '5px 0px 10px 5px',
                items: [{
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 100,
                        items: [pagcon_monto]
                    },{
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 120,
                        items: [pagcon_numComprobante]
                    }
                ]
            },{
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
            },{
                border: false,
                layout: 'column',
                padding: '5px 0px 10px 5px',
                items: [{
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 100,
                        items: [pagcon_nroOperacion]
                    },{
                        border: false,
                        width: 300,
                        layout: 'form',
                        labelWidth: 120,
                        items: [pagcon_nombreBancario]
                    }
                ]
            },{
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
            },{
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
            },{
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
                }
            }, {
                text: 'Cancelar',
                iconCls: 'close',
                width: 100,
                handler: function() {
                }
            }]
    });
    var panelVistaPagoCongreso = new Ext.Panel({
        layout: 'fit',
        border: false,
        items: formularioVistaPagoCongreso
    });
    return panelVistaPagoCongreso;
}