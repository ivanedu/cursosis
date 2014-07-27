$(document).ready(function(){
    function listarDep(){
        $.ajax({
                url: "listarDep.php",
                type: "POST",
                data: "",                
                success:function(datos){                    
                    $("#busDepUni").html(datos);
                    $("#depUni").html(datos);
                    $("#depPervou").html(datos);
                    $("#depPervbol").html(datos);
                    
                },
                error:function(){
                    $("#busDepUni").html("Error al listar");
                    $("#depUni").html("Error al listar");
                    $("#depPervou").html("Error al listar");
                    $("#depPervbol").html("Error al listar");
                }
            });
    }
    listarDep();
    
    $("#formRegUniversidad").submit(function( event){   
        event.preventDefault();
        var nomUni=this.nomUni.value;
        var abrevUni=this.abrevUni.value;
        var dirUni=this.dirUni.value;
        var depUni=this.depUni.value;
        if(nomUni.trim()!="" && abrevUni.trim()!="" && dirUni.trim()!="" && depUni!=0){
            
            $.ajax({
                url: "registrarUni.php",
                type: "POST",
                data: $(this).serialize(),
                beforeSend:function(){
                    $("#msjUni").text("procesando").css("color","#80E0B0").show().fadeOut( 3000 );
                },
                success:function(datos){
                    
                    if(datos==true){
                        $("#msjUni").text("grabado correctamente").css("color","#8bdde9").show().fadeOut( 5000 );
                    }else if(datos=="nombre repetido"){
                        $("#msjUni").text("Nombre repetido").css("color","#fc6d71").show().fadeOut( 5000 );
                    }
                    else{
                        $("#msjUni").text("Datos incorrectos").css("color","#fc6d71").show().fadeOut( 5000 );
                    }
                    
                },
                error:function(){
                    $("#msjUni").text("Error al grabar").css("color","#fc6d71").show().fadeOut( 15000 );
                }
            });

        }else{
            $("#msjUni").text("Datos incompletos").css("color","#fc6d71").show().fadeOut( 5000 );
        }
         
    });
    
   
    $("#depUni").change(function(){   
        
        if(this.value!=0){
            
            $.ajax({
                url: "listarTablaUnixDep.php",
                type: "POST",
                data: "busDepUni="+this.value,                
                success:function(datos){                    
                    
                    $("#tabUni tbody").html(datos);
                    
                },
                error:function(){
                    $("#tabUni tbody").html("Error al listar");
                }
            });

        }
         
    });
    
});