import IncomingPacket from "../../incomingPacket";
import ReadMinecraftBuffer from "../../ReadMinecraftBuffer";
import HandshakeResponsePacket from "./HandshakeResponsePacket";
import LegacyPingResponsePacket from "./LegacyPingResponsePacket";

export const IncomingPackets: { [key: number]: (buffer: ReadMinecraftBuffer) => IncomingPacket<any> } = {
    [0x00]: (buffer: ReadMinecraftBuffer) => new HandshakeResponsePacket(buffer),
    
    [0xff]: (buffer: ReadMinecraftBuffer) => new LegacyPingResponsePacket(buffer)
}