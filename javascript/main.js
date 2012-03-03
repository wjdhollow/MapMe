
$(document).ready(function() {
	
	window.fbAsyncInit = function() {
   		FB.init({
      		appId      : '319369998112036',
      		status     : true, 
      		cookie     : true,
      		xfbml      : true,
      		oauth      : true,
    	});
  	};

  	(function(d){
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
	var currentTime = Math.round((new Date()).getTime() / 1000);
           FB.api('/me/friends', function(response) {
              for(var i=0; i<response.data.length; i++) {
                 friendId = response.data[i].id; 
                 FB.api('/'+friendId+'/events', function(response) {
                    for(var j=0; j<response.data.length; j++) {
		 	var eventEndTimeString = response.data[j].end_time;
			var d = new Date(eventEndTimeString);
			var eventEndTime = Math.round(d.getTime() / 1000);
			// filters it based on current time, so past events dont come up
			if (currentTime <= eventEndTime) {
		       		console.log('Friends Event: ' + response.data[j].name);
				console.log('End time: ' + d);
			}

	            }
                 });
              } 
           });
	};

});


