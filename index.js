const creds = require('./credentials');
const v3 = require('node-hue-api').v3;
const GroupLightState = v3.lightStates.GroupLightState;

const LIVING_ROOM_GROUP_ID = 1; // Group ID of my living room lights
const OFF_STATE = new GroupLightState().on(false);
const ON_STATE = new GroupLightState().on(true).brightness(70);

const action = process.argv[2];
if (['on', 'off'].indexOf(action) === -1) {
  console.error('Must specify "on" or "off" as an action via command line');
  return;
}

// Setup APIs
(async function() {
  console.log(new Date().toString());
  const searchResults = await v3.discovery.nupnpSearch();
  const host = searchResults[0].ipaddress;
  const api = await v3.api.createLocal(host).connect(creds.username);
  const group = await api.groups.getGroup(LIVING_ROOM_GROUP_ID);

  if (action === 'on') {
    if (group.state.any_on === false) {
      api.groups.setGroupState(LIVING_ROOM_GROUP_ID, ON_STATE);
    } else {
      console.warn('Lights are already on, no-op');
    }
  } else {
    if (group.state.any_on === true) {
      api.groups.setGroupState(LIVING_ROOM_GROUP_ID, OFF_STATE);
    } else {
      console.warn('Lights are already off, no-op');
    }
  }
})();