<?php 
	include_once "dbconfig.php";
	

	if (isset($_GET['ID_ticket'])) {
		$ID_ticket = (int)$_GET['ID_ticket'];
		
		$deleteTicket = "DELETE FROM `ticket` WHERE `ID` = ".$ID_ticket ."";
		
		$deleteTicketResult = mysqli_query($conn, $deleteTicket);
		
		if ($deleteTicketResult) {
			echo json_encode("bookingCanceled"	, JSON_UNESCAPED_UNICODE);
		}
		mysqli_close($conn);

	}
	else {
		
		$ID_seance = $_GET['ID_seance'];
		$Data_seat = $_GET['data_seat'];
		$Data_row  = $_GET['data_row'];

		$bookTicket = "INSERT INTO `ticket`( `ID_seance`, `ID_status`, `row`, `number`) VALUES (".$ID_seance .",1,".$Data_row.",".$Data_seat.")";

		if (mysqli_query($conn, $bookTicket)) {
			    $last_id = mysqli_insert_id($conn);
			    echo $last_id;
			}
		 else {
		    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
		}

		mysqli_close($conn);

	}

?>