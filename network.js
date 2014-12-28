var util = require('util');
var events = require('events');
var dgram = require('dgram');

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

function UdpListener() {
  var self = this;

  self.emitter = new events.EventEmitter();

  self.processMessage = function(msg, rinfo) {
    var packet = new Packet(msg);
    self.emitter.emit('packet', packet);
  };

  self.emitter.start = function() {
    self.socket = dgram.createSocket('udp4');
    self.socket.bind(56700, function() {
      self.socket.on('message', self.processMessage);
    });
  };

  self.emitter.stop = function() {
    self.socket.close();
    self.socket = null;
  };

  return self.emitter;
}

function Network() {
  var self = this;

  return {
    createUdpListener: function() {
      return new UdpListener();
    }
  };
}

module.exports = new Network();
