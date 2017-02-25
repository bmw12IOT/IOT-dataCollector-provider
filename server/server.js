(async () => {
///////////////////////////////////////////////

var databaseInterface = require('./database/DatabaseInterface');
var adminsUpdatter = require('./AdminsUpdatter');

var MqttAdmin = require('./dataCollector/pusch/mqtt/MqttAdmin');


var admins = {};

try {
  await databaseInterface.createDbConnection()
} catch (e) {
  console.error("Error while connecting to Database");
  console.error(e);
  process.exit(1);
}



admins["mqtt"] = new MqttAdmin();

adminsUpdatter.startUpdating(admins);


///////////////////////////////////////////////
})();
