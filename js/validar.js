function validar(F){
	var nombre=F.txtnombre.value;
	var apellidos=F.txtapellidos.value;
	var usuario=F.txtusuario.value;
	var clave=F.txtpassword.value;
	var pais=F.txtpais.value;
	var correo=F.txtcorreo.value;

	if(nombre.trim()!="" && apellidos.trim()!="" && usuario.trim()!="" && 
	   clave.trim()!="" && pais.trim()!="" && correo.trim()!="" )
		return true;

	else{
		$("#error").html("Llenar todos los campos");
		return false;

	}
}



function validarLogin(){

	var F=document.getElementById("formlogin");


	var usuario=F.txtusuario.value;
	var clave=F.txtcontrasea.value;
	

	if(usuario.trim()!="" && clave.trim()!="")
	{

		$.ajax({
  		type: "POST",
  		data:'usuario='+usuario+'&clave='+clave,
  		url:"login.php",
  		success: function(datos){

  			if(datos==0){
  				location.href="home.php";
}
  			else{
  				$("#error").html(datos);
  			}

  			
  	}

  		});

	}
		

	else{
		$("#error").html("Llenar todos los campos");
		return false;

	}
}