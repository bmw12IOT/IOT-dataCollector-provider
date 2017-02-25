var databaseHelper = require('./DatabaseHelper');


class DatabaseInterface {
  constructor() {
  }

  async createDbConnection() {
    await databaseHelper.createDbConnection();
  }

  async getSortedHostCollectionFor(type) {
    return await databaseHelper.getSortedHostCollectionFor(type);
  }

  async getSortedHostCollection() {
    return await databaseHelper.getSortedHostCollection();
  }
}


var databaseInterface = new DatabaseInterface();
module.exports = databaseInterface;
