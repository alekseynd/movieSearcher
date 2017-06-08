var sendButton =  document.getElementById('find-seance');



var fields =  document.getElementsByTagName('input');
var select =  document.getElementsByTagName('select');

sendButton.addEventListener('click', sendData);
sendButton.disabled = true;


var seanceDate = document.getElementById('seanceDate');
seanceDate.addEventListener('change', function(e){
	//console.log(e.target.value)
	if (!e.target.value) {
		alert('Пожалуйста, выберите дату сеанса')
		sendButton.disabled = true;
	}
	else {
		sendButton.disabled = false;
	}
	
});


function sendRequest(args) {

	Request = new XMLHttpRequest();

	Request.open('GET', './php/seanceSearch.php?'+ args,true);
	Request.send();

	Request.onreadystatechange = function() {
		if (Request.readyState != 4) return;

			if (Request.status != 200) {
				alert(Request.status + ': ' + Request.statusText);
			}else {
				
				var oldParentDiv = document.getElementById('parentDiv');
				if (oldParentDiv) {
					document.getElementById('res').removeChild(oldParentDiv)
				}
				var parentDiv = document.createElement('div');
				parentDiv.setAttribute("id", "parentDiv");

				console.log(this.responseText);
				var resp = JSON.parse(this.responseText);
				if (resp !== "0 results") {

					for (var key in resp) {

						var pMovieName = document.createElement('span');
						pMovieName.className = 'resultOfSearch';
						pMovieName.innerHTML = 'Название фильма: ';
						parentDiv.appendChild(pMovieName);

						var pMovieNameData = document.createElement('span');

						var link = document.createElement('a');
						link.href = "cinemaMap.html?seanceID="+resp[key]['ID_seance'];
						link.innerHTML = resp[key]['Movie'];
						pMovieNameData.appendChild(link);
						parentDiv.appendChild(pMovieNameData);

						var br = document.createElement('br');
						parentDiv.appendChild(br);
						///////////////

						var pMovieGenre = document.createElement('span');
						pMovieGenre.className = 'resultOfSearch';
						pMovieGenre.innerHTML = 'Жанр: ';
						parentDiv.appendChild(pMovieGenre);


						var pMovieGenreData = document.createElement('span');
						pMovieGenreData.innerHTML = resp[key]['Genre']
						parentDiv.appendChild(pMovieGenreData);
						var br = document.createElement('br');
						parentDiv.appendChild(br);
						///////////////

						var pMovieCinema = document.createElement('span');
						pMovieCinema.className = 'resultOfSearch';
						pMovieCinema.innerHTML = 'Кинотетр: ';
						parentDiv.appendChild(pMovieCinema);

						var pMovieCinemaData = document.createElement('span');
						pMovieCinemaData.innerHTML = resp[key]['cinema'];
						parentDiv.appendChild(pMovieCinemaData);
						var br = document.createElement('br');
						parentDiv.appendChild(br);
						///////////////

						var pSeanceTime = document.createElement('span');
						pSeanceTime.className = 'resultOfSearch';
						pSeanceTime.innerHTML = 'Время сеанса: ';
						parentDiv.appendChild(pSeanceTime);

						var pMovieTimeData = document.createElement('span');
						pMovieTimeData.innerHTML = resp[key]['datetime']
						parentDiv.appendChild(pMovieTimeData);
						var br = document.createElement('br');
						parentDiv.appendChild(br);			
						///////////////
						var br = document.createElement('br');
						parentDiv.appendChild(br);
						var pPrice = document.createElement('span');
						pPrice.className = 'resultOfSearch';
						pPrice.innerHTML = 'Цена: ';
						parentDiv.appendChild(pPrice);

						var pPriceData = document.createElement('span');
						pPriceData.innerHTML = resp[key]['price']
						parentDiv.appendChild(pPriceData);

						parentDiv.appendChild(document.createElement('hr'));

					}
				}
				else {
					 parentDiv.innerHTML = '<h2>По вашему запросу ничего не найдено</h2>';
				}

				//var resp = this.responseText[5];res
				document.getElementById('res').appendChild(parentDiv);
				
			}
		}
	}



var data = '';
function sendData(e) {

		e.preventDefault();

		for (var i = 0; i < fields.length; i++) {
			data += fields[i].name  + '=';
			data += fields[i].value + '&';
		}
		data += select[0].name + '=';
		data += select[0].value + '&';

		sendRequest(data);
		data = '';
}