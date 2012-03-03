
$(document).ready(function() {
  

  var map;


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

  function placeMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });

    map.setCenter(location);

  }

    
  

  	(function(d){
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
      document.body.appendChild(script);

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



