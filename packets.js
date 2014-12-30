function Packet(buffer) {
  var self = this;
  self.buffer = buffer;

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

function PacketSerializer() {
  var self = this;

  return {
    serialize: function(packet) {
      throw new Error('Packet serialization not implemented yet!');
    },
    deserialize: function(buffer) {
      var packet = new Packet(buffer);
      return packet;
    }
  };
}

module.exports = new PacketSerializer();
