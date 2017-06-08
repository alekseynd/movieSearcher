<?php 
	include_once "dbconfig.php";

	if (isset($_GET['ticketsArray'])) {
		$ticketsArray = mysqli_real_escape_string($conn, $_GET['ticketsArray']);
		$ticketsArray = json_decode($_GET['ticketsArray']);

		$buyTickets = '';
		for ($i=0; $i < count($ticketsArray); $i++) { 
			$buyTickets .= 'UPDATE ticket SET ID_status= 2 WHERE ID = '.$ticketsArray[$i]. ';' ;
		}
		
		if (mysqli_multi_query($conn, $buyTickets)) {
			echo "done";
		}
		
		mysqli_close($conn);
	}
	else {
		echo "false";
	}

?>