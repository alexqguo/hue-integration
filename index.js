const AWS = require('aws-sdk');
const creds = require('./credentials');
require('dotenv').config();
const { setLights } = require('./hue');

const action = process.argv[2];
if (['on', 'off'].indexOf(action) === -1) {
  console.error('Must specify "on" or "off" as an action via command line');
  return;
}

// Setup APIs
(async function() {
  const dateString = new Date().toString();

  function sendSMS(message) {
    const params = {
        Message: message,
        PhoneNumber: creds.phoneNumber,
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': 'Subject'
            }
        }
    };

    new AWS.SNS({ apiVersion: '2010-03-31' })
      .publish(params)
      .promise()
      .then((data) => {
        console.log(JSON.stringify({ MessageID: data.MessageId }));
      })
      .catch((err) => {
        console.log(JSON.stringify({ Error: err }));
      });
  }

  console.log(dateString);
  setLights(action);
  sendSMS(`${dateString} -- Turning lights ${action}`);
})();