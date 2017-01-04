<script type="text/javascript">
// 	  center: new google.maps.LatLng(),
var markersArray = [];

function loadMap(){
	var mapOptions = {
		overviewMapControl:true,
		overviewMapControlOptions: {
			opened: true
		},
	  zoom: 13,
	  center: new google.maps.LatLng(43.6045, 1.44343),
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	google.maps.event.addListener(map, 'idle', function(){
		loadPointsFromXML(map);
	});
}

function loadPointsFromXML(map) {
	var Result;
	jQuery.ajax({ 
		url: "get_xml.php",
		type: "GET",
		data : "ZoomLevel="+ map.getZoom() +"&CenterLat="+  map.getCenter().lat() +"&CenterLng="+ map.getCenter().lng(),
		async: false, 
		success: function(data){ Result = data;} 
	});
	parseXML(Result, map);
//	
//	alert('Result '+ Result)
//	alert('ok');
//	var request = GXmlHttp.create();
	//grab the xml
//		alert("get_xml.php?ZoomLevel="+ map.getZoom() +"&CenterLat="+  map.getCenter().y +"&CenterLng="+ map.getCenter().x);
/*        request.open("GET", "get_xml.php?ZoomLevel="+ map.getZoom() +"&CenterLat="+  map.getCenter().y +"&CenterLng="+ map.getCenter().x, true);
	request.onreadystatechange = function() {
		if (request.readyState == 1) {
			document.getElementById("chargement").innerHTML = "<BLINK>... données en cours de mise à jour ...</BLINK>";
		}
		if (request.readyState == 4) {
			document.getElementById("chargement").innerHTML = "Affichage des amiziens terminé !";
			var xmlDoc = request.responseXML;
			parseXML(xmlDoc, map);
        }
    }
    request.send(null);*/
}


function parseXML(xml, map) {
	var bounds = map.getBounds();
	//get rid of existing markers
	if (markersArray) {
		for (i in markersArray) {
			markersArray[i].setMap(null);
		}
	}
	markersArray.length = 0;

  // while(overlays[0]) {
	  // overlays.pop().setMap(null);
	// }
	$(xml).find('Membre').each( function(){ 
		var lat = parseFloat($(this).attr('lat'));
		var lng = parseFloat($(this).attr('lng'));
		var Pseudo = $(this).attr('Pseudo');
		var N_Utilisateur = $(this).attr('N_Utilisateur');
		var Age = $(this).attr('Age');
		var Photo = $(this).attr('Photo');
		var Largeur = $(this).attr('Largeur');
		var Hauteur = $(this).attr('Hauteur');
		var Date_Inscription = $(this).attr('Date_Inscription');
		var Date_Derniere_Visite = $(this).attr('Date_Derniere_Visite');
		var Ville = $(this).attr('Ville');
		var Code_Postal = $(this).attr('Code_Postal');

        var point = new google.maps.LatLng(lat,lng);
		if (bounds.contains(point)) {
			var html = "<A HREF=/Membres/Fiche_Membre_Simple.php?N_Util="+ N_Utilisateur +" Target=_new><B>"+ Pseudo +"</B></A><BR>"+ Age +" ans<BR>"+ Code_Postal +" "+ Ville +"<BR><BR>Date d'inscription : "+ Date_Inscription +"<BR>Dernière connexion : "+ Date_Derniere_Visite;
			createMarker(point, html, Photo, Largeur, Hauteur, map);
		}
	} );
//	map.clearOverlays();
//	alert(markers.length);
/*	for (var i = 0; i < markers.length; i++) {
		// obtain the attribues of each marker
            //check if point is inside the viewing area of the map
        if (bounds.contains(point) == true) {
			var html = "<A HREF=/Membres/Fiche_Membre_Simple.php?N_Util="+ markers[i].getAttribute("N_Utilisateur") +" Target=_new><B>"+ markers[i].getAttribute("Pseudo") +"</B></A><BR>"+ markers[i].getAttribute("Age") +" ans<BR>"+ markers[i].getAttribute("Code_Postal") +" "+ markers[i].getAttribute("Ville") +"<BR><BR>Date d'inscription : "+ markers[i].getAttribute("Date_Inscription") +"<BR>Dernière connexion : "+ markers[i].getAttribute("Date_Derniere_Visite");
			var photo = markers[i].getAttribute("Photo");
			var Largeur = markers[i].getAttribute("Largeur");
			var Hauteur = markers[i].getAttribute("Hauteur");
			var marker = createMarker(point,html, photo, Largeur, Hauteur, map);
			map.addOverlay(marker);
		}
	}*/
}

//function from Mike Williams http://www.econym.demon.co.uk/googlemaps/
function createMarker(point, html, photo, Largeur, Hauteur, map) {
/*
	var image = new google.maps.MarkerImage(
		photo,
		null,
		null,
		new google.maps.Point(Largeur/2, Hauteur/2),
		new google.maps.Size(Largeur, Hauteur)
	);
*/
	marker = new google.maps.Marker({
		position: point,
		map: map,
		icon: photo
	});

	markersArray.push(marker);

	var infowindow = new google.maps.InfoWindow({
		content: html
	});

	google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
	});
	
/*
	var icon = new GIcon();
	icon.image = photo;
	icon.iconSize = new GSize(Largeur, Hauteur);
	icon.iconAnchor = new GPoint(Largeur/2, Hauteur/2);
	icon.infoWindowAnchor = new GPoint(0.9*Largeur, 0.1*Hauteur);

	var marker = new GMarker(point,icon);
	GEvent.addListener(marker, "click", function() {
		marker.openInfoWindowHtml(""+html+"");
	});
	*/
	return marker;
}

    //]]>
    </script>

				</Div>
				<CENTER>
