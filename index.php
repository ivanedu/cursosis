<?php 
	session_start();
	if(isset($_SESSION['validado']))
	{
		header("location:home.php");
	}
	else{

?>


<html>
<head>
	<meta charset="utf-8"/>

	<title>One Direction FC</title>
	<link rel="icon" href="img/favicon.ico" type="image/x-icon" />
	<link rel="StyleSheet" href="css/estiloBoton.css" media="all" type="text/css">
	<link rel="StyleSheet" type="text/css" href="css/style.css"/>
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/validar.js"></script>

</head>
	<body id="body">
	

		<div id="cabecera">	
		    <div id="oneD"><img src="img/1d.png" alt="Logo One Direction" title="Logo One Direction"></div>				
			<div id="logo">One Direction</div>
			<div id="fan"><b>Fan Club!</b></div>			
		</div>	
	
	<br>

	<div id="box">
		<div id="bienvenido">
		 	Bienvenidos a este Fan Club de One Direction,
		  	un lugar donde podrás encontrar todo sobre ellos:
		  	su música, videos, accesorios y mucho más... Ingresa y entérate de todo acerca del grupo! 
		  	y si aún no formas parte de este club que estás esperando?! Regístrate Directioner :)
			
			<div id="registrar">
				<a href="registrar.php" class="button super pink">Registrarse</a>
			</div>
			
		 </div>
	
	
		<div id="login" title="Ingresar datos">
			<form method ="POST" id="formlogin" >
				<div id="error"></div>
			<table >
				<tr>
					<td><font face="Lucida Handwriting" size="5">Usuario:</font></td>
				</tr>
				<tr>
					<td align="center">
						<input type="text" name="txtusuario">
					</td>
				</tr>
				<tr>
					<td><font face="Lucida Handwriting" size="5">Contraseña:</font></td>
				</tr>
				<tr>
					<td align="center">
						<input type="password" name="txtcontrasea">
					</td>
				</tr>
				<tr>
					<td colspan="2" align="center">
						<input type="button" name="ingresar" value="Ingresar" class="button super yellow" 
						onclick="validarLogin();">
						
					</td>
				</tr>
			</table>
			</form>

		</div>
		
	</div>
	
	
</body>
</html>

<?php }

		?>