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

		<div id="registro" title="Registrate">
			<div id="cinta1registro"><img src="img/cinta3.png"></div>
			<div id="cinta2registro"><img src="img/cinta1.png"></div>
			<div id="cinta3registro"><img src="img/cinta1.png"></div>
			<div id="cinta4registro"><img src="img/cinta3.png"></div>
			<div id="registrate">
				
			Regístrate
			</div>
			<div id="error"></div>
			<form method="POST" action="guardarRegistro.php" onsubmit="return validar(this)">
			<div id="datos">
				<table>
				<tr>
					<td>Nombre:</td>
					<td><input type="text" name="txtnombre"></td>
				</tr>
				<tr>
					<td>Apellidos:</td>
					<td><input type="text" name="txtapellidos"></td>
				</tr>
				<tr>
					<td>Usuario:</td>
					<td><input type="text" name="txtusuario"></td>
				</tr>
				<tr>
					<td>Contraseña:</td>
					<td><input type="password" name="txtpassword"></td>
				</tr>
				<tr>
					<td>País:</td>
					<td><input type="text" name="txtpais"></td>
				</tr>
				<tr>
					<td>Correo:</td>
					<td><input type="email" name="txtcorreo"></td>
				</tr>

				</table>
			</div>

			<div id="guardar" >
				<input type="submit" class="button super orange" value="Guardar">
			</div>

			</form>
		</div>

	

</body>
</html>