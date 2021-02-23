import { MinecraftBufferType } from "../../MinecraftBufferTypes";
import { HandshakeData } from "../../objects/outcoming/HandshakeData";
import OutcomingPacket from "../../outcomingPacket";
import WriteMinecraftBuffer from "../../WriteMinecraftBuffer";

export default class HandshakePacket extends OutcomingPacket {
    constructor(data: HandshakeData) {
        super();

        this.buffer = WriteMinecraftBuffer.from(
            {
                type: MinecraftBufferType.VarInt,
                value: 0
            },
            {
                type: MinecraftBufferType.VarInt,
                value: 753
            },
            {
                type: MinecraftBufferType.String,
                value: data.address
            },
            {
                type: MinecraftBufferType.UnsignedShort,
                value: data.port ?? 25565
            },
            {
                type: MinecraftBufferType.VarInt,
                value: 1
            }
        );
    }
}