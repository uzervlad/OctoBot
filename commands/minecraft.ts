import { MessageEmbed } from "discord.js";
import Command, { ICommandArguments } from "../command";
import { cleanString } from "../util";

export default class MinecraftCommand extends Command {
    name = "Minecraft";
    command = [ "mc", "minecraft" ];

    public async run({ bot, msg, mc }: ICommandArguments) {
        if(mc.online) {
            var embed = new MessageEmbed()
                .setColor("#00ff00")
                .setTitle("octodumb.tk")
                .setDescription(cleanString(`**Server online!**

                    Version: ${mc.version}
                    MoTD: ${mc.motd}
                    Players: ${mc.currentPlayers}/${mc.maxPlayers}
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