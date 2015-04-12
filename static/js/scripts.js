


    function pollTweets() {
      requestTweets();
    };
    pos = {};
    tweetData = {};
    map = {};
    my_markers = [];
    info_windows = [];
    contentStringArray=[]
    locationArray = []
    to_delete_array = []
    google.maps.event.addDomListener(window, 'load', initialize);
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    function requestTweets() {
      $.ajax({
        type: 'GET',
        url: '../getTweets',
        //contentType: 'application/json; charset=utf-8',
        success: function(data) {
          console.log(data)

          //document.getElementById("demo").innerHTML = data[0]['locationx']
          tweetData = data;
          console.log("Map gonna be used")
          setMarkers(map, tweetData);
          
        }, 
            // Overlay function stuff happens here
        //error: playSound,
        dataType: 'json'
      });
    }

       function getMyGeolocation(){
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = new google.maps.LatLng(position.coords.latitude,
                                               position.coords.longitude);
              console.log(pos);
              var infowindow = new google.maps.InfoWindow({
                map: map,
                position: pos,
                content: 'Location found using HTML5.'
              });

              map.setCenter(pos);
            }, function() {
              handleNoGeolocation(true);
            });
          } else {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false);
          }

          }

        function handleNoGeolocation(errorFlag) {
          if (errorFlag) {
            var content = 'Error: The Geolocation service failed.';
          } else {
            var content = 'Error: Your browser doesn\'t support geolocation.';
          }

          var options = {
            map: map,
            position: new google.maps.LatLng(60, 105),
            content: content
          };

          var infowindow = new google.maps.InfoWindow(options);
          map.setCenter(options.position);
        }


    function initialize() {

        var goldStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: "yellow",
        fillOpacity: 0.8,
        scale: 0.1,
        strokeColor: "red",
        strokeWeight: 14
      };


        //Location stuff
        getMyGeolocation();
        //End of location stuff


       var mapOptions = {
        zoom: 16,
        center: {lat: 43.7045, lng: -72.2946},
      }

      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      console.log("Map set");

      var marker2 = new google.maps.Marker({
          position: {lat: 43.7045, lng: -72.2946},
          icon: goldStar,
          map: map,
          title: 'Hello World!'
      });

       setInterval(function(){
       //marker2.setMap(null);
       getMyGeolocation();
       marker2.position = {lat: 43.7045, lng: -72.2946}
       //marker2.setMap(map);
        }, 5000);



    }

    function buttonFunct(){

      var query = document.getElementById("thatsearchbar");
      var queryVal = query.value;
      console.log(queryVal);
      for(i=0;i< my_markers.length;i++){
        //query = document.getElementsByName("thatsearchbar")[0].value;
        //console.log(contentStringArray[i])
        var content = contentStringArray[i].toLowerCase();
        if(content.indexOf(queryVal.toLowerCase())==-1){
          //my_markers[i].icon.path =  google.maps.SymbolPath.BACKWARD_OPEN_ARROW
          //my_markers[i].info
          my_markers[i].setMap(null);
          console.log("deleted one");

        }
        else{
            my_markers[i].setMap(map);
            console.log("set one");
        }
      }
    }



function arr_diff(a1, a2){
  var a=[], diff=[];
  for(var i=0;i<a1.length;i++)
    a[a1[i]]=true;
  for(var i=0;i<a2.length;i++)
    if(a[a2[i]]) delete a[a2[i]];
    else a[a2[i]]=true;
  for(var k in a)
    diff.push(k);
  return diff;
}

function setClear() {
  for (var i = 0; i < my_markers.length; i++) {
    my_markers[i].setMap(null);
  }
  my_markers = [];
  locationArray = [];
  contentStringArray = [];
  requestTweets();
}