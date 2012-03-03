<?php
  
  // Path to PHP-SDK
  include_once "../src/facebook.php";   

  $app_id = '101551916642221';   
  $application_secret = 'c59f47a768fa5afae0213a451453daa3';   
  $facebook = new Facebook(array(   'appId'  => $app_id,
    'secret' => $application_secret,
    'cookie' => true, // enable optional cookie support
  ));

  if ($facebook->getSession())
  {
    $user = $facebook->getUser();
  

    $uid = $facebook->getUser(); // get the UID of the current user
    $me = $facebook->api('/me/friends'); // access all the information of friends
    echo "Total friends".sizeof($me['data'])."";

    echo " friends collage ";

    foreach ($me['data'] as $frns)
    {
      // Display the picture of friends one by one
      echo "";
    }

    echo "

    By ";
  }
  else
  {
    $loginUrl = "https://graph.facebook.com/oauth/authorize?type=user_agent&display=page&client_id=APPID
    &redirect_uri=http://apps.facebook.com/CANVAS URL/
    &scope=user_photos";
    echo '';
  }

?>
