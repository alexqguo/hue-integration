const hue = require('node-hue-api');
const creds = require('./credentials');
const HueApi = hue.HueApi;
const lightState = hue.lightState;

const host = creds.host;
const username = creds.macbookUsername;
const api = new HueApi(host, username);

// Get basic config
// api.config((err, config) => {
//     if (err) throw err;
//     console.log(JSON.stringify(config));
// });

// Groups
// "Living room" has the id of 1 and contains the three main living room lights

// Default light state of 70% brightness
const onLightState = lightState.create().on().bri(178);
const offLightState = lightState.create().on(false);

// Generic display results callback
function displayResult(result) {
    console.log(JSON.stringify(result, null, 2));
}

// Generic error callback
function displayError(error) {
    console.error(error);
}

function setLivingRoomLightState(lightState) {
    api.setGroupLightState(1, lightState)
        .catch(displayError)
        .done();
}

function turnLightsOn() {
    setLivingRoomLightState(onLightState);
}

function turnLightsOff() {
    setLivingRoomLightState(offLightState);
}
