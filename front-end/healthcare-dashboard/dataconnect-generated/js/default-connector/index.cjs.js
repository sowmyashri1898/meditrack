const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'healthcare-dashboard',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

