var databaseInterface = require('../../../database/DatabaseInterface');

class MqttAdmin {
  constructor() {
    this.mqttListeners = {};
    this.mqttHosts = [];
    this.querryResults = [];
    this.checkHostList();
  }

  checkHostList() {
    databaseInterface.getSortedHostCollectionFor("mqtt", (results) => {
      console.log(results);
    });
  }
}


module.exports = MqttAdmin;
