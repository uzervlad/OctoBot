import { MinecraftBufferType } from "./MinecraftBufferTypes";

export default class ReadMinecraftBuffer {
    offset = 0;
    
    constructor(
        public buffer: Buffer
    ) {}

    read(type: MinecraftBufferType): any {
        switch(type) {
            case MinecraftBufferType.Boolean:
                return this.readBoolean();
            case MinecraftBufferType.Byte:
                return this.readByte();
            case MinecraftBufferType.UnsignedByte:
                return this.readUByte();
            case MinecraftBufferType.Short:
                return this.readShort();
            case MinecraftBufferType.UnsignedShort:
                return this.readUShort();
            case MinecraftBufferType.Int:
                return this.readInt();
            case MinecraftBufferType.Long:
                return this.readLong();
            case MinecraftBufferType.Float:
                return this.readFloat();
            case MinecraftBufferType.Double:
                return this.readDouble();
            case MinecraftBufferType.String:
                return this.readString();
            case MinecraftBufferType.VarInt:
                return this.readVarInt();
            case MinecraftBufferType.VarLong:
                return this.readVarLong();
            default:
                throw new Error("This type is not implemented");
        }
    }

    readBoolean(): boolean {
        let d = this.buffer[this.offset];
        this.offset++;
        return !!d;
    }

    readByte(): number {
        let d = this.buffer.readInt8(this.offset);
        this.offset++;
        return d;
    }

    readUByte(): number {
        let d = this.buffer.readUInt8(this.offset);
        this.offset++;
        return d;
    }

    readShort(): number {
        let d = this.buffer.readInt16BE(this.offset);
        this.offset += 2;
        return d;
    }

    readUShort(): number {
        let d = this.buffer.readUInt16BE(this.offset);
        this.offset += 2;
        return d;
    }

    readInt(): number {
        let d = this.buffer.readInt32BE(this.offset);
        this.offset += 4;
        return d;
    }

    readLong(): number {
        let d = Number(this.buffer.readBigInt64BE(this.offset));
        this.offset += 8;
        return d;
    }

    readFloat(): number {
        let d = this.buffer.readFloatBE(this.offset);
        this.offset += 4;
        return d;
    }

    readDouble(): number {
        let d = this.buffer.readDoubleBE(this.offset);
        this.offset += 8;
        return d;
    }

    readString(): string {
        let size = this.readVarInt();
        let d = this.buffer.slice(this.offset, this.offset + size);
        this.offset += size;
        return d.toString();
    }

    readVarInt(): number {
        let numRead = 0,
            result = 0;
        let read;
        do {
            read = this.readByte();
            let value = (read & 0b01111111);
            result |= (value << (7 * numRead));
            numRead++;
            if(numRead > 5)
                throw new Error("VarInt is too big");
        } while((read & 0b10000000) != 0);

        return result;
    }

    readVarLong(): number {
        let numRead = 0,
            result = 0;
        let read;
        do {
            read = this.readByte();
            let value = (read & 0b01111111);
            result |= (value << (7 * numRead));

            numRead++;
            if(numRead > 10)
                throw new Error("VarLong is too big");
        } while((read & 0b10000000) != 0);

        return result;
    }
}