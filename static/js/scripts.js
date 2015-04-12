    map = {};
    google.maps.event.addDomListener(window, 'load', initialize);
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    myPos = {};

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
              window.myPos = pos;
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
        center: window.myPos,
      }

      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      console.log("Map set");

      var marker2 = new google.maps.Marker({
          position: window.myPos,
          icon: goldStar,
          map: map,
          title: 'Hello World!'
      });

       setInterval(function(){
       //marker2.setMap(null);
       getMyGeolocation();

       marker2.position = window.myPos;
       marker2.setMap(map);
        }, 5000);

    }