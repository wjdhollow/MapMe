
$(document).ready(function() {




    $(function(){
            navigator.geolocation.getCurrentPosition(setLocation);
            function setLocation(location){
                    window.userLocation = location;
                    window.map = new MapView;
            }
     
            window.EventModel = Backbone.Model.extend({
                   
            });
           
            window.MapModel = Backbone.Model.extend({
                   
            });
     
            window.EventCollection = Backbone.Collection.extend({
                    model: EventModel
                   
            });
           
            window.MapView = Backbone.View.extend({
           
                    initialize: function(){
                            this.buildMap();
                            var that = this;
                            google.maps.event.addListener(this.autocomplete, 'place_changed', function () {
                                    var place = that.autocomplete.getPlace();
                                    if(place.id==undefined){
                                            searchRequest = {
                                                    bounds: that.map.getBounds(),
                                                    keyword: that.input.value
                                            };
                                            function searchCallback(results, status) {
                                                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                                                            for (var i = 0; i < results.length; i++) {
                                                                    that.createMarker(results[i]);
                                                            }
                                                    }
                                            }
                                            that.service.search(searchRequest,searchCallback);
                                    }
                                    else{
                                            if (place.geometry.viewport) {
                                                    that.map.fitBounds(place.geometry.viewport);
                                            }
                                            else {
                                                    that.map.setCenter(place.geometry.location);
                                                    that.map.setZoom(17); // Why 17? Because it looks good.
                                            }
                                            var marker = that.createMarker(place);
                                            
                                            //_.extend(marker, Backbone.Events);
                                            

                                    }
                            });
                    },
           
                    render: function() {
                      $(this.el).html(this.template(this.model.toJSON()));
                      return this;
                    },
                    buildMap: function(){
                            var mapOptions = {
                                    center: new google.maps.LatLng(window.userLocation.coords.latitude, window.userLocation.coords.longitude),
                                    zoom: 17,
                                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                                    disableDoubleClickZoom: false
                            };
                            this.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
                            this.input = document.getElementById('searchTextField');
                            this.autocomplete = new google.maps.places.Autocomplete(this.input);
                            this.service = new google.maps.places.PlacesService(this.map);
                            this.autocomplete.bindTo('bounds', this.map);
                    },
                    createMarker: function (placeResult){
                            var marker = new google.maps.Marker({
                                    map: this.map
                            });

                            marker.setPosition(placeResult.geometry.location);
                            var address = '';
                            if (placeResult.address_components) {
                                    address = [(placeResult.address_components[0] && placeResult.address_components[0].short_name || ''), (placeResult.address_components[1] && placeResult.address_components[1].short_name || ''), (placeResult.address_components[2] && placeResult.address_components[2].short_name || '')].join(' ');
                            }
                            var contentString = '<div><strong>' + placeResult.name + '</strong><br>' + address + '<br /><button class="newEvent" name="'+placeResult.name+'" id='+placeResult.reference+'>New Event</button>';
                            var infowindow = new google.maps.InfoWindow({
                              content: contentString
                            });

                            google.maps.event.addListener(marker, 'click', function(){
                                    //this.map.setCenter(marker.getPosition());
                                    infowindow.open(map,marker);
                            });
                            
                            //this.createInfoWindow(placeResult, marker);
                            //return marker;
                    }
                    /*
                    createInfoWindow: function (place, marker){
                            
                            var infowindow = new google.maps.InfoWindow();
                            var address = '';
                            if (place.address_components) {
                                    address = [(place.address_components[0] && place.address_components[0].short_name || ''), (place.address_components[1] && place.address_components[1].short_name || ''), (place.address_components[2] && place.address_components[2].short_name || '')].join(' ');
                            }
                            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address + '<br /><button class="newEvent" name="'+place.name+'" id='+place.reference+'>New Event</button>');
                            
                            google.maps.event.addListener(marker, 'click', function(){
                                    alert('click event on marker');
                                    infowindow.open(map, marker);        
                            });
                            
                            
                            
                    }
                    */
                   
            });
            
            window.EventView = Backbone.View.extend({
                   
            });
           
            window.AppView = Backbone.View.extend({
           
            });
     
    });




















  

  var User = Backbone.Model.extend({
    defaults: {
      name: 'nobody',
      id: 123,
      friends: []
    },
    
    befriend: function ( newFriend ) {
      var friend_array = this.get('friends');
      friend_array.push( newFriend );
      this.set({friends: friend_array});
    }

  });

  var myUser = new User;
  
	window.fbAsyncInit = function() {
   		FB.init({
      		appId      : '319369998112036',
      		status     : true, 
      		cookie     : true,
      		xfbml      : true,
      		oauth      : true,
    	});

      FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {

          FB.api('/me', function(response) {
            $('#image').attr('src','http://graph.facebook.com/' + response.id + '/picture');            
            $('#name').text(response.name);
            myUser.set({name: response.name, id: response.id});
          });

          FB.api('/me/friends', function(response) {
            for (var i = 0; i < response.data.length; i++) {
              friendId = response.data[i].id;
              friendName = response.data[i].name;
              friend = new User;
              friend.set({ name : friendName, id : friendId});
              // console.log('friend setup ' + friendName + ' ' + friendId);
              myUser.befriend(friend);
            }
          });
          
        }
      });
  	};

  //navigator.geolocation.getCurrentPosition(setLocation);
