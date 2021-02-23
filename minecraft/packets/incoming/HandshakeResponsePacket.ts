import IncomingPacket from "../../incomingPacket";
import HandshakeResponse from "../../objects/incoming/HandshakeResponse";
import ReadMinecraftBuffer from "../../ReadMinecraftBuffer";

export default class HandshakeResponsePacket extends IncomingPacket<HandshakeResponse> {
    eventName = 'handshake';

    constructor(buffer: ReadMinecraftBuffer) {
        super(buffer);
        
        this.data = JSON.parse(buffer.readString());
    }
}