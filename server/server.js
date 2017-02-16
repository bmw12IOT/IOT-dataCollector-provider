var MongoClient = require('mongodb').MongoClient;

var MongoDBConnectionProvider = require('./MongoDBConnectionProvider');

var MqttAdmin = require('./pusch/mqtt/MqttAdmin');


var admins = [];

var cli = new MongoDBConnectionProvider(onDBConnect);

function onDBConnect() {
  db = MongoDBConnectionProvider.static.getDatabase();

  admins.push(new MqttAdmin(db));
}
