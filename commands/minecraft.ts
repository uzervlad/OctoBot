import { MessageEmbed } from "discord.js";
import Command, { ICommandArguments } from "../command";
import { cleanString } from "../util";

export default class MinecraftCommand extends Command {
    name = "Minecraft";
    command = [ "mc", "minecraft" ];

    private players(p: { max: number, online: string[] }): string {
        if(!p.online.length)
            return `No one is playing! :(`;
        else
            return `Players: ${p.online.length}/${p.max}\n${p.online.map(u => `\`${u}\``).join(', ')}`;
    }

    public async run({ bot, msg, mc }: ICommandArguments) {
        if(mc.online) {
            var embed = new MessageEmbed()
                .setColor("#00ff00")
                .setTitle("octodumb.tk")
                .setDescription(cleanString(`**Server online!**

                    Version: ${mc.version}

                    ${this.players(mc.players)}
                `));
                msg.channel.send(embed);
        } else {
            var embed = new MessageEmbed()
                .setColor("#ff0000")
                .setTitle("octodumb.tk")
                .setDescription(`**Server offline!**\n\nCouldn't establish connection`);
            msg.channel.send(embed);
        }
    }

    help = "Check my Minecraft server's status!"
}