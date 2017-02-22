var DatabaseHelper = require('./DatabaseHelper');


class DatabaseInterface {
  constructor() {
    this.databaseHelper = new DatabaseHelper();
  }

  createDbConnection(callback) {
    this.databaseHelper.createDbConnection(function () {
      callback();
    });
  }

  getSortedHostCollectionFor(type, callback) {
    this.databaseHelper.getSortedHostCollectionFor(type, function(results) {
      callback(results);
    });
  }
}

var databaseInterface = new DatabaseInterface();

module.exports = databaseInterface;
