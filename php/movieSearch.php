<?php 

include_once "dbconfig.php";
if (isset($_GET['movieName'])) {
	$movieName = $_GET['movieName'];

	$sql = "SELECT genre.name AS Genre,	movies.ID AS MovieID, concat(directed.first_name, ' ', directed.last_name) AS Directed,	GROUP_CONCAT(actor.first_name, ' ', actor.last_name) AS STAFF,	movies.name AS Movie, `census`,`desc` FROM `movies`	INNER JOIN genre ON movies.ID_genre = genre.ID 	INNER JOIN directed ON movies.ID_directed = directed.ID LEFT JOIN actor_list ON movies.ID = actor_list.ID_movis LEFT JOIN actor ON actor_list.ID_actor = actor.ID	WHERE movies.name LIKE '%" . $movieName . "%' GROUP BY movies.name" ;

	$result = mysqli_query($conn, $sql);
	$resp = [];

	if (mysqli_num_rows($result) > 0) {
	// output data of each row
	while($row = mysqli_fetch_assoc($result)) {    	
		    $resp[$row['MovieID']] = $row;
		}
	}
	else {
	    $resp = "0 results";
	};

	mysqli_close($conn);


	echo json_encode($resp, JSON_UNESCAPED_UNICODE);
}

?>