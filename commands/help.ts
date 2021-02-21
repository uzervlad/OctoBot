import { MessageEmbed } from "discord.js";
import Command, { ICommandArguments } from "../command";

export default class HelpCommand extends Command {
    name = "Help";
    command = [ "help" ];

    public async run({ bot, commands, msg, args }: ICommandArguments) {
        if(args[0]) {
            var cmd = commands.find(c => c.command.includes(args[0].toLowerCase()));
            if(!cmd)
                msg.channel.send("Couldn't find this command");
            else {
                var embed = new MessageEmbed()
                    .setAuthor("OctoBot", bot.user.displayAvatarURL(), "http://octodumb.tk")
                    .setTitle(cmd.name)
                    .setDescription(`${cmd.help}\n\nUsages: ${cmd.command.map(c => `\`${c}\``).join(", ")}`)
                    .setFooter(`Requested by ${msg.author.tag}`, msg.author.displayAvatarURL())
                msg.channel.send(embed);
            }
        } else {
            var embed = new MessageEmbed()
                .setAuthor("OctoBot", bot.user.displayAvatarURL(), "http://octodumb.tk")
                .setTitle("Commands")
                .setDescription(commands.map(c => `**${c.name}** - ${c.command.map(cc => `\`${cc}\``).join(', ')}`).join("\n"))
                .setFooter(`Requested by ${msg.author.tag}`, msg.author.displayAvatarURL())
            msg.channel.send(embed);
        }
    }

    help = "It helps! Sometimes...";
}