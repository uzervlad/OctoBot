import Command, { ICommandArguments } from "../command";

export default class VoiceMoveCommand extends Command {
    name = "VoiceMove";
    command = [ "voicemove", "vcmove" ];

    public async run({ bot, msg, args }: ICommandArguments) {
        if(!msg.guild.member(bot.user).hasPermission("MOVE_MEMBERS")) return;
        if(!msg.member.voice.channelID) {
            msg.channel.send("You are not in a voice channel!");
            return;
        }
        if(!args[0]) return;
        let channel = msg.guild.channels.cache.find(v => v.name.includes(args.join(" ")) && v.type == "voice");
        if(!channel) {
            msg.channel.send("Couldn't find this voice channel!");
            return;
        }
        if(!channel.permissionsFor(msg.member).has("CONNECT")) {
            msg.channel.send("You are not allowed to join this voice channel!");
            return;
        }
        msg.member.voice.setChannel(channel, "Command request");
        msg.channel.send(`Moved you to ${channel.name}!`);
    }

    help = "Can't switch to Discord? I can help you move to the channel you need!";
}