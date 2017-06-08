<?php 


include_once "dbconfig.php";

if (isset($_GET['date'])) {
	$resp = [];
	$movieName = $_GET['film-name'];
	$day   = $_GET['date'];

	$movieName  = mysqli_real_escape_string($conn, $movieName);
	$day 		= mysqli_real_escape_string($conn, $day);


	$movieName = " AND movies.name LIKE '%" . $movieName."%'";

	$priceFromQuery = '';
	$dateToQuery = '';
	$priceToQuery = '';
	$genreQuery = '';

	$timeFrom = '';
	if (!$_GET['time-from']) {
		$timeFrom = '00:00:01';
	}
	else {
		$timeFrom = $_GET['time-from'];
		$timeFrom 		= mysqli_real_escape_string($conn, $timeFrom);

	}
	$timeTo = '';
	if (!$_GET['time-to']) {
		$timeTo = '23:59:59';
	}
	else {
		$timeTo = $_GET['time-to'];
		$timeTo 		= mysqli_real_escape_string($conn, $timeTo);
	}
	$dateFromQuery = " seance.datetime >= '".$day. " " .$timeFrom."' ";
	$dateToQuery = "AND seance.datetime <= '".$day. " " .$timeTo."' ";




	if ( $_GET['price-from']) {
		$priceFromQuery = (int)$_GET['price-from'];
		$priceFromQuery = "AND seance.price >= ". $priceFromQuery ." ";
	}
	else {
		$priceFromQuery = "AND seance.price >= 0";
	}
	if ( $_GET['price-to']) {
		$priceToQuery = (int)$_GET['price-to'];
		$priceToQuery = "AND seance.price <= ". $priceToQuery ." ";
	}
	else {
		$priceToQuery = "AND seance.price <= 1000 ";
	}

	if ( $_GET['field-genre']) {
		$genreQuery = "AND genre.ID = ". $_GET['field-genre'] ." ";
	}




	// $sql = "SELECT * FROM actor";

	$sql = "SELECT genre.name AS Genre,	movies.ID AS MovieID, 
		concat(directed.first_name, ' ', directed.last_name) AS Directed,	

		movies.name AS Movie, 
		place.row, place.number,
		concat(cinema.name, ' ', cinema.address) AS cinema,
		 hall.name AS hallName 
		,seance.price, seance.datetime, seance.ID AS ID_seance
		FROM `movies` 
		INNER JOIN seance ON movies.ID = seance.ID_movie
		INNER JOIN genre ON movies.ID_genre = genre.ID
		INNER JOIN directed ON movies.ID_directed = directed.ID


		INNER JOIN hall ON seance.ID_hall = hall.ID

		INNER JOIN cinema ON hall.ID_cinema = cinema.ID

		INNER JOIN place ON hall.ID = place.ID_hall

		WHERE ".$dateFromQuery." ".$dateToQuery." ".$priceFromQuery." ".$priceToQuery." ".$genreQuery." ".$movieName." ";

	// echo $sql;
	$result = mysqli_query($conn, $sql);


	if (mysqli_num_rows($result) > 0) {

	    while($row = mysqli_fetch_assoc($result)) {

	    	$resp[$row["ID_seance"]] = $row;

	    }
	} 
	else 
		{
		$resp = "0 results";
	}

	mysqli_close($conn);

	echo json_encode($resp, JSON_UNESCAPED_UNICODE);
}
?>