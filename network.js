var util = require('util');
var events = require('events');
var dgram = require('dgram');
var net = require('net');
var packets = require('./packets');


function LifxListener() {
  var self = this;

  self.emitter = new events.EventEmitter();

  self.processMessage = function(msg, rinfo) {
    var packet = packets.deserialize(msg);
    self.emitter.emit('packet', packet);
  };

  self.emitter.isStarted = false;

  self.emitter.start = function() {
    if (self.socket != null && self.emitter.isStarted == true) {
      throw new Error(
        'You must stop the listener before you can start it again.'
        );
    }

    self.socket = dgram.createSocket('udp4');
    self.socket.bind(56700, function() {
      self.socket.on('message', self.processMessage);
      self.emitter.isStarted = true;
    });
  };

  self.emitter.stop = function() {
    if (self.socket == null && self.emitter.isStarted == false) {
      throw new Error(
        'You must start the listener before you can stop it.'
        );
    }

    self.socket.close();
    self.socket = null;
    self.emitter.isStarted = false;
  };

  return self.emitter;
}

function LifxConnection(host, port) {
  var self = this;
  self.host = host;
  self.port = port;

  self.emitter = new events.EventEmitter();

  self.emitter.isOpen = false;

  self.startHandshake = function() {

  };

  self.emitter.open = function() {
    if (self.socket != null && self.emitter.isOpen == true) {
      throw new Error(
        'You must close the connection before you can open it again.'
        );
    }

    var options = {
      'port': port,
      'host': host
    };

    self.socket = net.createConnection(
      options,
      self.startHandshake
    );
  };

  self.emitter.close = function() {
    if (self.socket == null && self.emitter.isOpen == false) {
      throw new Error(
        'You must open the connection before you can close it.'
        );
    }

    self.socket.end();
    self.socket = null;
    self.emitter.isOpen = false;
  };

  return self.emitter;
}

function Network() {
  var self = this;

  return {
    createListener: function() {
      return new LifxListener();
    },
    createConnection: function(host, port) {
      return new LifxConnection(host, port);
    }
  };
}

module.exports = new Network();
