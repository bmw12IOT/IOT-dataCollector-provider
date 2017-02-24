var mongoClient = require('mongodb').MongoClient;


// Connection URL
var url = 'mongodb://localhost:27017/iotData';

class DatabaseHelper {
  constructor() {
    console.log("dfsdfs");
    this.dbConnection = {};

    this.hostCollection = {};
  }

  async createDbConnection() {
    this.dbConnection = await mongoClient.connect(url);
    this.hostCollection = this.dbConnection.collection("hosts");
    return;
  }

  getSortedHostCollectionFor(type, callback) {
    var options = {
        "sort": "host"
    };

    this.hostCollection.find({"type": type}, options).toArray((err,results) => {
      if (!err) {
        callback(results);
      } else {
        console.log("sql Error");
      }
    });
  }
}

var databaseHelper = new DatabaseHelper();
module.exports = databaseHelper;
