import EventEmitter from "events";
import net from "net";

export interface MinecraftData {
    online: boolean;
    version?: string;
    motd?: string;
    currentPlayers?: number;
    maxPlayers?: number;
}

export default class Minecraft extends EventEmitter {
    constructor(
        private address: string,
        private port: number = 25565
    ) {
        super();

        this.ping();
    }

    private ping() {
        var client = net.connect(this.port, this.address, () => {
            var buff = Buffer.from([ 0xFE, 0x01 ]);
            client.write(buff);
        });

        client.setTimeout(1e4);

        client.on('data', data => {
            if(!data) return;
            var rawInfo = data.toString().split('\x00\x00\x00');
            var info: MinecraftData = { online: true };
            if(rawInfo.length >= 6) {
                info.version = rawInfo[2].replace(/\u0000/g, '');
                info.motd = rawInfo[3].replace(/\u0000/g, '');
                info.currentPlayers = Number(rawInfo[4].replace(/\u0000/g, ''));
                info.maxPlayers = Number(rawInfo[5].replace(/\u0000/g, ''));
            } else {
                info.online = false;
            }
            this.emit('data', info);
            client.end();
        });

        client.on('timeout', () => {
            this.emit('data', { online: false });
            client.end();
        });

        client.on('error', () => {
            this.emit('data', { online: false });
            client.end();
        });

        client.on('end', () => {
            setTimeout(() => this.ping(), 5e3);
        });
    }
}