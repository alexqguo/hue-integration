const creds = require('./credentials');
const dashButton = require('node-dash-button');
const hue = require('node-hue-api');
const HueApi = hue.HueApi;
const lightState = hue.lightState;

// Setup APIs
const api = new HueApi(creds.host, creds.username);
const dash = dashButton(creds.dashAddress);

// Setup random shit
const brightness = 178; // 70% brighntess
const livingRoomGroupId = 1; // Group ID of my living room lights
const offLightState = lightState.create().on(false);
const onLightState = lightState.create().on().bri(brightness);

// Generic display results callback
function displayResult(result) {
    console.log(JSON.stringify(result, null, 2));
}

function setLivingRoomLightState(lightState) {
    api.setGroupLightState(livingRoomGroupId, lightState)
        .catch((error) => { console.error(error) })
        .done();
}

function controlLivingRoom() {
    // getGroup isn't too slow, this is fine
    api.getGroup(livingRoomGroupId)
        .then((result) => {
            let lightsAreOn = result && result.lastAction && result.lastAction.on;
            setLivingRoomLightState(lightsAreOn ? offLightState : onLightState);
        })
        .catch((error) => { console.error(error) })
        .done();
}

dash.on('detected', controlLivingRoom);
