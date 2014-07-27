<?php 
	session_start();
	if(!isset($_SESSION['validado']))
	{
		header("location:salir.php");
	}


?>