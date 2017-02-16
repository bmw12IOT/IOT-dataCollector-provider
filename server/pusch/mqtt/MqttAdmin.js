class MqttAdmin {
  constructor(p_db) {
    var db = p_db;
    var hostCollection = db.collection("hosts");
    var mqttListeners = {};
    var mqttHosts = [];
    var querryResults = [];
  }

  var checkHostList = function () {
    var options = {
        "sort": "host"
    };
    collection.find({"type":"mqtt"}, options, (err,results) => {
      if (querryResults !== results) {

      }
    })
  }
}


module.exports = MqttAdmin;
