export type MinecraftClientEvents = {
    ['connect']: void,
    ['disconnect']: void,
    ['error']: Error,
    ['ping']: void,
    ['handshake']: void
};