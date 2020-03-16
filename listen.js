const dashButton = require('node-dash-button');
const creds = require('./credentials');
const { toggleLights } = require('./hue');

const dash = dashButton(creds.dashAddress);
dash.on('detected', () => {
  console.log('Detected dash button');
  toggleLights();
});

// Ah, dash buttons have been discontinued. Mine no longer works