var MongoClient = require('mongodb').MongoClient;

var databaseInterface = require('./database/DatabaseInterface');

var MqttAdmin = require('./dataCollector/pusch/mqtt/MqttAdmin');


var admins = [];


databaseInterface.createDbConnection(onDbConnect);

function onDbConnect() {

  admins.push(new MqttAdmin());
}
