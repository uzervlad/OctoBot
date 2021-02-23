import OutcomingPacket from "../../outcomingPacket";

export default class LegacyPingPacket extends OutcomingPacket {
    constructor() {
        super();

        this.buffer = Buffer.from([ 0xFE, 0x01 ]);
    }
}