import { MinecraftBufferType } from "./MinecraftBufferTypes";

export interface IBufferValue {
    type: MinecraftBufferType;
    value: any;
}

export default class WriteMinecraftBuffer {
    private values: Buffer[] = [];

    get buffer() {
        return Buffer.concat(this.values);
    }

    static from(...values: IBufferValue[]) {
        let wb = new WriteMinecraftBuffer();
        wb.write(...values);
        return wb.buffer;
    }

    write(...values: IBufferValue[]) {
        for(var value of values)
            this.writeValue(value);
    }

    writeValue(value: IBufferValue) {
        switch(value.type) {
            case MinecraftBufferType.Boolean:
                return this.writeBoolean(value.value);
            case MinecraftBufferType.Byte:
                return this.writeByte(value.value);
            case MinecraftBufferType.UnsignedByte:
                return this.writeUByte(value.value);
            case MinecraftBufferType.Short:
                return this.writeShort(value.value);
            case MinecraftBufferType.UnsignedShort:
                return this.writeUShort(value.value);
            case MinecraftBufferType.Int:
                return this.writeInt(value.value);
            case MinecraftBufferType.Long:
                return this.writeLong(value.value);
            case MinecraftBufferType.Float:
                return this.writeFloat(value.value);
            case MinecraftBufferType.Double:
                return this.writeDouble(value.value);
            case MinecraftBufferType.String:
                return this.writeString(value.value);
            case MinecraftBufferType.VarInt:
                return this.writeVarInt(value.value);
            case MinecraftBufferType.VarLong:
                return this.writeVarLong(value.value);
            default:
                throw new Error("This type is not implemented");
        }
    }

    writeBoolean(value: boolean) {
        let b = Buffer.alloc(1);
        b[0] = Number(value);
        this.values.push(b);
    }

    writeByte(value: number) {
        let b = Buffer.alloc(1);
        b.writeInt8(value);
        this.values.push(b);
    }

    writeUByte(value: number) {
        let b = Buffer.alloc(1);
        b.writeUInt8(value);
        this.values.push(b);
    }

    writeShort(value: number) {
        let b = Buffer.alloc(2);
        b.writeInt16BE(value);
        this.values.push(b);
    }

    writeUShort(value: number) {
        let b = Buffer.alloc(2);
        b.writeUInt16BE(value);
        this.values.push(b);
    }

    writeInt(value: number) {
        let b = Buffer.alloc(4);
        b.writeInt32BE(value);
        this.values.push(b);
    }

    writeLong(value: number) {
        let b = Buffer.alloc(8);
        b.writeBigInt64BE(BigInt(value));
        this.values.push(b);
    }

    writeFloat(value: number) {
        let b = Buffer.alloc(4);
        b.writeFloatBE(value);
        this.values.push(b);
    }

    writeDouble(value: number) {
        let b = Buffer.alloc(8);
        b.writeDoubleBE(value);
        this.values.push(b);
    }

    writeString(value: string) {
        if(value.length > 32767)
            throw new Error("String is too big");
        this.writeVarInt(value.length);
        this.values.push(Buffer.from(value));
    }

    writeVarInt(value: number) { this.writeVarValue(value); }
    writeVarLong(value: number) { this.writeVarValue(value); }

    private writeVarValue(value: number) {
        // console.log(value);
        do {
            let temp = value & 0b01111111;
            value >>>= 7;
            if(value != 0)
                temp |= 0b10000000;
            // console.log(temp, value);
            this.writeUByte(temp);
        } while(value != 0);
    }
}