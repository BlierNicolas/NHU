<html>
	<head>
		<title>New Human Universe</title>
		<link rel="stylesheet" type="text/css" href="style/bootstrap.css">
	</head>
	<body>
	<?php

		if (!ISSET($_SESSION)) session_start();
		require_once('./controleur/ActionBuilder.class.php');
		if (ISSET($_REQUEST["action"])) {
			$vue = ActionBuilder::getAction($_REQUEST["action"]);
			include_once('vues/'.$vue.'.php');
		} else {
			include_once('vues/main.php');
		}
	?>
	</body>
</html>