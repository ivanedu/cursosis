<?php
session_start();
include_once ('conexion.php');
$cn= new conexion();
if(isset($_SESSION["validado"])){
	if($_SESSION["validado"]=="si"){
		$id=$_SESSION["id"];
		$cn->conectar('onedirectiondb');                
		$sql="select * from noticia order by idnoticias limit 3";                
		$res=$cn->consulta($sql);
		
?>

<html>
	<head>
		<meta charset="utf-8"/>
		<title>One Direction FC</title>
		<link rel="icon" href="img/favicon.ico" type="image/x-icon" />
		<link rel="StyleSheet" type="text/css" href="css/style.css"/>
		<script type="text/javascript" src="js/jquery.js"></script>
	</head>
	<body id="body">
						
		
		<div id="cabecera">	
			<div id="oneD"><img src="img/1d.png" alt="Logo One Direction" title="Logo One Direction"></div>				
			<div id="logo">One Direction</div>
			<div id="fan"><b>Fan Club!</b></div>			
		</div>
		<div id="botones">
			<a href="https://www.facebook.com/onedirectionmusic" title="One Direction en Facebook" target="_blank"><div id="f1"></div></a>
			<a href="https://twitter.com/onedirection" title="One Direction en Twitter" target="_blank"><div id="f2"></div></a>
			<a href="http://getglue.com/movies/one_direction_this_is_us/morgan_spurlock" title="One Direction en GetGlue" target="_blank"><div id="f3"></div></a>
			<a href="https://soundcloud.com/onedirectionmusic" title="One Direction en Soundcloud" target="_blank"><div id="f4"></div></a>
			<a href="http://www.pinterest.com/1dofficial/" title="One Direction en Pinterest" target="_blank"><div id="f5"></div></a>
			<a href="http://www.youtube.com/user/onedirectionchannel" title="One Direction en YouTube" target="_blank"><div id="f6"></div></a>
			<a href="https://plus.google.com/+OneDirection/posts" title="One Direction en Google +" target="_blank"><div id="f7"></div></a>
		</div>

		<div id="menu">
			<nav>
				<ul>
					<li><a href="home.php">Inicio</a></li>
					<li><a href="#">Noticias</a></li>
					<li><a href="#">Música</a></li>
					<li><a href="#">Biografías</a></li>
					<li><a href="#" >Fotos</a></li>
					<li><a href="#" >Videos</a></li>
					<li><a href="#">Película</a></li>
					<li><a href="salir.php">Salir</a></li>
					
				</ul>
			</nav>
		</div>

		<div id="slide">
			
			<div id="wowslider-container1" title="Fotos de Harry, Liam, Zayn, Niall y Louis" >
				<div class="ws_images">
					<ul>
						<li><img src="img/harry.png" alt="Harry" title="Harry Styles" id="wows1_0"/></li>
						<li><img src="img/liam.jpg" alt="Liam" title="Liam Payn" id="wows1_1"/></li>
						<li><img src="img/malik.jpg" alt="Zayn" title="Zayn Malik" id="wows1_2"/></li>
						<li><img src="img/niall.jpg" alt="Niall" title="Niall Horan" id="wows1_3"/></li>
						<li><img src="img/louis.jpg" alt="Louis" title="Louis Tomlinson" id="wows1_4"/></li>
					</ul>
				</div>
				<div class="ws_bullets">
					<div>
						<a href="#" title="harry"><img src="img/tooltips/harry.png" alt="Harry"/>1</a>
						<a href="#" title="liam"><img src="img/tooltips/liam.jpg" alt="Liam"/>2</a>
						<a href="#" title="zayn"><img src="img/tooltips/malik.jpg" alt="Zayn"/>3</a>
						<a href="#" title="futbol"><img src="img/tooltips/niall.jpg" alt="Niall"/>4</a>
						<a href="#" title="louis"><img src="img/tooltips/louis.jpg" alt="Louis"/>5</a>
					</div>
				</div>
				
			</div>
			<script type="text/javascript" src="js/wowslider.js"></script>
			<script type="text/javascript" src="js/script.js"></script>
		</div>
		<div id="contenedor">

			<div id="bloque1">
				 <?php if(($fotos=mysql_fetch_row($res))!=null){
		 ?>
				<img src="img/<?php echo $fotos[6]; ?>" alt="<?php echo $fotos[3]; ?>" title="<?php echo $fotos[3]; ?>"><br>

				<p><?php echo $fotos[3]; ?></p>
				<div id="parrafo"><?php echo utf8_encode($fotos[1]); ?></div>
				<?php } ?>
				<div id="boton"></div>
				<div id="boton2"></div>
			</div>
			<div id="bloque2">
				<div id="bloqueA">
						 <?php if($fotos=mysql_fetch_row($res)){
		 ?>
					<p><?php echo utf8_encode($fotos[3]); ?></p>

					<div id="parrafo"><?php echo utf8_encode($fotos[1]); ?></div>
					

				</div>
				<div id="bloqueB" style='background-image:url("img/<?php echo $fotos[6]; ?>")' alt="<?php echo $fotos[3]; ?>" title="<?php echo $fotos[3]; ?>">
					<?php } ?>
					<div id="cinta1"><img src="img/cinta3.png"></div>
					<div id="cinta2"><img src="img/cinta1.png"></div>
					<div id="cinta3"><img src="img/cinta1.png"></div>
					<div id="cinta4"><img src="img/cinta3.png"></div>
					
				</div>
									 <?php if($fotos=mysql_fetch_row($res)){
		 ?>
			
				<div id="bloqueC" style='background-image:url("img/<?php echo $fotos[6]; ?>")' alt="<?php echo $fotos[3]; ?>" title="<?php echo $fotos[3]; ?>">
					
					<div id="clip"><img src="img/clip.png"></div>
					<div id="cinta"><img src="img/cinta2.png"></div>
					
				</div>
				<div id="bloqueD" >
				<p><?php echo utf8_encode($fotos[3]); ?></p>

					<div id="parrafo"><?php echo utf8_encode($fotos[1]); ?></div>
						<?php } ?>
					<div id="boton1">
						<img src="img/cont.png">
					</div>
				</div>
			</div>
			
		</div>
		<div class="limpiar"></div>
		<div id="redes">
			<div id="red1">
				<div id="redT">
					<div id="redSo"><br>Redes Sociales</div>
				</div>
				<div id="redimage"><img src="img/take.png" alt="One Direction - Take me Home" title="One Direction - Take me Home"></div>
			</div>
			<div id="red2">
				<div id="face">
					<div id="f"><img src="img/face.png"></div>
					<div id="ultF">Facebook</div>
				</div>
				
			</div>
			<div id="red3">
				<div id="twitter">
					<div id="pajarito"><img src="img/tweet.png"></div>
					<div id="ultT">Twitter</div>
				</div>
				<div id="comentT">
					
			
				</div>
			</div>
		</div>
		<div id="footer">
			<p>Sigue a One Direction en:</p>

			<div id="botones">
				<a href="https://www.facebook.com/onedirectionmusic" title="One Direction en Facebook" target="_blank"><div id="f1"></div></a>
				<a href="https://twitter.com/onedirection" title="One Direction en Twitter" target="_blank"><div id="f2"></div></a>
				<a href="http://getglue.com/movies/one_direction_this_is_us/morgan_spurlock" title="One Direction en GetGlue" target="_blank"><div id="f3"></div></a>
				<a href="https://soundcloud.com/onedirectionmusic" title="One Direction en Soundcloud" target="_blank"><div id="f4"></div></a>
				<a href="http://www.pinterest.com/1dofficial/" title="One Direction en Pinterest" target="_blank"><div id="f5"></div></a>
				<a href="http://www.youtube.com/user/onedirectionchannel" title="One Direction en YouTube" target="_blank"><div id="f6"></div></a>
				<a href="https://plus.google.com/+OneDirection/posts" title="One Direction en Google +" target="_blank"><div id="f7"></div></a>
			</div>

			<hr>
			<div id="yo"><b>@Jennjpu</b></div>
		</div>

	</body>
</html>

<?php	}else{
	header("location:salir.php");
}
}else{
	header("location:salir.php");
}
?>