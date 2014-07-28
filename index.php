<!--configuración-->
<link rel = "stylesheet" type = "text/css" href = "ext/resources/css/ext-all.css"/>
<script type = "text/javascript" src = "ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="ext/ext-all.js"></script>
<script type="text/javascript" src="ext/ext-lang-es.js"></script>
<script type="text/javascript" src="ext/ux/Ext.ux.grid.Search.js"></script>
<!--plugin-->
<link rel="stylesheet" type="text/css" href="css/style.css" />
<link rel="stylesheet" type="text/css" href="css/styleIcon.css" />

<script type="text/javascript" src="js/global.js"></script>
<script type="text/javascript" src="js/storePersona.js"></script>

<script type="text/javascript" src="js/vistaPersona.js"></script>

<title>Sistema</title>

<script>
    Ext.onReady(function(){
        var panel = getVistaPersona();
        var ventana = new Ext.Window({
            title : 'Ventana',
            width:500,
            height:500,
            items : panel
        });
        ventana.show();
    });
</script>