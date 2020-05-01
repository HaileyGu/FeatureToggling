// https://github.com/launchdarkly/hello-node-server/blob/master/index.js


// Create a file called index.js and import the LaunchDarkly client:
var LaunchDarkly = require('launchdarkly-node-server-sdk');

// Then, create a single, shared instance of the LaunchDarkly client. In this tutorial we'll name it ldclient and pass it your environment-specific SDK key:
var ldclient = LaunchDarkly.init('YOUR_SDK_KEY');

// Finally, update your code to call LaunchDarkly:
user = {
   "firstName":"Bob",
   "lastName":"Loblaw",
   "key":"bob@example.com",
   "custom":{
      "groups":"beta_testers"
   }
};

ldclient.once('ready', function() {
  ldclient.variation('YOUR_FEATURE_FLAG_KEY', user, false, function(err, showFeature) {
    if (showFeature) {
      // application code to show the feature
      console.log('Showing your feature to ' + user.key );
    } else {
      // the code to run if the feature is off
      console.log('Not showing your feature to ' + user.key);
    }

    // Close the LaunchDarkly SDK to flush all buffered events and close all open connections.
    //
    // IMPORTANT: in a real application, this step is something you would only do when the application is
    // about to quit-- NOT after every call to variation(). The reason that this step is inside the variation
    // handler is flags cannot be evaluated after the SDK is closed.
    ldclient.close();
  });
});
