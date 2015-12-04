function setMapMarker(lan,lng){
	var centerLatLng = new google.maps.LatLng(lan,lng);
	var coordcenter = new google.maps.LatLng(lan,lng);
	map.setCenter(coordcenter);
	map.setZoom(6);
}

function mapInit() {
    var myOptions = {
		zoom: 4,
		center: new google.maps.LatLng(54.935710, 53.258500),
   		zoomControlOptions: {
   			style: google.maps.ZoomControlStyle.LARGE, 
   			position: google.maps.ControlPosition.RIGHT_TOP
    	},
    	streetViewControl: false,
        scaleControl: true,
        scrollwheel: false,
        panControl: true,
		navigationControl: false,
		mapTypeControl: false,
		zoomControl:true,
		draggable: false,
		rotateControl:true,
		styles: [
		    {
		        "featureType": "landscape",
		        "stylers": [
		            {
		                "saturation": -100
		            },
		            {
		                "lightness": 65
		            },
		            {
		                "visibility": "on"
		            }
		        ]
		    },
		    {
		        "featureType": "poi",
		        "stylers": [
		            {
		                "saturation": -100
		            },
		            {
		                "lightness": 51
		            },
		            {
		                "visibility": "simplified"
		            }
		        ]
		    },
		    {
		        "featureType": "road.highway",
		        "stylers": [
		            {
		                "saturation": -100
		            },
		            {
		                "visibility": "simplified"
		            }
		        ]
		    },
		    {
		        "featureType": "road.arterial",
		        "stylers": [
		            {
		                "saturation": -100
		            },
		            {
		                "lightness": 30
		            },
		            {
		                "visibility": "on"
		            }
		        ]
		    },
		    {
		        "featureType": "road.local",
		        "stylers": [
		            {
		                "saturation": -100
		            },
		            {
		                "lightness": 40
		            },
		            {
		                "visibility": "on"
		            }
		        ]
		    },
		    {
		        "featureType": "transit",
		        "stylers": [
		            {
		                "saturation": -100
		            },
		            {
		                "visibility": "simplified"
		            }
		        ]
		    },
		    {
		        "featureType": "administrative.province",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "elementType": "labels",
		        "stylers": [
		            {
		                "visibility": "on"
		            },
		            {
		                "lightness": -25
		            },
		            {
		                "saturation": -100
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "hue": "#ffff00"
		            },
		            {
		                "lightness": -25
		            },
		            {
		                "saturation": -97
		            }
		        ]
		    }
		]
	};
       
	map = new google.maps.Map(document.getElementById('map-holder'), myOptions);

	var layer = new google.maps.FusionTablesLayer({
        query: {
            select: 'geometry',
            from: '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk',
            where: "ISO_2DIGIT IN ('UA')"
        },
        styles: [
            {
                polygonOptions: {
                    fillColor: "#7cccbf",
    				strokeColor: "#7cccbf",
                    fillOpacity: "0.3"
                }
            }
        ]
    });
    layer.setMap(map);
	$('body').on('click', '.js_map-point', function(){
		var cId = $(this).attr('data-map');
		layer.setMap(null);
		layer = new google.maps.FusionTablesLayer({
	        query: {
	            select: 'geometry',
	            from: '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk',
	            where: "ISO_2DIGIT IN ('"+cId+"')"
	        },
	        styles: [
	            {
	                polygonOptions: {
	                    fillColor: "#7cccbf",
    					strokeColor: "#7cccbf",
	                    fillOpacity: "0.3"
	                }
	            }
	        ]
	    });
	    $('html, body').animate({
	        scrollTop: parseInt($("#map-holder").offset().top)
	    }, 1000);
	    tLink = $(this);
	 	setTimeout(function(){
	 		console.log('LOL')
			lan = tLink.attr('data-lan');
			lng = tLink.attr('data-lng');
			setMapMarker(lan,lng);
	 	}, 800);
	 	setTimeout(function(){
			layer.setMap(map);
		}, 800);
	})

}//end initialize function

$(document).ready(function(){
	mapInit();
});