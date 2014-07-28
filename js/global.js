function verMessageBoxAdvertencia(mensaje) {
    Ext.Msg.show({
        title: 'ADVERTENCIA',
        msg: mensaje,
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.WARNING
    });
}
function verMessageBoxError(mensaje) {
    Ext.Msg.show({
        title: 'ERROR',
        msg: mensaje,
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR
    });
}
function verMessageBoxExito(mensaje) {
    Ext.Msg.show({
        title: 'EXITO',
        msg: mensaje,
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.INFO
    });
}