var util = require('util');
var events = require('events');
var dgram = require('dgram');
var net = require('net');

function Packet(message) {
  var self = this;
  self.buffer = message;

  return {
    size: self.buffer.readUInt16LE(0),
    protocol: self.buffer.readUInt16BE(2),
    reserved1: self.buffer.readUInt32BE(4),
    address: self.buffer.slice(8, 14),
    reserved2: self.buffer.readUInt16BE(14),
    site: self.buffer.slice(16, 22),
    reserved3: self.buffer.readUInt16BE(22),
    timestamp: self.buffer.readDoubleBE(24),
    type: self.buffer.readUInt16LE(32),
    reserved4: self.buffer.readUInt16BE(34),
    payload: self.buffer.slice(36)
  };
}

function LifxListener() {
  var self = this;

  self.emitter = new events.EventEmitter();

  self.processMessage = function(msg, rinfo) {
    var packet = new Packet(msg);
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
