import { EventEmitter } from "events";

import Dispatcher from "../Dispatcher";

class ConfigStore extends EventEmitter {
  constructor() {
    super()
    this.colors = {
      primaryColorDark: "#303F9F",
      primaryColor: "#3F51B5",
      primaryColorLight:  "#C5CAE9",
      primaryColorText:   "#FFFFFF",
      accentColor:         "#FF4081",
      primaryTextColor:   "#212121",
      secondaryTextColor: "#757575",
      dividerColor:        "#BDBDBD",
    };
  }

  handleActions(action) {
    // warnung für kein default case ausschalten
    // eslint-disable-next-line

    switch(action.type) {
      case "TEST_CONFIG_STORE":
        console.log("configStore");
        break;
    }
  }
}

const configStore = new ConfigStore();
Dispatcher.register(configStore.handleActions.bind(configStore));

export default configStore;
