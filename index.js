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

function turnLightsOn() {
    setLivingRoomLightState(onLightState);
}

function turnLightsOff() {
    setLivingRoomLightState(offLightState);
}

dash.on('detected', () => {
    // Toggle lights
});
