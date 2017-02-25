var databaseInterface = require('../../../database/DatabaseInterface');
var MqttListener = require('./MqttListener');

class MqttAdmin {
  constructor() {
    this.mqttListeners = {};
    this.mqttHosts = [];
    this.querryResult = [];
  }

  update(hostList) {
    console.log(hostList);
  }

  async checkHostList() {
    try {
      var result = await databaseInterface.getSortedHostCollectionFor("mqtt");
      if (result != this.querryResult) {
        this.querryResult = result;
        var hostList = [];
        var mqttHostNameAlt = "";
//not working
        for (var host of this.querryResult) {
          if (host.host === mqttHostNameAlt) {
            hostList.push(host);
          } else {
            if (mqttHostNameAlt != "") {
              if (!this.mqttListeners.hasOwnProperty(mqttHostNameAlt)) {
                this.mqttListeners[mqttHostNameAlt] = new MqttListener();
              }
              this.mqttListeners.mqttHostNameAlt.updateHosts(hostList);
            }
            mqttHostNameAlt = host.host;
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}


module.exports = MqttAdmin;
