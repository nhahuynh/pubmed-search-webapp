function search() {
		console.log("My query starting");
		var query = document.getElementById("query").value;
		query = encodeURIComponent(query);
		console.log("my query: " + query);
		var pubmed = "http://www.ncbi.nlm.nih.gov/pubmed/?term=";
		var destinationUrl = pubmed+query;
		console.log("Destination url: " + destinationUrl);
		saveHistory(destinationUrl, query);

		return destinationUrl;
}

function searchCentral() {
		console.log("My query starting");
		var query = document.getElementById("query").value;
		query = encodeURIComponent(query);
		console.log("my query: " + query);
		var pubmedCentral= "https://www.ncbi.nlm.nih.gov/pmc/?term=";
		var destinationUrl = pubmedCentral+query;
		console.log("Destination url: " + destinationUrl);
		saveHistory(destinationUrl, query);

		return destinationUrl;
}

function searchBooks() {
		console.log("My query starting");
		var query = document.getElementById("query").value;
		query = encodeURIComponent(query);
		console.log("my query: " + query);
		var pubmedBooks= "http://www.ncbi.nlm.nih.gov/books/?term=";
		var destinationUrl = pubmedBooks+query;
		console.log("Destination url: " + destinationUrl);
		saveHistory(destinationUrl, query);

		return destinationUrl;
}

function redirectToSite() {
	if ($("#searchpm:checked").is(':checked')) {
			window.location.href = search();
		}
		else if ($("#searchpmc:checked").is(':checked')) {
			window.location.href = searchCentral();
		}
		else {
			window.location.href = searchBooks();
		}
}

$(document).ready(function() {
	// On click of the button
	$("#submitquery").click(function() {
		redirectToSite();
	});
	// On pressing enter on the form
	$('#query').keypress(function (e) {
	 var key = e.which;
	 if(key == 13)  // the enter key code
	  {
	  	// Mimics clicking this button!
	    $('#submitquery').click();
	    return false;
	  }
	});
});

/*function search() {
		console.log("My query starting");
		var query = document.getElementById("query").value;
		query = encodeURIComponent(query);
		console.log("my query: " + query);
		pubmed = "http://www.ncbi.nlm.nih.gov/pubmed/?term=";
		var destinationUrl = pubmed+query;
		console.log("Destination url: " + destinationUrl);
		saveHistory(destinationUrl);
		window.location.href=destinationUrl;
		return false;
}*/
function saveHistory(newEntry, query) {
		console.log("saving history: " + newEntry + "^" + query);
		var currentItems =  JSON.parse(localStorage.getItem("savedHistory"));

		// Not used?
		var myHistoryItem = {};
		//myHistoryItem.label = "xyz";
		myHistoryItem.url = newEntry;

		if (currentItems != null) {
			var newEntries = currentItems;
			newEntries.unshift(newEntry+"^"+query);
		}
		else {
			console.log("No history");
			var newEntries = [newEntry+"^"+query];
		}

		//localStorage.setItem("savedHistory", newEntry);
		localStorage.setItem("savedHistory", JSON.stringify(newEntries));
		console.log("my history" + localStorage.getItem("savedHistory"));
}

function readHistory() {
	console.log("readHistory" + localStorage.getItem("savedHistory"));
	//var item1 =  localStorage.getItem("savedHistory");
	var items =  JSON.parse(localStorage.getItem("savedHistory"));

	var historyBox = document.getElementById("historyBox");

	if ( items != null) {
		for (i = 0; i < 5; i++) {
			var inter= items[i].split("^");
	    //var item = inter[0];
	    historyBox.innerHTML +=  "<a href=\""  + inter[0]  + "\">"+inter[1]+"</a><br>";
		}
	}
	else {
		console.log("No history");
	}
}

window.onload = function() {
	console.log("onload");
	readHistory();
}
