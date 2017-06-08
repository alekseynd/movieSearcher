<?php 


	include_once "dbconfig.php";
	
	$seanceID;
	if (isset($_GET['seanceID'])) {
		$seanceID  = (int)$_GET['seanceID'];

		$ticketsInfoQuery = "SELECT * FROM `ticket` WHERE ID_seance = ".$seanceID."";


		$ticketsInfoResult = mysqli_query($conn, $ticketsInfoQuery);

		$ticketInfo = [];
		if (mysqli_num_rows($ticketsInfoResult) > 0) {
			 while($row = mysqli_fetch_assoc($ticketsInfoResult)) {
			 	$ticket = [];
			 	$ticket['ID_ticket'] = $row['ID'];
			 	//$ticketInfo[$row['ID']] = $row['ID'];
			 	$ticket['ID_seance'] = $row['ID_seance'];
			 	$ticket['ID_status'] = $row['ID_status'];
			 	$ticket['row'] = $row['row'];	
			 	$ticket['number'] = $row['number'];	
			 	array_push($ticketInfo, $ticket);
			 }
		}


		$hallInfoQuery = 'SELECT seance.ID AS ID_seance, price, row, number, hall.name AS hallName, seance.datetime, movies.name AS movieName ,cinema.name FROM `seance` 
		INNER JOIN hall ON seance.ID_hall = hall.id INNER JOIN place On hall.ID = place.ID_hall 
		INNER JOIN movies On movies.ID = seance.ID_movie
		INNER JOIN cinema On hall.ID_cinema = cinema.ID 
		Where seance.ID = '.$seanceID.' ORDER By number';



		$hallInfoResult = mysqli_query($conn, $hallInfoQuery);
		$resp = [];
		$seatRows = [];
		$seatNumber = [];
		$seanceInfo = [];
		

		if (mysqli_num_rows($hallInfoResult) > 0) {
	   		
		    while($row = mysqli_fetch_assoc($hallInfoResult)) {
		    	$seatRows[$row['row']] = [];
		    	$resp[]  = $row;
				$seanceInfo['ID_seance'] = $row['ID_seance'];
				$seanceInfo['movieName'] = $row['movieName'];
				$seanceInfo['datetime'] = $row['datetime'];
				$seanceInfo['cinemaName'] = $row['name'];
				$seanceInfo['hallName'] = $row['hallName'];
		    }
		    $counter = 0;
		    foreach ($seatRows as $key => $value) {
		    	
		    	$RESULT[$key] = [];
	    	for ($i=0; $i < count($resp); $i++) {
	    		

	    			if($resp[$i]['row'] == $key ){//заполняем массив рядов местами.
	    				
	    				$seat;

	    				$seat['number'] = $resp[$i]['number'];
	    				$seat['ID_seance'] = $resp[$i]['ID_seance'];
	    				$seat['ID_ticket'] = null;
	    				$seat['ID_status'] = null;

	    				array_push($RESULT[$key], $seat);
	    			}
	    		}
	    	}



	    	for ($i=0; $i < count($ticketInfo); $i++) { 

	    	
	    		foreach ($RESULT as $key => $value) {
	    			if ($key == $ticketInfo[$i]['row']) {
	    				foreach ($RESULT[$key] as $number => $value) {
	    					if ($value['number'] == $ticketInfo[$i]['number']) {
	    						$RESULT[$key][$number]['ID_ticket'] = $ticketInfo[$i]['ID_ticket'];
	    						$RESULT[$key][$number]['ID_status'] = $ticketInfo[$i]['ID_status'];
	    					}
	    				}
	    				
	    			}
	    		}
	    		
	    	}
	    $RESULT['seanceInfo'] = $seanceInfo;
		mysqli_close($conn);

		echo json_encode($RESULT, JSON_UNESCAPED_UNICODE);

		}
}
	else 
		{
	    echo "0 results";
	}
	

?>