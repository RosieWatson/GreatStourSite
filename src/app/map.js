// Initialize and add the map

function initialise() {
    google.maps.event.addDomListener(window, "load", initMap);
}

function initMap() {
    // The location of Canterbury
    var canterbury = {lat: 51.277260, lng: 1.080460};
    // The map, centered on Canterbury
    var map = new google.maps.Map(
        document.getElementById('map'),
        {
            zoom: 12,
            center: canterbury,
            disableDefaultUI: true
        });
    // The marker, positioned at Canterbury by default
    var marker = new google.maps.Marker({position: canterbury, map: map});

    var contentString = '<div id="content">'+
        '<h1 class="firstHeading">Basic Info Window</h1>'+
        '<div id="bodyContent">'+
        '<p>Text content with words and letters</p>'+
    '<p>Link: <a href="https://reddit.com">Reddit</a></p>'+
    '<div style="float:left">'+
    '<img src="https://i.redd.it/x1kyb3bi7mh11.jpg">'+
    '</div>'+
    '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });

    marker.setAnimation(google.maps.Animation.BOUNCE);
}
