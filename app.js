var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

socket.bind(56700, function() {
  socket.on('message', function(msg, rinfo) {
    var packet = {
      received: Date.now(),
      size: msg.readUInt16LE(0),
      protocol: msg.readUInt16BE(2),
      reserved1: msg.readUInt32BE(4)
    };
    console.log(packet);
  });
});
