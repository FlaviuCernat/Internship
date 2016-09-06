var myCenter=new google.maps.LatLng(46.7659820,23.5789280);

function initialize()
{
  var mapProp = {
    scrollwheel:false,
    center:myCenter,
    zoom:17,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("map"),mapProp);
  var marker=new google.maps.Marker({
    position:myCenter,

    });

  marker.setMap(map);
  var infowindow = new google.maps.InfoWindow({
    content:"<div class='adress'><p id='adress_word'>Adress</p> JavaScript Division<br /> 4th Floor, Evozon Systems <br />Calea Moților 62, Cluj-Napoca 400370<br />Cluj, Romania</div>"
    });
  infowindow.open(map,marker);
}
google.maps.event.addDomListener(window, 'load', initialize);
