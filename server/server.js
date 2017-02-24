(async () => {
///////////////////////////////////////////////

var databaseInterface = require('./database/DatabaseInterface');

//var MqttAdmin = require('./dataCollector/pusch/mqtt/MqttAdmin');


var admins = [];

try {
  await databaseInterface.createDbConnection()
} catch (e) {
  console.error("Error while connecting to Database");
  console.error(e);
  process.exit(1);
}

try {
  var result = await databaseInterface.getSortedHostCollectionFor("mqtt");
  console.log(result);
} catch (e) {
  console.error(e);
}

//admins.push(new MqttAdmin());

///////////////////////////////////////////////
})();
