var databaseInterface = require('../../../database/DatabaseInterface');
var MqttListener = require('./MqttListener');

class MqttAdmin {
  constructor() {
    this.mqttListeners = {};
    this.mqttHosts = [];
    this.querryResult = [];
    this.oldHostList = "";
  }

  update(hostList) {
    this.checkHostList(hostList);
  }

  hostFilter(host, id, arr) {
    if (host != null) {
      if (host.hasOwnProperty('host')) {
        if (host.host === this) {
          arr[id] = null;
          return (true);
        }
      }
    }
    return(false);
  }

  getFirstHostName(hostList) {
    for (var host of hostList) {
      if (host != null) {
        if (host.hasOwnProperty('host')) {
          if (host.host != null) {
            return (host.host);
          }
        }
      }
    }
  }

  isArrayBlank(arr) {
    for (var item of arr) {
      if (item != null) {
        return false;
      }
    }
    return true;
  }

  checkHostList(hostList) {
    if (this.oldHostList != JSON.stringify(hostList)) {
      this.oldHostList = JSON.stringify(hostList);
      for (var mqttListenerKey in this.mqttListeners) {
        if (this.mqttListeners.hasOwnProperty(mqttListenerKey)) {
          var activeHostList = hostList.filter(this.hostFilter, mqttListenerKey);
          if (activeHostList.length != 0) {
            this.mqttListeners[mqttListenerKey].updateHosts(activeHostList);
          } else {
            this.mqttListeners[mqttListenerKey].deleteListener();
            delete this.mqttListeners[mqttListenerKey];
          }
        }
      }
      while (!this.isArrayBlank(hostList)) {
        var activeHostName = this.getFirstHostName(hostList);
        this.mqttListeners[activeHostName] = new MqttListener(hostList.filter(this.hostFilter, activeHostName));
      }
    }
  }

}


module.exports = MqttAdmin;
