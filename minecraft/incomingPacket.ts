import ReadMinecraftBuffer from "./ReadMinecraftBuffer";

export default abstract class IncomingPacket<T extends object> {
    data: T;

    abstract eventName: string;
    
    constructor(
        private buffer: ReadMinecraftBuffer
    ) {}
}