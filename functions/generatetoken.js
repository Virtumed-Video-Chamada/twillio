exports.handler = function(context, event, callback) {
  const TWILIO_ACCOUNT_SID = context.TWILIO_ACCOUNT_SID;
  const TWILIO_API_KEY_SID = context.TWILIO_API_KEY_SID;
  const TWILIO_API_KEY_SECRET = context.TWILIO_API_KEY_SECRET;
  // create random accesstokenidentity for every participant that will join the group
  const ACCESS_TOKEN_IDENTITY =
    Math.random()
      .toString(36)
      .substring(2, 15);
  
      const response = new Twilio.Response();
      response.appendHeader('Access-Control-Allow-Origin', '*');
      response.appendHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
      response.appendHeader('Content-Type', 'application/json');

  const ROOM_NAME = 'myfirstvideoapp';  // fixed room name
  const AccessToken = require('twilio').jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;
  
  // enable client to use video, only for this room 
  const videoGrant = new VideoGrant({
      room: ROOM_NAME
  });

  const accessToken = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET);
  
  accessToken.addGrant(videoGrant); //Add the grant to the token
  accessToken.identity = ACCESS_TOKEN_IDENTITY;
  response.setBody({token: accessToken.toJwt()})
  callback(null, response);
};