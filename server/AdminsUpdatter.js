var databaseInterface = require('./database/DatabaseInterface');

class AdminsUpdatter {
  constructor() {
    this.oldHostsQuerry = "";
    this.admins = {};
    this.updatingInterval = {};
  }

  stopUpdating() {
    clearInterval(this.updatingInterval);
  }

  hostTypeFilter(host, id, arr) {
    if (host.hasOwnProperty('type')) {
      if (host.type === this) {
        arr[id] = null;
        return (true);
      }
    }
    return(false);
  }

  async startUpdating(admins) {
    this.admins = admins;
    this.updatingInterval = setInterval(async () =>{
      try {
        var HostsQuerry = await databaseInterface.getSortedHostCollection();
        if (this.oldHostsQuerry != JSON.stringify(HostsQuerry)) {
          console.log("a");
          this.oldHostsQuerry = JSON.stringify(HostsQuerry);
          var activeHostList = [];
          for (var type in this.admins) {
            if (this.admins.hasOwnProperty(type)) {
              activeHostList = HostsQuerry.filter(this.hostTypeFilter, type);
              admins[type].update(activeHostList);
            }
          }

          for (var unUsedHost of HostsQuerry) {
            if (unUsedHost != null) {
              if (unUsedHost.hasOwnProperty('type')) {
                console.warn("Type with no admin in database type: " + unUsedHost.type);
              } else {
                console.warn("there is false data in the hosts collection");
              }
            }
          }
        }
      } catch (e) {
        console.warn("error while updating");
        console.warn(e);
        process.exit(1);
      }
    }, 500);
  }
}

var adminsUpdatter = new AdminsUpdatter();
module.exports = adminsUpdatter;
