import dispatcher from "./Dispatcher";
import { w3cwebsocket } from'websocket';
import Router from 'react-router';

var websocketURL = "ws://localhost:61910/";
var websocketProtocol = "echo-protocol";

var client;


/*
 *  just one instance of this class can be created
 *  The conection will start when the start() method gets called
 *
 */
class HandleDataAction {

/*
 *  When called overides the client variable with a new conneciton.
 *  When the connection closes it automaticli calles itself.
 *
 */
  start() {
    client = new w3cwebsocket(websocketURL, websocketProtocol);

    client.onerror = function() {
        console.log('Connection Error');
    };

    client.onopen = function() {
        console.log('WebSocket Client Connected');
    };

    client.onclose = function() {
        console.log('echo-protocol Client Closed');
        setTimeout(function() {
          handleDataAction.start();
        }, 5000);
    };

    client.onmessage = function(e) {
      if (typeof e.data === 'string') {
        var data = JSON.parse(e.data);
        console.log(data);

        switch (data.type) {
          default:
            console.log("unhandeld data has arrived");
            break;
        }
      }
    };
  }

  waitForConnection (callback, interval) {
      if (client.readyState === 1) {
          callback();
      } else {
          var that = this;
          // optional: implement backoff for interval here
          setTimeout(function () {
              that.waitForConnection(callback, interval);
          }, interval);
      }
  };

  send (message, callback) {
    this.waitForConnection(function () {
        client.send(message);
        callback();
    }, 1000);
  };

/*
 *  sendData can send an objec trought the websocket connection.
 *  when the connection is not up it will try every second.
 *
 *  @params content type object: the objec which gets sent to the ws connection
 *      example: {type:"TYPE_OF_YOUR_REQUEST",
 *                content{
 *                  here comes the data of your request
 *                }}
 *    callback type function: is OPTIONAL wil be called afte the object is sent
 */
  sendData(content = '', callback = '') {
    console.log(content);
    if (content !== '' && callback !== '') {
      this.send(JSON.stringify(content), callback);
    }
  }
}

const handleDataAction = new HandleDataAction();

export default handleDataAction;
