import { Client, Message } from "discord.js";
import IMinecraftServerStatus from "./mc";

export interface ICommandArguments {
    bot: Client,
    msg: Message,
    args: string[],
    commands: Command[],
    mc: IMinecraftServerStatus
}

export default abstract class Command {
    public abstract name: string;
    public abstract command: string[];

    public abstract run(args: ICommandArguments): Promise<void>;

    public checkPermission(msg: Message): boolean {
        return true;
    }

    public help: string = "";
}