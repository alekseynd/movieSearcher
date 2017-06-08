function show(state){

	document.getElementById('backWindow').style.display = state;			
	document.getElementById('wrap').style.display = state; 			
}

var searchMovieBtn =  document.getElementById('search-movie');

var seanceDate = document.getElementById('seanceDate');

searchMovieBtn.addEventListener('click', searchMovie);


function sendMovieData(argName) {
	var respParagraphs =  document.getElementsByClassName('respInfo');
	console.log('sendReqStarted');
	//var movie = 'movieName=' + movieName;

	RequestMovie = new XMLHttpRequest();

	RequestMovie.open('GET', './php/movieSearch.php?' + argName, true);

	RequestMovie.send();


   RequestMovie.onreadystatechange = function() {
        if (RequestMovie.readyState != 4) return;

        if (RequestMovie.status != 200) {
         
          alert(RequestMovie.status + ': ' + RequestMovie.statusText);
        } else {

          var resp = JSON.parse(this.responseText);
                  	console.log(resp)
          if (resp !=='0 results') { 
          	for (var key in resp) {
          		respParagraphs[0].innerHTML = resp[key].Movie;
				respParagraphs[1].innerHTML = resp[key].Directed
				respParagraphs[2].innerHTML = resp[key].census
				if (resp[key].STAFF) {
					respParagraphs[3].innerHTML = resp[key].STAFF;
				}
				else {
					respParagraphs[3].innerHTML = "Нет данных";
				}
					respParagraphs[4].innerHTML = resp[key].desc;	
          	}

	        document.getElementById('tableAnsw').style.display = "block";
	        document.getElementById('notFound').style.display = "none";
          }
          else {
          	respParagraphs = [];
          	document.getElementById('tableAnsw').style.display = "none";
          	document.getElementById('notFound').style.display = "block";
          }
        
        show('block');
        	
        }

      }

}

function searchMovie(e) {
	var movieName =  document.getElementById('movie-name').value;
	movieName = 'movieName='+ movieName; 

	e.preventDefault();
	
	console.log('movieName', movieName);

	sendMovieData(movieName);

}