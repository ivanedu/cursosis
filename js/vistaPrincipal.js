/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.onReady(function() {
    Ext.QuickTips.init();
    var tabs = new Ext.TabPanel({
        border: false,
        height: 550,
        activeTab: 0,
        enableTabScroll: true,
        items: []
    });
    var treePanel = new Ext.tree.TreePanel({
        id: 'tree-panel',
        title: 'Menu',
        region: 'center',
        split: true,
        height: 300,
        minSize: 150,
        autoScroll: true,
        border: false,
        rootVisible: false,
        lines: false,
        singleExpand: true,
        useArrows: true,
        animate: true,
        loader: new Ext.tree.TreeLoader({
            dataUrl: 'controlador/controlusuario/tree.php',
            baseParams: {
                param_opcion: 'listarMenu'
            }
        }),
        root: new Ext.tree.AsyncTreeNode()
    });
    var nodeExpand = '';
    treePanel.on('click', function(node) {
        var tab = tabs.findById(node.id); // step 1
        if (!tab) {
            if (node.id == '1'||
                node.id == '5') {
                if (nodeExpand == '') {
                    node.expand(true);
                    nodeExpand = node.id;
                } else {
                    if (nodeExpand == node.id) {
                        node.collapse(true);
                        nodeExpand = '';
                    } else {
                        var nodoAnterior = treePanel.getNodeById(nodeExpand);
                        nodoAnterior.collapse(true);
                        node.expand(true);
                        nodeExpand = node.id;
                    }
                }
            }
            if ((node.id) == '2') {
                var panelMenu = getMenu();
                tab = new Ext.Panel({
                    id: 'menu-panel',
                    title: 'Menu',
                    closable: true,
                    layout: 'fit',
                    items: panelMenu
                });
            }
            if ((node.id) == '3') {
                var panelRol = getRol();
                tab = new Ext.Panel({
                    id: 'rol-panel',
                    title: 'Roles',
                    closable: true,
                    layout: 'fit',
                    items: panelRol,
                });
            }
            if ((node.id) == '4') {
                var panelUsuario = getUsuario();
                tab = new Ext.Panel({
                    id: 'usuario-panel',
                    title: 'Usuario',
                    closable: true,
                    layout: 'fit',
                    items: panelUsuario
                });
            }
            if (tabs != null) {
                tabs.add(tab);
                tabs.doLayout();
            }
        }
        tabs.activate(tab);
    }, this);
    Ext.Ajax.request({
        url: 'controlador/controlusuario/sesion_usuario.php',
        success: function(response) {
            var data = response.responseText
            Ext.getCmp('user').setTitle('Bienvenido: ' + data + ' <a href="controlador/controlusuario/sesion_cerrar.php"><span>Salir</span></a>');
        }
    });
    var contenidoCompleto = new Ext.Viewport({
        layout: 'border',
        collapsible: true,
        items: [{
                region: 'north',
                html: ' <div id="header"><h1>Sistema Coneisc 2014</h1></div>',
                autoHeight: true,
                border: false,
                margins: '2 0 5 0'
            }, {
                region: 'west',
                layout: 'border',
                collapsible: true,
                split: true,
                border: true,
                margins: '0 0 0 5',
                width: 225,
                items: [{
                        region: 'north',
                        xtype: 'panel',
                        layout: 'fit',
                        margins: '5 5 5 5',
                        height: 25,
                        id: 'user',
                        title: 'Bienvenido'
                    }, treePanel]
            }, {
                xtype: "panel",
                region: "center",
                layout: "fit",
                margins: {
                    bottom: 3,
                    right: 3
                },
                border: false,
                items: [{
                        xtype: "panel",
                        autoScroll: true,
                        items: [tabs]
                    }]
            }, {
                title: '',
                region: 'south',
                collapsible: false,
                height: 0,
                minSize: 0,
                maxSize: 0,
                cmargins: '5 0 0 0'
            }]
    });
});