var network = require('./network');
var udpListener = network.createUdpListener();

udpListener.on('packet', function(packet) {
  console.log(packet);
  udpListener.stop();
});

udpListener.start();
