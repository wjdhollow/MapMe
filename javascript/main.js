
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
		console.log("-------------EVENT------------");
	         console.log('id: ' + response.data[i].id);
	         console.log('owner: ' + response.data[i].owner);
	         console.log('name: ' + response.data[i].name);
	         console.log('description: ' + response.data[i].description);
	         console.log('start_time: ' + response.data[i].start_time);
	         console.log('end_time: ' + response.data[i].end_time);
	         console.log('location: ' + response.data[i].location);
	         console.log('venue: ' + response.data[i].venue);
	         console.log('privacy: ' + response.data[i].privacy);
	         console.log('updated_time: ' + response.data[i].updated_time);
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
		       console.log(response.data[i].description + ': ' + response.data[i].name);
	            }
                 });
              } 
           });
	};

});


