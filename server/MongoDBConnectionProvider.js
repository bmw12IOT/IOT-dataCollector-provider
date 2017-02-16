var MongoClient = require('mongodb').MongoClient;


// Connection URL
var url = 'mongodb://localhost:27017/iotData';

class MongoDBConnectionProvider {
  constructor(callback) {
    if (typeof MongoDBConnectionProvider.static.database === 'undefined') {
      MongoClient.connect(url, function(err, db) {
        MongoDBConnectionProvider.static.database = db;
        callback();
      });
    }
  }
}

// Static methods
MongoDBConnectionProvider.static = {};

MongoDBConnectionProvider.static.getDatabase = function () {
  return MongoDBConnectionProvider.static.database;
}

module.exports = MongoDBConnectionProvider;
