


(async () => {
///////////////////////////////////////////////
console.log("llllllllllllllllllllllll");
var databaseInterface = require('./database/DatabaseInterface');

//var MqttAdmin = require('./dataCollector/pusch/mqtt/MqttAdmin');


var admins = [];
console.log("first");
try {
  var tmp = await databaseInterface.createDbConnection();
  if (tmp === true) {
    console.log("tru");
  }
  console.log("false");
} catch (e) {
  console.log(e);
}


//admins.push(new MqttAdmin());

///////////////////////////////////////////////
})();


console.log("sdofij");
setInterval(function () {
  console.log("int");
}, 1000000);
