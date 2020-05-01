var LaunchDarkly = require('launchdarkly-node-client-sdk');

const user = {
  "firstName":"Bob",
  "lastName":"Loblaw",
  "key":"bob@example.com",
  "custom":{
     "groups":"beta_testers"
  }
};

// TODO: Enter your LaunchDarkly Client-side ID here
const ldClient = LaunchDarkly.initialize("YOUR_CLIENT_SIDE_ID", user);

ldClient.on('ready', () => {
  // TODO: Enter the key for your feature flag here
  const showFeature = ldClient.variation("YOUR_FEATURE_FLAG_KEY", user, false);

  if (showFeature) {
    // application code to show the feature
    console.log("Showing your feature to " + user.key);
  } else {
    // the code to run if the feature is off
    console.log("Not showing your feature to " + user.key);
  }

  ldClient.close(() => {
    console.log('Client has been closed');
    process.exit(0);
  });
});

// var user = {
//   firstName: 'Bob',
//   lastName: 'Loblaw',
//   key: "aa0ceb"
// };
//
// var ldclient = LaunchDarkly.initialize('5eac2e28bd0c3a0a90542fd9', user);
//
// ldclient.on('ready', function() {
//   var showFeature = ldclient.variation('new-search-bar', false);
//   if (showFeature) {
//     // application code to show the feature
//     console.log('Showing your feature to ' + user.key );
//   } else {
//     // the code to run if the feature is off
//     console.log('Not showing your feature to ' + user.key);
//   }
//
//   ldClient.close(() => {
//     console.log('Client has been closed');
//     process.exit(0);
//   });
// });
