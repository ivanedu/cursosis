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
    
   
    $("#DNIvou").keyup(function(){   
        var dni=this.value;
        if(dni>9999999 && dni<100000000){            
            $.ajax({
                url: "buscarAlumnoxDNI.php",
                type: "POST",
                data: "DNIvou="+this.value,                
                success:function(datos){
                    $("#tabPervou tbody").html(datos);
                },
                error:function(){
                    $("#tabPervou tbody").html("Error al listar");
                }
            });
        }else{
            $("#tabPervou tbody").html("DNI incorrecto");
        }         
    });
    $("#idDocvou").keyup(function(){   
        var dni=this.value;
        if(dni>9999999 && dni<100000000){            
            $.ajax({
                url: "buscarDOCxDNI.php",
                type: "POST",
                data: "idDocvou="+this.value,                
                success:function(datos){
                    $("#tabVouxID tbody").html(datos);
                },
                error:function(){
                    $("#tabVouxID tbody").html("Error al listar");
                }
            });
        }else{
            $("#tabVouxID tbody").html("DNI incorrecto");
        }         
    });
    
});