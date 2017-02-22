var MongoDBConnectionProvider = require('./MongoDBConnectionProvider');


class DatabaseHelper {
  constructor() {
    this.dbConnection = {};

    this.hostCollection = {};
  }

  createDbConnection(callback) {
    var mongoDBConnectionProvider = new MongoDBConnectionProvider(() => {
      this.dbConnection = MongoDBConnectionProvider.static.getDatabase();
      this.hostCollection = this.dbConnection.collection("hosts");

      callback();
    });
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
module.exports = DatabaseHelper;
