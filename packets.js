function Packet(buffer) {

}

function UnknownPacket(packet) {

}

function GetGatewayPacket(packet) {

}

function GatewayPacket(packet) {

}

function GetPowerStatePacket(packet) {

}

function SetPowerStatePacket(packet) {

}

function PowerStatePacket(packet) {

}

function GetWiFiInfoPacket(packet) {

}

function WiFiInfoPacket(packet) {

}

function GetWiFiFirmwareStatePacket(packet) {

}

function WiFiFirmwareStatePacket(packet) {

}

function GetWiFiStatePacket(packet) {

}

function SetWiFiStatePacket(packet) {

}

function WiFiStatePacket(packet) {

}

function GetAccessPointsPacket(packet) {

}

function SetAccessPointsPacket(packet) {

}

function AccessPointsPacket(packet) {

}

function PacketSerializer() {
  var self = this;

  return {
    serialize: function(packet) {
      throw new Error('Packet serialization not implemented yet!');
    };

    deserialize: function(buffer) {
      throw new Error('Packet deserialization not implemented yet!');
    };
  };
}

module.exports = new PacketSerializer();
