import { Client } from "discord.js";
import Command from "./command";
import Minecraft, { MinecraftData } from "./mc";

import HelpCommand from "./commands/help";
import MinecraftCommand from "./commands/minecraft";

import dotenv from "dotenv";
import VoiceMoveCommand from "./commands/voicemove";
dotenv.config();

const config = {
    prefix: process.env.OCTOBOT_PREFIX ?? ")",
    token: process.env.OCTOBOT_TOKEN ?? ""
};

const 
    bot = new Client(),
    minecraft = new Minecraft('octodumb.tk');

var commands: Command[] = [
    new HelpCommand(),
    new VoiceMoveCommand(),
    new MinecraftCommand()
];
var mcData: MinecraftData = { online: false };

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
    minecraft.on('data', data => {
        mcData = data;

        bot.user.setActivity({
            type: "PLAYING",
            name: "on octodumb.tk",
            url: "http://octodumb.tk"
        });
    });
    console.log("Started!");
})()