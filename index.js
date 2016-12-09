var http       = require('http')
  , AlexaSkill = require('./AlexaSkill')
  , APP_ID     = 'amzn1.ask.skill.8e24456e-a09f-4389-8e67-11af297af7ca'
  , API_KEY    = ''

  , https = require('http')
  , parseString = require('xml2js').parseString
  , striptags = require('striptags');

var xmlurl = function(conditionId){
  return 'http://v1.syndication.nhschoices.nhs.uk/conditions/articles/'+conditionId+'/symptoms.xml?apikey=' + API_KEY;
};

var xmlurl = function(conditionId, type){
  conditionId=conditionId.replace(" ","-");
  return 'http://v1.syndication.nhschoices.nhs.uk/conditions/articles/'+conditionId+'/'+type+'.xml?apikey=' + API_KEY;
};

function xmlToJson(url, callback) {
    var req = https.get(url, function(res) {
      var xml = '';

      res.on('data', function(chunk) {
        xml += chunk;
      });

      res.on('error', function(e) {
        callback(e, null);
      });

      res.on('timeout', function(e) {
        callback(e, null);
      });

      res.on('end', function() {
        parseString(xml, function(err, result) {
          callback(null, result);
        });
      });
    });
  }

var handleNextSymptomRequest = function(intent, session, response){

  xmlToJson(xmlurl(intent.slots.condition.value, 'symptoms'), function(err, data) {
    var thedata = data['feed']['entry'][0]['content'][0]['_'];
    var text = striptags(thedata);
    var cardText = text;
    var heading = 'Symptoms of ' + intent.slots.condition.value;
    response.tellWithCard(text, heading, cardText);
  });

};

var handleNextTreatmentRequest = function(intent, session, response){

  xmlToJson(xmlurl(intent.slots.condition.value, 'treatment'), function(err, data) {
    var thedata = data['feed']['entry'][0]['content'][0]['_'];
    var text = striptags(thedata);
    var cardText = text;
    var heading = 'Treatments for ' + intent.slots.condition.value;
    response.tellWithCard(text, heading, cardText);
  });

};

var handleNextPreventionRequest = function(intent, session, response){

  xmlToJson(xmlurl(intent.slots.condition.value, 'prevention'), function(err, data) {
    var thedata = data['feed']['entry'][0]['content'][0]['_'];
    var text = striptags(thedata);
    var cardText = text;
    var heading = 'Treatments for ' + intent.slots.condition.value;
    response.tellWithCard(text, heading, cardText);
  });

};

var BusSchedule = function(){
  AlexaSkill.call(this, APP_ID);
};

BusSchedule.prototype = Object.create(AlexaSkill.prototype);
BusSchedule.prototype.constructor = BusSchedule;

BusSchedule.prototype.eventHandlers.onSessionStarted = function(sessionStartedRequest, session){
  // What happens when the session starts? Optional
  console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId
      + ", sessionId: " + session.sessionId);
};

BusSchedule.prototype.eventHandlers.onLaunch = function(launchRequest, session, response){
  // This is when they launch the skill but don't specify what they want. Prompt
  // them for their bus stop
  var output = 'Welcome to Medical info. ' +
    'How can I help?';

  var reprompt = 'Which condition do you want to find more about?';

  response.ask(output, reprompt);

  console.log("onLaunch requestId: " + launchRequest.requestId
      + ", sessionId: " + session.sessionId);
};

BusSchedule.prototype.intentHandlers = {
  SymptomsIntent: function(intent, session, response){
    handleNextSymptomRequest(intent, session, response);
  },

  TreatmentIntent: function(intent, session, response){
    handleNextTreatmentRequest(intent, session, response);
  },

  PreventionIntent: function(intent, session, response){
    handleNextPreventionRequest(intent, session, response);
  },

  HelpIntent: function(intent, session, response){
    var speechOutput = 'I sorry, I couldn\'t find that information. Please try again.';
    response.ask(speechOutput);
  }
};

exports.handler = function(event, context) {
    var skill = new BusSchedule();
    skill.execute(event, context);
};
