var network = require('./network');
var listener = network.createListener();

listener.on('packet', function(packet) {
  console.log(packet);
  listener.stop();
});

listener.start();
