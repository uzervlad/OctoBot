import { Client } from "discord.js";
import Command from "./command";

import HelpCommand from "./commands/help";
import MinecraftCommand from "./commands/minecraft";
import VoiceMoveCommand from "./commands/voicemove";

import MinecraftClient from "./minecraft/client";
import HandshakePacket from "./minecraft/packets/outcoming/HandshakePacket";
import HandshakeResponse from "./minecraft/objects/incoming/HandshakeResponse";
import IMinecraftServerStatus from "./mc";

import dotenv from "dotenv";
dotenv.config();

const config = {
    prefix: process.env.OCTOBOT_PREFIX ?? ")",
    token: process.env.OCTOBOT_TOKEN ?? ""
};

const 
    bot = new Client(),
    minecraft = new MinecraftClient('octodumb.tk');

minecraft.on('connect', () => {
    minecraft.sendPacket(new HandshakePacket({ address: 'octodumb.tk' }));
    minecraft.sendPacket(Buffer.from([ 0x00 ]));
});

minecraft.on('error', () => {
    mcData = { online: false };
});

minecraft.on('handshake', (data: HandshakeResponse) => {
    mcData = {
        online: true,
        version: data.version.name,
        players: {
            max: data.players.max,
            online: data.players.sample?.map(p => p.name) ?? []
        }
    };
});

var commands: Command[] = [
    new HelpCommand(),
    new VoiceMoveCommand(),
    new MinecraftCommand()
];

var mcData: IMinecraftServerStatus = { online: false };

bot.on('message', msg => {
    if(msg.author.bot) return;
    if(!msg.content) return;
    if(!msg.content.startsWith(config.prefix)) return;
    let args = msg.content.split(" ");
    const c = args.shift().slice(config.prefix.length).toLowerCase();
    const command = commands.find(cmd => cmd.command.includes(c));
    if(!command) return;
    if(command.checkPermission(msg))
        command.run({ bot, msg, args, commands, mc: mcData });
});

(async function() {
    await bot.login(config.token);

    console.log("Started!");
})()