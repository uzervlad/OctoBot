export default interface IMinecraftServerStatus {
    online: boolean;
    version?: string;
    players?: {
        max: number;
        online: string[]
    }
}