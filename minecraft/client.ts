import { EventEmitter } from "eventemitter3";
import { connect, Socket } from "net";
import { MinecraftClientEvents } from "./events";
import { MinecraftBufferType } from "./MinecraftBufferTypes";
import OutcomingPacket from "./outcomingPacket";
import { IncomingPackets } from "./packets/incoming";
import ReadMinecraftBuffer from "./ReadMinecraftBuffer";
import WriteMinecraftBuffer from "./WriteMinecraftBuffer";

export default class MinecraftClient extends EventEmitter<MinecraftClientEvents> {
    private client: Socket;

    constructor(address: string, port: number = 25565) {
        super();

        this.initializeClient(address, port);
    }

    private initializeClient(address: string, port: number) {
        this.client = connect(port, address, () => {
            this.emit('connect');
        });

        this.client.setTimeout(1e4);

        this.client.on('data', data => {
            if(!data) return;
            this.processPacket(data)
        });

        this.client.on('timeout', () => {
            this.emit('disconnect');

            setTimeout(() => {
                this.initializeClient(address, port);
            }, 1e4);
        });

        this.client.on('error', (e) => {
            this.emit('error', e);

            setTimeout(() => {
                this.initializeClient(address, port);
            }, 1e4);
        });
    }

    private processPacket(data: Buffer) {
        var buffer = new ReadMinecraftBuffer(data);
        buffer.readVarInt();
        let packetID = buffer.readVarInt();
        if(!IncomingPackets[packetID]) return;

        let packet = IncomingPackets[packetID](buffer);

        /** @ts-ignore */ 
        this.emit(packet.eventName, packet.data);
    }

    sendPacket(packet: OutcomingPacket | Buffer) {
        let data = packet instanceof OutcomingPacket ? packet.buffer : packet;
        var a = WriteMinecraftBuffer.from({ type: MinecraftBufferType.VarInt, value: data.byteLength });
        this.client.write(Buffer.concat([a, data]));
    }
}