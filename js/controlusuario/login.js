/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.onReady(function() {
    Ext.QuickTips.init();
    var formLogin = new Ext.form.FormPanel({
        method: 'POST',
        border: false,
        padding: '4px 4px 4px 4px',
        labelAlign: 'top',
        items: [{
                xtype: 'fieldset',
                paddings: '10 10 10 10',
                title: 'Datos de Usuario',
                layout: 'column',
                items: [new Ext.Panel({
                        border: false,
                        layout: 'form',
                        items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Usuario <span style="color:red;font-weight:bold">*</span>',
                                id: 'cmp_usuUsuario',
                                allowBlank: false,
                                width: 200,
                                enableKeyEvents: true,
                                listeners: {
                                    keypress: function(my, evt) {
                                        if (evt.getKey() == evt.ENTER)
                                        {
                                            ingresarSistema();
                                        }
                                    }
                                }
                            }, {
                                xtype: 'textfield',
                                inputType: 'password',
                                fieldLabel: 'Clave <span style="color:red;font-weight:bold">*</span>',
                                id: 'cmp_usuClave',
                                allowBlank: false,
                                width: 200,
                                enableKeyEvents: true,
                                listeners: {
                                    keypress: function(my, evt) {
                                        if (evt.getKey() == evt.ENTER)
                                        {
                                            ingresarSistema();
                                        }
                                    }
                                }
                            }]
                    }), new Ext.Panel({
                        padding: "0px 0px 0px 20px",
                        layout: 'fit',
                        border: false,
                        html: '<img src="img/user1.png">'
                    })]
            }],
        buttons: [{//marisco tengo 2 instancias de m
                text: 'Entrar',
                iconCls: 'aceptar',
                handler: function()
                {
                    ingresarSistema();
                }
            }]
    });

    //Panel para el formulario
    var panelLogin = new Ext.Panel({
        labelAlign: 'top',
        border: false,
        items: formLogin
    });

    var windowPopup = new Ext.Window({
        title: 'Iniciar Sesión',
        closeAction: 'hide',
        layout: 'fit',
        closable: false,
        width: 400,
        height: 240,
        items: panelLogin
    });
    Ext.getCmp('cmp_usuUsuario').focus();
    function ingresarSistema()
    {
        Ext.MessageBox.wait("Ingresando al Sistema!!", 'Espere por favor...');
        Ext.Ajax.request({
            waitMsg: 'Autentificando..',
            url: 'controlador/controlusuario/usuario.php',
            params: {
                param_opcion: 'login',
                param_usuUsuario: Ext.getCmp('cmp_usuUsuario').getValue(),
                param_usuClave: Ext.getCmp('cmp_usuClave').getValue()
            },
            success: function(response) {
                var datos = Ext.util.JSON.decode(response.responseText);
                if (datos.resultado)
                {
                    location.href = 'http://localhost:50/coneisc/';
                } else {
                    Ext.Msg.show({
                        title: 'ERROR',
                        msg: datos.mensaje,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            }
        });
    }
    windowPopup.show();
});