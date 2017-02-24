var mongoClient = require('mongodb').MongoClient;


// Connection URL
var url = 'mongodb://localhost:27017/iotData';

class DatabaseHelper {
  constructor() {
    this.dbConnection = {};

    this.hostCollection = {};
  }

  async createDbConnection() {
    this.dbConnection = await mongoClient.connect(url);
    this.hostCollection = this.dbConnection.collection("hosts");
    return;
  }

  getSortedHostCollectionFor(type) {
    var options = {
        "sort": "host"
    };

    return new Promise((fulfill, reject) => {
      this.hostCollection.find({"type": type}, options).toArray((err,results) => {
        if (!err) {
          fulfill(results);
        } else {
          reject(err);
        }
      });
    });
  }
}

var databaseHelper = new DatabaseHelper();
module.exports = databaseHelper;
