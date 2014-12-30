var network = require('./network');
var listener = network.createListener();
var connections = [];

listener.on('packet', function(packet) {
  console.log(packet);
  listener.stop();
});

listener.start();
