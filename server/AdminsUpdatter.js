var databaseInterface = require('./database/DatabaseInterface');

class AdminsUpdatter {
  constructor() {
    this.oldHostsQuerry = [];
    this.admins = {};
    this.updatingInterval = {};
  }

  stopUpdating() {
    clearInterval(this.updatingInterval);
  }

  hostTypeFilter(host) {
    return((host.type === this)? true: false);
  }

  async startUpdating(admins) {
    this.admins = admins;
    this.updatingInterval = setInterval(async () =>{
      try {
        var HostsQuerry = await databaseInterface.getSortedHostCollection();
        if (HostsQuerry != this.oldHostsQuerry) {
          this.oldHostsQuerry = HostsQuerry;
          var activeHostList = [];
          for (var type in this.admins) {
            if (this.admins.hasOwnProperty(type)) {
              activeHostList = HostsQuerry.filter(this.hostTypeFilter, type);
              admins[type].update(activeHostList);
            }
          }
        }
      } catch (e) {
        console.warn("error while updating");
        console.warn(e);
        process.exit(1);
      }
    }, 1000);
  }
}

var adminsUpdatter = new AdminsUpdatter();
module.exports = adminsUpdatter;
