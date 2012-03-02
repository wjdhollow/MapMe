<?php
// Path to PHP-SDK
require '../php-sdk/facebook.php';

$facebook = new Facebook(array(
  'appId'  => ' 319369998112036',
  'secret' => ' f4b4e8760670ae28f027d23f0b8f331e',
));

// See if there is a user from a cookie
$user = $facebook->getUser();

if ($user) {
  try {
    // Proceed knowing you have a logged in user who's authenticated.
    $user_profile = $facebook->api('/me');
  } catch (FacebookApiException $e) {
    echo '<pre>'.htmlspecialchars(print_r($e, true)).'</pre>';
    $user = null;
  }
}

?>
<!DOCTYPE html>
<html xmlns:fb="http://www.facebook.com/2008/fbml">
<head>
	<title>Facebook Application Local Development</title>
	<link type="text/css" rel="stylesheet" href="css/reset.css">
	<link type="text/css" rel="stylesheet" href="css/main.css">
</head>
  <body>
	<div id="login">
		<?php if (!$user) { ?>
		  <fb:login-button></fb:login-button>
		<?php } ?>
	</div>
	<div id="cont">
		<?php if ($user): ?>
		<img src="https://graph.facebook.com/<?php echo $user; ?>/picture">
		<p>Hello <?php echo $user_profile['name']; ?>!</p>

		<?php else: ?>
		<strong><em>You are not Connected.</em></strong>
		<?php endif ?>
	</div>
    <div id="fb-root"></div>
    <script>
      window.fbAsyncInit = function() {
        FB.init({
          appId: '<?php echo $facebook->getAppID() ?>',
          cookie: true,
          xfbml: true,
          oauth: true
        });
        FB.Event.subscribe('auth.login', function(response) {
          window.location.reload();
        });
        FB.Event.subscribe('auth.logout', function(response) {
          window.location.reload();
        });
      };
      (function() {
        var e = document.createElement('script'); e.async = true;
        e.src = document.location.protocol +
          '//connect.facebook.net/en_US/all.js';
        document.getElementById('fb-root').appendChild(e);
      }());
    </script>
  </body>
</html>