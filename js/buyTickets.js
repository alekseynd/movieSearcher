

var buyBookedTicketsBTN = document.getElementById('buyBookedTickets');

buyBookedTicketsBTN.addEventListener('click', buyBookedTickets, false);

function buyBookedTickets() {
	//console.log(bookedTickets);
	console.log('bookedTickets', bookedTickets);
	
	var ticketsArray;
	ticketsArray = JSON.stringify(bookedTickets);
	var query = 'ticketsArray='+ ticketsArray;

	console.log(ticketsArray);

	RequestBuyTickets= new XMLHttpRequest();

	RequestBuyTickets.open('GET', './php/buyTickets.php?' + query, true);

	RequestBuyTickets.send();

   	RequestBuyTickets.onreadystatechange = function() {
   	  if (RequestBuyTickets.readyState != 4) return;

        //button.innerHTML = 'Готово!';

        if (RequestBuyTickets.status != 200) {
          // обработать ошибку
          alert(RequestBuyTickets.status + ': ' + RequestMovie.statusText);
        } 
        else {
        	console.log(RequestBuyTickets.response);
        	var seats = document.getElementsByClassName('seat');
        	for (var i = 0; i < seats.length; i++) {
        		for (var j = 0; j < bookedTickets.length; j++) {
        			if (seats[i].getAttribute("ID_ticket") == bookedTickets[j]) {
        				seats[i].className = 'seat bought'; 
        			}
        		}
        		
		    	
			}
			seats = null;
        	ticketsArray = [];

        }
	}

}