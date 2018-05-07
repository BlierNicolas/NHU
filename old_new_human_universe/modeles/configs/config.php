<?php	
	$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
	if (strpos($actual_link, 'localhost') !== false) {
		interface Config {	
			const URL = "localhost/nha";
			const DB_HOST = "localhost";
			const DB_USER = "root";
			const DB_PWD = "root";
			const DB_NAME = "venatusuniverse";
		}
	}
?>	