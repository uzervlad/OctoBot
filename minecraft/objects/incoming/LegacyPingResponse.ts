export default interface LegacyPingResponse {
    protocol: number,
    version: string,
    motd: string,
    players: {
        current: number,
        max: number
    }
}