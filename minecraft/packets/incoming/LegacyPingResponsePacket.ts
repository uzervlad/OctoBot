import IncomingPacket from "../../incomingPacket";
import LegacyPingResponse from "../../objects/incoming/LegacyPingResponse";
import ReadMinecraftBuffer from "../../ReadMinecraftBuffer";

export default class LegacyPingResponsePacket extends IncomingPacket<LegacyPingResponse> {
    eventName = 'ping';

    constructor(buffer: ReadMinecraftBuffer) {
        super(buffer);

        let d = buffer.buffer.toString().split('\x00\x00\x00').map(s => s.replace(/\u0000/g, ''));

        this.data = {
            protocol: Number(d[1]),
            version: d[2],
            motd: d[3],
            players: {
                current: Number(d[4]),
                max: Number(d[5])
            }
        }
    }
}