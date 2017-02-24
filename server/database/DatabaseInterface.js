var databaseHelper = require('./DatabaseHelper');


class DatabaseInterface {
  constructor() {
    console.log("dfs");
  }

  async createDbConnection() {
      try {
        console.log("try1");
        await databaseHelper.createDbConnection();
        console.log("try2");
        return false;
      } catch (e) {
        console.log("catch");
        console.log(e);
        return true;
      }
  }

  getSortedHostCollectionFor(type, callback) {
    databaseHelper.getSortedHostCollectionFor(type, function(results) {
      callback(results);
    });
  }
}


var databaseInterface = new DatabaseInterface();
module.exports = databaseInterface;
