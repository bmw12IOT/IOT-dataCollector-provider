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

  async startUpdating(admins) {
    this.admins = admins;
    this.updatingInterval = setInterval(async () =>{
      try {
        var HostsQuerry = await databaseInterface.getSortedHostCollection();
        if (HostsQuerry != this.oldHostsQuerry) {
          this.oldHostsQuerry = HostsQuerry;
          var activeType = "";
          var activeHostList = [];
          for (var host of HostsQuerry) {
            if (activeType == "") {
              activeType = host.type;
            }
            if (activeType === host.type) {
              activeHostList.push(host);
            } else {
              this.sendUpdateToAdmin(activeHostList);

              activeHostList = [];
              activeType = host.type;
              activeHostList.push(host);
            }
          }
          this.sendUpdateToAdmin(activeHostList);
        }

      } catch (e) {
        console.warn("error while updating");
        console.warn(e);
        process.exit(1);
      }
    }, 1000);
  }

  sendUpdateToAdmin(activeHostList){
    var activeType = activeHostList[0].type;
    if (this.admins.hasOwnProperty(activeType)) {
      this.admins[activeType].update(activeHostList);
    } else {
      console.warn("Type with no admin in database type: " + activeType);
    }
  }

}

var adminsUpdatter = new AdminsUpdatter();
module.exports = adminsUpdatter;
