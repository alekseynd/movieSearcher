
var seanceID = location.search; 

var documentMap = document.getElementById('map');

var buyBookedTicketsBTN = document.getElementById('buyBookedTickets');

if (!seanceID) {
	//console.log('!!!!!!!!!!!')
	buyBookedTicketsBTN.disabled = true;
	documentMap.innerHTML = '<h2>Сеанс не найден</h2>'
}

document.addEventListener("DOMContentLoaded", getSeats(seanceID));

var bookedTickets = [];


function getSeanceInfo(infdata) {
	var movieName = document.getElementById('movieName');
	var cinemaName = document.getElementById('cinemaName');
	var datetime = document.getElementById('datetime');
	var hallName = document.getElementById('hallName');

	movieName.innerHTML	 = infdata['movieName'];
	cinemaName.innerHTML = infdata['cinemaName'];
	datetime.innerHTML	 = infdata['datetime'];
	hallName.innerHTML	 = infdata['hallName'];
}

function bookTicketRequest(ticket_arg, elem){

 	if (ticket_arg['ID_status'] == 2) {
 		return false;
 	}

	var query = '';
	
	
	if (ticket_arg['ID_ticket']  !== 'null') {
		query = `ID_ticket=` + ticket_arg['ID_ticket'];
	}
	else {
		query = `ID_seance=` + ticket_arg['ID_seance'] + `&data_seat=`+  ticket_arg['data-seat'] + `&data_row=`+  ticket_arg['data-row'];
	}

	RequestTicket= new XMLHttpRequest();

	RequestTicket.open('GET', './php/bookTicket.php?' + query, true);

	RequestTicket.send();

   	RequestTicket.onreadystatechange = function() {
   	  if (RequestTicket.readyState != 4) return;

        if (RequestTicket.status != 200) {
          // обработать ошибку
          alert(RequestTicket.status + ': ' + RequestMovie.statusText);
        } else {
        	
        	 console.log(this.responseText);
        	 var response = JSON.parse(this.responseText);

        	 if (response === 'bookingCanceled') {
        	 	elem.setAttribute('ID_status', null);
        	 	elem.setAttribute('ID_ticket', null);
        	 	elem.className = ' seat';

        	 	var index = bookedTickets.indexOf(ticket_arg['ID_ticket']);
        	 	bookedTickets.splice(index, 1);

        	 }
        	 else {
        	 	elem.setAttribute('ID_status', 1);
        	 	elem.setAttribute('ID_ticket', response);
        	 	elem.className += ' booked';
        	 	ticket_arg['ID_ticket'] = response;
        	 	bookedTickets.push(response);
        	 	//bookedTickets[response] = ticket_arg;
        	 }
        	 console.log(bookedTickets);
        }
  	 }
}

var bookTicket = function(elem) {
		var element = elem.target;
		
    	var ticket = {};
    	ticket['data-row'] = element.getAttribute("data-row");
    	ticket['data-seat'] = element.getAttribute("data-seat");
    	ticket['ID_status'] = element.getAttribute("ID_status");

		
    	ticket['ID_ticket'] = element.getAttribute("ID_ticket");
    	ticket['ID_seance'] = element.getAttribute("ID_seance");
    	
    	bookTicketRequest(ticket, element);
    	ticket = null;
};


function addBookTicketsFoo() {
	var seat = document.getElementsByClassName('seat');

	console.log(seat.length)
	for (var i = 0; i < seat.length; i++) {
    	seat[i].addEventListener('click', bookTicket, false);
	}
}


function createMap (arg) {
	
	var freePlaceMap = document.createElement('div');
	var freePlaces = [];
	for (var key in arg) {
		var row = document.createElement('div');
		row.className = 'row';
		freePlaces.push(arg[key].length);
		
		for (var i = 0; i < arg[key].length-1; i++) {
			
			var place = document.createElement('div');
			place.className = 'seat';//
			place.setAttribute('data-row', key);//className
			place.setAttribute('data-seat', arg[key][i]['number']);
			place.setAttribute('ID_seance', arg[key][i]['ID_seance']);
			if (arg[key][i]['ID_status'] == 1) {
				place.className += ' booked';

				if (bookedTickets.indexOf(arg[key][i]) === -1) {
					bookedTickets.push(arg[key][i]['ID_ticket']);
				}
				
			}
			else if (arg[key][i]['ID_status'] == 2) {
				place.className += ' bought';
			}
			place.setAttribute('ID_status', arg[key][i]['ID_status']);
			place.setAttribute('ID_ticket', arg[key][i]['ID_ticket']);

			place.innerHTML = arg[key][i]['number'];
			
			row.appendChild(place);
		}
		freePlaceMap.appendChild(row);
	}
	documentMap.appendChild(freePlaceMap);
	//return freePlaces;
	var cinemaHallMap = '';

}





function getSeats(arg_seanceID) {
	

	RequestSeance = new XMLHttpRequest();

	RequestSeance.open('GET', './php/cinemaMap.php' + arg_seanceID , true);

	RequestSeance.send();

   RequestSeance.onreadystatechange = function() {
        if (RequestSeance.readyState != 4) return;

        if (RequestSeance.status != 200) {
       
          alert(RequestSeance.status + ': ' + RequestSeance.statusText);
        } 
        else {
        
          if (this.responseText !== '0 results') {
          	console.log(this.responseText)
	        var resp = JSON.parse(this.responseText);
	        var seaceInfo = Object.assign({}, resp['seanceInfo']);
	        delete resp['seanceInfo']; 
	        
	        getSeanceInfo(seaceInfo);
	        createMap(resp);
	        addBookTicketsFoo();
          }
       
  		}
    }
}