/*
  window.initialize= function() {
    var myLatlng = new google.maps.LatLng(-34.397, 150.644);

    var myOptions = {
      zoom: 8,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    google.maps.event.addListener(map, 'click', function(event) {
      placeMarker(event.latLng);
    });

  };
  */
/*
  function setLocation(location) {
    var mylatlng = new google.maps.LatLng(location.coords.latitude,location.coords.longitude);
    map.setCenter(mylatlng);
    map.setZoom(17);
  }

  function placeMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });

    map.setCenter(location);

  }
*/
    
  

  	(function(d){

/*      
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize&libraries=places";
      document.body.appendChild(script);
      
*/
    	var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
    	js = d.createElement('script'); js.id = id; js.async = true;
    	js.src = "//connect.facebook.net/en_US/all.js";
    	d.getElementsByTagName('head')[0].appendChild(js);
  	}(document));
   	// put all your jQuery goodness in here.

	window.showName = function()  {
		FB.api('/me', function(response) {
   			alert(response.name);
   		});
	};

	// Outputs all of the user's events to the console.
       window.myEvents = function() {
	   FB.api('/me/events', function(response) {
            for(var i=0; i<response.data.length; i++) {
		    var eventID = response.data[i].id;
		    console.log(response.data[i].name + ': ' + eventID);
		    FB.api(eventID, function(response) {
		      console.log('event:' + response.owner.name);
		    });
	     }
      });
	};

	// Outputs all the user's friend's events to the console
	window.friendsEvents = function() {

       FB.api('/me/friends', function(response) {
      for(var i=0; i<response.data.length; i++) {
        friendId = response.data[i].id; 
        FB.api('/'+friendId+'/events', function(response) {
          for(var i=0; i<response.data.length; i++) {
	    var eventID = response.data[i].id;
	    FB.api(eventID, function(response) {
		FB.api(response.id + '/attending', function(response) {
		   for(var i=0; i<response.data.length; i++) {
			console.log(response.data[i]);
		   }
		});

	      });
	    }
         });
      } 
    });
	};

/*  
  window.initializeMap = function() {
        var myOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            myOptions);
  }
*/

  /*
  window.loadMap = function()  {
    var latLong = new google.maps.LatLng(44.798609, -91.504912);

    var mapOptions = {
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: latLong
    };

    var map = new google.maps.Map($('#map_canvas'), mapOptions);
  };
  */
});



