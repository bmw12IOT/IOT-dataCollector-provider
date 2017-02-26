
class MqttListener {
  constructor(listenerlist) {
    console.log("new");
    console.log(listenerlist);
  }

  updateHosts(newHostList) {
    console.log("update");
    console.log(newHostList);
  }

  deleteListener() {
    console.log("delete");
  }
}


module.exports = MqttListener;
