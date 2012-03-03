window.fbAsyncInit = function() {
  FB.init({
    appId      : '319369998112036',
    status     : true, 
    cookie     : true,
    xfbml      : true,
    oauth      : true,
  });

  // additional initialization code goes here
  FB.login(function(response) {
    if (response.authResponse) {

      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
      });
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  });
};

(function(d){
  var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  d.getElementsByTagName('head')[0].appendChild(js);
}(document));